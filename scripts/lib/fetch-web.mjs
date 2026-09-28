/**
 * 普通 URL 抓取:HTML → readability 正文抽取 → markdown。
 *
 * 章节发现(three-tier):
 * 0. 单文档门槛 —— 起始页正文 ≥ SINGLE_DOC_MIN_CHARS 视为单页文档(单页教程/
 *    速查表),直接走链式收录:此类页面导航里的语言版本/站内推荐链接会污染
 *    目录发现,把整站误抓成"章节";
 * 1. 目录优先 —— 教程站的侧栏/顶部目录(nav/aside/toc 容器,或与当前页共享
 *    路径前缀的同源链接聚类,成员 ≥3)即"本书目录",按 DOM 顺序整本抓取;
 * 2. 兜底 —— "下一页"链式跟随(rel=next / a[rel=next] / next 容器 / 文本匹配),
 *    且可用目录顺序推算下一项。
 */
import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';
import TurndownService from 'turndown';
import * as gfmExports from 'turndown-plugin-gfm';

const gfm = gfmExports.gfm ?? gfmExports.default?.gfm ?? gfmExports.default ?? gfmExports;

const MAX_PAGES = 200;
const PAGE_TIMEOUT_MS = 20000;
const FETCH_RETRIES = 2;
const POLITENESS_DELAY_MS = 150;
// 起始页抽取正文达到该字符数 → 视为单文档书籍(整本书就是这一页,如单页教程/
// 速查表),跳过目录发现,避免把页面导航里的同源链接误当章节目录
const SINGLE_DOC_MIN_CHARS = 6000;

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});
turndown.use(gfm);
turndown.remove(['script', 'style', 'noscript', 'nav', 'footer', 'form']);

