/**
 * GitHub 来源抓取:仓库 / 子目录 / 单文件 → 章节 markdown。
 *
 * 下载方式:codeload tarball(无需 git,支持 HEAD 快照)。
 * 章节组织:
 * - 有 SUMMARY.md(GitBook 形态)按其链接顺序
 * - 否则收集目录下 .md(排除非内容文件),README 置顶、按文件名排序
 * 相对链接与图片统一改写为 raw.githubusercontent.com 绝对地址。
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, basename, extname, relative, posix } from 'node:path';

const MAX_CHAPTERS = 200;
const MAX_CHAPTER_BYTES = 2 * 1024 * 1024;
/** 排除的目录与非常见内容文件(README 保留,常作第一章) */
const EXCLUDE = /(^|\/)(node_modules|\.github|\.git|dist|build|vendor)(\/|$)/i;
const EXCLUDE_FILES = /^(license|licence|copying|contributing|code_of_conduct|changelog|authors|contributors|acknowledgements?)\b/i;

/** 解析 github.com URL → { owner, repo, ref?, path?, kind: 'repo'|'subdir'|'file' } */
export function parseGithubUrl(rawUrl) {
  let u;
  try {
    u = new URL(rawUrl);
  } catch {
    return null;
  }
  if (u.hostname !== 'github.com' && u.hostname !== 'raw.githubusercontent.com') return null;
  if (u.hostname === 'raw.githubusercontent.com') {
    // raw.githubusercontent.com/<owner>/<repo>/<ref>/<path...>
    const seg = u.pathname.split('/').filter(Boolean);
    if (seg.length < 3) return null;
    return { owner: seg[0], repo: seg[1].replace(/\.git$/, ''), ref: seg[2], path: seg.slice(3).join('/'), kind: 'file' };
  }
  const seg = u.pathname.split('/').filter(Boolean);
  if (seg.length < 2) return null;
  const owner = seg[0];
  const repo = seg[1].replace(/\.git$/, '');
  let kind = 'repo';
  let ref;
  let path;
  if (seg.length >= 4 && ['blob', 'tree', 'raw'].includes(seg[2])) {
    ref = seg[3];
    path = seg.slice(4).join('/');
    kind = seg[2] === 'tree' ? 'subdir' : 'file';
    if (seg[2] === 'raw') kind = 'file';
  }
  return { owner, repo, ref, path, kind };
}

export function repoRawBase(owner, repo, ref) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}`;
}

/**
 * 下载仓库 tarball 并解压到 destDir。
 * @returns {{ rootDir: string, ref: string }} rootDir=解压出的仓库根
 */
export async function downloadRepoTarball(owner, repo, destDir) {
  const url = `https://codeload.github.com/${owner}/${repo}/tar.gz/HEAD`;
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`tarball 下载失败 HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const { execSync } = await import('node:child_process');
  execSync(`mkdir -p ${JSON.stringify(destDir)} && rm -rf ${JSON.stringify(destDir)}/*`, { shell: '/bin/bash' });
  execSync(`tar -xzf - -C ${JSON.stringify(destDir)}`, {
    shell: '/bin/bash',
    input: buf,
    maxBuffer: 512 * 1024 * 1024,
  });
  const entries = readdirSync(destDir);
  if (!entries.length) throw new Error('tarball 解压为空');
  const rootDir = join(destDir, entries[0]);
  // 目录名形如 <repo>-<ref>,从中提取默认分支;无法识别时回退 HEAD
  const suffix = entries[0].slice(repo.length + 1);
  const ref = /^[0-9a-f]{7,}$/.test(suffix) || !suffix ? 'HEAD' : suffix;
  return { rootDir, ref };
}

/** 递归收集目录下内容 md 文件(相对 rootDir) */
function collectMd(dir, rootDir, out = [], depth = 0) {
  if (depth > 4 || out.length > MAX_CHAPTERS * 2) return out;
  for (const name of readdirSync(dir).sort()) {
    const full = join(dir, name);
    const rel = relative(rootDir, full).split('\\').join('/');
    if (EXCLUDE.test(rel)) continue;
    const st = statSync(full);
    if (st.isDirectory()) collectMd(full, rootDir, out, depth + 1);
    else if (/\.(md|markdown|mdown|rst)$/i.test(name) && st.size > 0 && st.size <= MAX_CHAPTER_BYTES) {
      if (!EXCLUDE_FILES.test(basename(name).replace(extname(name), '').toLowerCase())) out.push(rel);
    }
  }
  return out;
}