export async function fetchPageText(url) {
  let lastErr;
  for (let attempt = 1; attempt <= FETCH_RETRIES; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), PAGE_TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        signal: ctrl.signal,
        redirect: 'follow',
        headers: {
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36 fpb-zh-bookbot/0.1',
          'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const type = res.headers.get('content-type') || '';
      if (!/html|text\/plain|xhtml/i.test(type)) throw new Error(`不支持的内容类型: ${type.split(';')[0]}`);
      // 返回重定向后的最终 URL:目录发现的同源判定必须以它为基准
      return { html: await res.text(), finalUrl: res.url || url };
    } catch (e) {
      lastErr = e;
      if (attempt < FETCH_RETRIES) await sleep(800 * attempt);
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastErr;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** URL 比较键:去 fragment;路径尾 index.html 归一 */
function urlKey(u) {
  const x = new URL(u);
  x.hash = '';
  let p = x.pathname.replace(/\/index\.html?$/i, '/') || '/';
  return x.origin + p;
}

/** 是否值得作为章节页的链接(排除资源/纯锚点/邮件;origin 由调用方判定) */
function isPageLink(href) {
  if (!href) return false;
  if (href.startsWith('#')) return false;
  try {
    const u = new URL(href, 'https://x.invalid');
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
    if (/\.(pdf|png|jpe?g|gif|svg|webp|ico|zip|tar|gz|css|js|rss|xml|mp4|mp3)([?#]|$)/i.test(u.pathname)) return false;
    return true;
  } catch {
    return false;
  }
}


/** 收集容器内/文档内的同源页面链接(DOM 顺序,按 urlKey 去重,附链接文本)。
 * 注意:相对链接必须相对「页面 URL」解析(而非站点 origin),否则目录链接 404 */
function collectLinks(root, baseUrl) {
  const baseOrigin = new URL(baseUrl).origin;
  const seen = new Set();
  const out = [];
  for (const a of root.querySelectorAll('a')) {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || !isPageLink(href)) continue;
    let abs;
    try {
      abs = new URL(href, baseUrl);
      if (abs.origin !== baseOrigin) continue;
    } catch {
      continue;
    }
    const key = urlKey(abs.href);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ url: abs.href, key, text: (a.textContent || '').trim().slice(0, 120) });
  }
  return out;
}

const TOC_CONTAINER_SEL = 'nav, aside, [class*="toc"], [class*="menu"], [class*="sidebar"], [class*="catalog"], [id*="toc"], [id*="menu"], [id*="catalog"]';

/**
 * 目录发现:
 * 1. 候选容器(nav/aside/toc 类)内同源页面链接 ≥3,且包含当前页或其路径前缀
 *    → 取成员最多的容器,DOM 顺序即章节顺序;
 * 2. 兜底:全文档同源链接中,与当前页路径共享目录前缀 p 的聚类(p 取当前页
 *    最长的、使成员 ≥3 的祖先目录),保持 DOM 顺序。
 * @returns {{ url: string, text: string }[] | null} 有序章节清单(含当前页)
 */
export function discoverToc(document, baseUrl) {
  const base = new URL(baseUrl);
  base.hash = '';
  // 与 urlKey 一致地归一路径,否则 .../index.html 与 .../ 的层级前缀判断失配
  base.pathname = base.pathname.replace(/\/index\.html?$/i, '/') || '/';
  const basePath = base.pathname;
  const selfKey = urlKey(baseUrl);
  const selfDir = basePath.replace(/[^/]*$/, ''); // 当前页所在目录

  // --- 容器层 ---
  const containerCands = [];
  for (const el of document.querySelectorAll(TOC_CONTAINER_SEL)) {
    const links = collectLinks(el, baseUrl);
    if (links.length >= 3) {
      // 目录与当前页"层级关联":含当前页本身,或存在目录项位于当前页之下/之上
      // (FreeBSD 等手册的目录不含自身首页,故用双向前缀判断)
      const hasSelf = links.some((l) => {
        try {
          const lp = new URL(l.url).pathname;
          return l.key === selfKey || (lp !== basePath && (lp.startsWith(basePath) || basePath.startsWith(lp)));
        } catch {
          return false;
        }
      });
      containerCands.push({ links, hasSelf });
    }
  }
  if (containerCands.length) {
    // 优先含当前页的容器,其次取成员最多的
    containerCands.sort((a, b) => Number(b.hasSelf) - Number(a.hasSelf) || b.links.length - a.links.length);
    const toc = containerCands[0].links;
    if (!toc.some((l) => l.key === selfKey)) toc.unshift({ url: baseUrl, key: selfKey, text: '' });
    return toc.slice(0, MAX_PAGES);
  }

  // --- 前缀聚类层(覆盖 JS 渲染侧栏:链接数据仍内嵌在页面中) ---
  const all = collectLinks(document, baseUrl);
  if (all.length < 3) return null;
  const segments = selfDir.split('/').filter(Boolean); // 当前页的目录段
  // 从最深的祖先目录向根扫描,找到使成员 ≥3 的最长前缀
  for (let depth = segments.length; depth >= 1; depth--) {
    const prefix = '/' + segments.slice(0, depth).join('/') + '/';
    const cluster = all.filter((l) => new URL(l.url).pathname.startsWith(prefix));
    if (cluster.length >= 3) {
      const toc = cluster;
      if (!toc.some((l) => l.key === selfKey)) toc.unshift({ url: baseUrl, key: selfKey, text: '' });
      return toc.slice(0, MAX_PAGES);
    }
  }
  // 整站即小书 / 全部章节平铺在根路径(如 javascript.info):所有同源页面链接
  // 本身构成目录,超限由 MAX_PAGES 统一截断
  if (all.length >= 3) {
    const toc = all;
    if (!toc.some((l) => l.key === selfKey)) toc.unshift({ url: baseUrl, key: selfKey, text: '' });
    return toc.slice(0, MAX_PAGES);
  }
  return null;
}

/** 单页 HTML → { title, markdown, nextUrl } */
export function htmlToArticle(html, baseUrl) {
  const { document } = parseHTML(html);
  // DOM 层资源绝对化:覆盖 src/href/poster/srcset 全部形态(Vite 会把 md 里
  // 的相对图片当构建资源导入,漏网即构建失败)
  for (const el of document.querySelectorAll('[src], [href], [poster], [srcset]')) {
    for (const attr of ['src', 'href', 'poster']) {
      const v = el.getAttribute(attr);
      if (v && !/^(https?:|data:|mailto:|javascript:|#)/i.test(v)) {
        try {
          el.setAttribute(attr, new URL(v, baseUrl).href);
        } catch { /* 非法 URL 保留原样 */ }
      }
    }
    const srcset = el.getAttribute('srcset');
    if (srcset) {
      el.setAttribute(
        'srcset',
        srcset
          .split(',')
          .map((part) => {
            const t = part.trim().split(/\s+/);
            if (t[0] && !/^(https?:|data:)/i.test(t[0])) {
              try {
                t[0] = new URL(t[0], baseUrl).href;
              } catch { /* 保留 */ }
            }
            return t.join(' ');
          })
          .join(', '),
      );
    }
  }

  // 下一页(兜底链式用):rel=next → next 容器 → 文本匹配
  const isNextText = (t) => /^(下一页|下一章|下一篇|next\s*page|next\s*chapter|next\s*›?|›|»)$/i.test(t.trim());
  const nextLink =
    document.querySelector('link[rel="next"]') ||
    document.querySelector('a[rel="next"]') ||
    [...document.querySelectorAll('a')].find((a) => {
      const box = a.closest('[class*="next"], [id*="next"]');
      const href = a.getAttribute('href');
      return box && href && !href.startsWith('#') && (isNextText(a.textContent) || (a.textContent || '').trim() === '');
    }) ||
    [...document.querySelectorAll('a')].find((a) => isNextText(a.textContent));
  let nextUrl;
  if (nextLink) {
    try {
      const href = nextLink.getAttribute('href') || nextLink.href;
      if (href && !href.startsWith('#')) {
        const abs = new URL(href, baseUrl);
        if (abs.origin === new URL(baseUrl).origin) nextUrl = abs.href;
      }
    } catch { /* 忽略非法链接 */ }
  }

  // og:title/twitter:title 在整站共用品牌串的站点上是噪音(cb.vu 每页都是
  // "CB.VU - Linux, Unix & Webmaster Resources"),而 Readability 会优先采信
  // 它;移除后以 <title> 为准 —— 由站点逐页编写,更能代表本页内容
  const docTitle = (document.title || '').trim();
  for (const m of document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]')) m.remove();
  for (const el of document.querySelectorAll('script,style,noscript,nav,footer,header form')) el.remove();
  const article = new Readability(document.cloneNode(true)).parse();
  if (!article?.content) {
    // readability 失败 → 回退 body 直转
    const body = document.querySelector('body')?.innerHTML || html;
    return { title: docTitle || baseUrl, markdown: turndown.turndown(body), nextUrl };
  }
  // <title> 足够具体(≥10 字符)时直接采信;否则保留 Readability 的推断
  const title = docTitle.length >= 10 ? docTitle : article.title || docTitle || baseUrl;
  return {
    title,
    markdown: turndown.turndown(article.content),
    nextUrl,
  };
}

/** markdown 层兜底绝对化(HTML 层遗漏的 `](rel)` / src 形态) */
export function absolutizeWebMd(md, baseUrl) {
  return md.replace(/(\]\(|src="|src=')((?!https?:\/\/|data:|mailto:|javascript:|#)[^)"'\s]+)/g, (full, prefix, target) => {
    try {
      return `${prefix}${new URL(target, baseUrl).href}`;
    } catch {
      return full;
    }
  });
}

function slugifyText(s) {
  return (
    (s || '')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'page'
  );
}

/**
 * 抓取整本书:单文档门槛(正文够长直接链式) → 目录发现按序抓取;目录不可得时
 * 退回下一页链式。纯 JS 渲染站点(页面壳无链接)判定为不可静态抓取,抛错走外链降级。
 * @returns {{ title?: string, chapters: { slug, title, body }[], viaToc: boolean }}
 */
export async function fetchWebBook(startUrl) {
  const { html: startHtml, finalUrl } = await fetchPageText(startUrl);
  const startDoc = parseHTML(startHtml).document;
  // SPA 壳检测:几乎无链接且脚本密集 → 静态抓取无意义
  const linkCount = startDoc.querySelectorAll('a').length;
  const scriptCount = startDoc.querySelectorAll('script[src], script:not([src])').length;
  if (linkCount < 3 && scriptCount >= 3) {
    throw new Error('JS 渲染站点,无静态可抓内容');
  }
  // 单文档门槛:正文即整本书 → 链式收录(含 rel=next 翻页),跳过目录发现
  const startBody = htmlToArticle(startHtml, finalUrl).markdown.trim();
  if (startBody.length >= SINGLE_DOC_MIN_CHARS) {
    const chained = await fetchByNextChain(startHtml, finalUrl);
    assertDistinctChapters(chained.chapters);
    return { ...chained, viaToc: false };
  }
  const toc = discoverToc(startDoc, finalUrl);
  if (toc && toc.length >= 3) {
    const byToc = await fetchByToc(startUrl, finalUrl, toc);
    assertDistinctChapters(byToc.chapters);
    return byToc;
  }
  const chained = await fetchByNextChain(startHtml, finalUrl);
  assertDistinctChapters(chained.chapters);
  return { ...chained, viaToc: false };
}

/** 防呆:多章标题完全相同几乎必然是整站导航被误当目录(语言版落地页/首页重复
 * 收录)。宁可抛错降级为外链,不产出垃圾镜像 */
function assertDistinctChapters(chapters) {
  const counts = new Map();
  for (const c of chapters) counts.set(c.title, (counts.get(c.title) || 0) + 1);
  for (const [title, n] of counts) {
    if (n >= 3) throw new Error(`疑似整站误抓:${n} 个章节标题完全相同「${title}」`);
  }
}

/** 模式一:按目录顺序整本抓取 */
async function fetchByToc(startUrl, selfUrl, toc) {
  const chapters = [];
  const seen = new Set();
  let bookTitle;
  for (const item of toc) {
    if (chapters.length >= MAX_PAGES) break;
    if (seen.has(item.key)) continue;
    seen.add(item.key);
    try {
      const { html, finalUrl } = await fetchPageText(item.url);
      // 同一页面经重定向/别名 URL 会在目录里出现多次,按最终 URL 二次去重
      const finalKey = urlKey(finalUrl);
      if (!seen.has(finalKey)) {
        seen.add(finalKey);
        const { title, markdown } = htmlToArticle(html, finalUrl);
        const body = markdown.trim();
        // 目录壳(几乎无正文)不收为章节
        if (body.length > 200 || toc.length <= 3) {
          if (!bookTitle && (item.url === startUrl || finalUrl === selfUrl)) bookTitle = title;
          chapters.push({
            slug: `${String(chapters.length + 1).padStart(3, '0')}-${slugifyText(item.text || title)}`,
            title: title || item.text || `第 ${chapters.length + 1} 节`,
            body,
          });
        }
      }
    } catch {
      // 单页失败跳过,不中断整本
    }
    await sleep(POLITENESS_DELAY_MS);
  }
  if (!chapters.length) throw new Error('目录抓取未得到任何章节');
  return { title: bookTitle, chapters, viaToc: true };
}

/** 模式二(兜底):下一页链式 */
async function fetchByNextChain(startHtml, startUrl) {
  const chapters = [];
  const seen = new Set();
  let url = startUrl;
  let html = startHtml;
  let bookTitle;
  while (url && chapters.length < MAX_PAGES && !seen.has(urlKey(url))) {
    seen.add(urlKey(url));
    const { title, markdown, nextUrl } = htmlToArticle(html, url);
    if (!bookTitle) bookTitle = title;
    const body = markdown.trim();
    if (body.length > 200 || !nextUrl) {
      chapters.push({
        slug: `${String(chapters.length + 1).padStart(3, '0')}-${slugifyText(title)}`,
        title: title || `第 ${chapters.length + 1} 页`,
        body,
      });
    }
    if (!nextUrl) break;
    const { html: nextHtml, finalUrl } = await fetchPageText(nextUrl);
    url = finalUrl;
    html = nextHtml;
    await sleep(POLITENESS_DELAY_MS);
  }
  if (!chapters.length) throw new Error('未能抽取到正文内容');
  return { title: bookTitle, chapters };
}