/** 从 SUMMARY.md 提取有序章节路径与标题(GitBook 格式) */
function parseSummary(rootDir, baseDir) {
  const p = join(rootDir, baseDir, 'SUMMARY.md');
  if (!existsSync(p)) return null;
  const text = readFileSync(p, 'utf8');
  const out = [];
  const re = /\*?\s*\[([^\]]+)\]\(([^)#]+)(?:#[^)]*)?\)/g;
  let m;
  while ((m = re.exec(text))) {
    const title = m[1].trim();
    const file = m[2].trim();
    if (!/^https?:\/\//i.test(file)) out.push({ title, file: posix.normalize(file) });
  }
  return out.length ? out : null;
}

function mdTitle(content, fallback) {
  const m = /^#\s+(.+?)\s*$/m.exec(content);
  return m ? m[1].replace(/\s*<!--.*-->\s*$/, '').trim() : fallback;
}

/** 剥离 md frontmatter,返回 { body, frontTitle? } */
function stripFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return { body: text };
  const fm = m[1];
  const t = /^title:\s*(?:"([^"]*)"|'([^']*)'|(.+))\s*$/m.exec(fm);
  return { body: text.slice(m[0].length), frontTitle: t ? (t[1] || t[2] || t[3]).trim() : undefined };
}

/**
 * 抓取 GitHub 来源,返回章节列表。
 * @returns {{ license?: string, ref: string, chapters: { slug, title, file }[] }}
 */
export async function fetchGithubBook(book, workDir) {
  const info = parseGithubUrl(book.url);
  if (!info) throw new Error('非 GitHub URL');
  const { owner, repo } = info;
  const { rootDir, ref } = await downloadRepoTarball(owner, repo, workDir);
  const rawBase = repoRawBase(owner, repo, ref);
  // API 查询更准(仓库 LICENSE 文件名任意时也能识别);无 token 限流易失败,静默回退 tarball 检测
  const license = (await fetchLicenseByApi(owner, repo)) || detectLicense(rootDir);
  let relFiles;
  let baseDir = info.path ? info.path.replace(/\/$/, '') : '';

  if (info.kind === 'file') {
    // 单文件模式:文件即全书(如 the-art-of-command-line/README-zh.md)
    const abs = join(rootDir, info.path || '');
    if (!existsSync(abs)) throw new Error(`目标文件不存在: ${info.path}`);
    relFiles = [info.path];
    baseDir = dirname(info.path);
  } else {
    const summary = info.kind === 'subdir' ? null : parseSummary(rootDir, '');
    const summaryList = summary ?? parseSummary(rootDir, baseDir);
    if (summaryList) {
      const files = summaryList
        .map((s) => ({ title: s.title, rel: posix.join(baseDir, s.file).replace(/^\.\//, '') }))
        .filter((s) => existsSync(join(rootDir, s.rel)) && !EXCLUDE.test(s.rel));
      const chapters = files.slice(0, MAX_CHAPTERS).map((s, i) => toChapter(s.rel, s.title, i, rootDir));
      return { owner, repo, license, ref, rawBase, chapters };
    }
    // 目录收集模式
    const scope = info.kind === 'subdir' && baseDir ? join(rootDir, baseDir) : rootDir;
    if (!existsSync(scope)) throw new Error(`子目录不存在: ${baseDir}`);
    relFiles = collectMd(scope, rootDir).filter((f) => !/README/i.test(basename(f)) || f.toLowerCase().includes('readme'));
    // README 置顶,其余按路径排序
    relFiles.sort((a, b) => {
      const ra = /readme/i.test(basename(a)) ? 0 : 1;
      const rb = /readme/i.test(basename(b)) ? 0 : 1;
      return ra - rb || a.localeCompare(b);
    });
  }

  const chaptersOut = relFiles.slice(0, MAX_CHAPTERS).map((rel, i) => {
    const raw = readFileSync(join(rootDir, rel), 'utf8');
    const { body, frontTitle } = stripFrontmatter(raw);
    return {
      slug: `${String(i + 1).padStart(3, '0')}-${slugify(basename(rel).replace(/\.(md|markdown|mdown|rst)$/i, ''))}`,
      title: frontTitle || mdTitle(body, basename(rel).replace(extname(rel), '')),
      file: rel,
      body,
    };
  });
  return { owner, repo, license, ref, rawBase, chapters: chaptersOut };
}

function toChapter(rel, title, i, rootDir) {
  const raw = readFileSync(join(rootDir, rel), 'utf8');
  const { body, frontTitle } = stripFrontmatter(raw);
  return {
    slug: `${String(i + 1).padStart(3, '0')}-${slugify(basename(rel).replace(/\.(md|markdown|mdown|rst)$/i, ''))}`,
    title: frontTitle || title || basename(rel).replace(extname(rel), ''),
    file: rel,
    body,
  };
}

/** 相对链接/图片 → raw.githubusercontent 绝对地址。
 * 覆盖:内联 `](rel)`、HTML `src="rel"`、引用式定义 `[id]: rel` */
export function absolutizeMd(md, rawBase, currentRelPath) {
  const baseDir = posix.dirname(currentRelPath);
  const toAbs = (target) => {
    const abs = posix.normalize(posix.join(baseDir, decodeURI(target)));
    return `${rawBase}/${abs.replace(/^\.\//, '')}`;
  };
  return (
    md
      .replace(
        /(\]\(|src="|src=')(?!https?:\/\/|#|data:|mailto:)([^)"'\s]+)/g,
        (full, prefix, target) => `${prefix}${toAbs(target)}`,
      )
      // 引用式定义:行首(或空白后) [label]: 相对路径
      .replace(/^(\s*\[[^\]\n]+\]:\s*)(?!https?:\/\/|#|data:|mailto:)(\S+)$/gm, (full, prefix, target) => {
        try {
          return `${prefix}${toAbs(target)}`;
        } catch {
          return full;
        }
      })
  );
}

/** GitHub API 查询仓库许可证(有 GITHUB_TOKEN 时可用;失败返回 undefined) */
export async function fetchLicenseByApi(owner, repo) {
  try {
    const headers = { accept: 'application/vnd.github+json' };
    if (process.env.GITHUB_TOKEN || process.env.GH_TOKEN) {
      headers.authorization = `Bearer ${process.env.GITHUB_TOKEN || process.env.GH_TOKEN}`;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/license`, {
      headers,
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return undefined;
    const data = await res.json();
    return data.license?.spdx_id && data.license.spdx_id !== 'NOASSERTION' ? data.license.spdx_id : undefined;
  } catch {
    return undefined;
  }
}

export function detectLicense(rootDir) {
  const candidates = ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'COPYING', 'LICENCE', 'LICENSE-MIT'];
  for (const c of candidates) {
    const p = join(rootDir, c);
    if (existsSync(p)) {
      const head = readFileSync(p, 'utf8').slice(0, 800).toLowerCase();
      if (head.includes('apache license')) return 'Apache-2.0';
      if (head.includes('gnu general public license')) return head.includes('version 3') ? 'GPL-3.0' : 'GPL';
      if (head.includes('mit license')) return 'MIT';
      if (head.includes('creative commons')) {
        const m = /creative commons.*(zero|by-nc-sa|by-nc|by-sa|by)/.exec(head);
        return m ? `CC-${m[1].toUpperCase()}` : 'CC';
      }
      if (head.includes('bsd')) return 'BSD';
      return 'custom';
    }
  }
  return undefined;
}

export function slugify(s) {
  return (
    s
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'chapter'
  );
}
