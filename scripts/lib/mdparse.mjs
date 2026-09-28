/**
 * markdown 行级解析原语(零依赖)。
 * 针对上游书单的实际格式:balanced brackets 标题、URL 内含括号、
 * 全角/半角括号描述、:emoji: 状态标记、嵌套列表。
 */
import { createHash } from 'node:crypto';

/**
 * 解析列表项文本中的 markdown 链接。
 * 支持 title 内嵌套 `[`(如 `[[笔记]xxx]`)与 url 内配对括号
 * (如 `...(a(b).pdf)`)。CommonMark 对二者的处理均为深度配对。
 * @param {string} text 列表项剩余文本,如 `[书名](url) 描述` 或 `纯父类目`
 * @returns {{ title: string, url: string, rest: string } | null} null 表示无链接(父类目项)
 */
export function extractLink(text) {
  const open = text.indexOf('[');
  if (open === -1) return null;

  // 找与 open 配对的 ]( — bracket 深度扫描
  let depth = 0;
  let close = -1;
  for (let i = open; i < text.length; i++) {
    const ch = text[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        close = i;
        break;
      }
    } else if (ch === '\\') i++; // 转义字符跳过下一个
  }
  if (close === -1 || close + 1 >= text.length || text[close + 1] !== '(') return null;

  // 找配对的 ) — paren 深度扫描(URL 内允许成对括号)
  let pdepth = 0;
  let pend = -1;
  for (let i = close + 1; i < text.length; i++) {
    const ch = text[i];
    if (ch === '\\') i++;
    else if (ch === '(') pdepth++;
    else if (ch === ')') {
      pdepth--;
      if (pdepth === 0) {
        pend = i;
        break;
      }
    }
  }
  if (pend === -1) return null;

  return {
    title: text.slice(open + 1, close).trim(),
    url: text.slice(close + 2, pend).trim(),
    rest: text.slice(pend + 1, text.length).trim(),
    before: text.slice(0, open).trim(),
  };
}

/** :word: 形式的 emoji 短代码(:worried: / :100: 等) */
const EMOJI_RE = /:[a-zA-Z_+-][a-zA-Z0-9_+-]*:/g;

/**
 * 清洗条目描述为纯文本:
 * - 抽取 :emoji: 短代码并从文本移除
 * - 内嵌 markdown 链接 `[t](u)` → `t`
 * - 强调/加粗标记 `*x*` `**x**` → `x`
 * - 合并空白
 * @returns {{ text: string, emojis: string[] }}
 */
export function cleanDescription(rest) {
  const emojis = [];
  let text = rest.replace(EMOJI_RE, (m) => {
    emojis.push(m);
    return ' ';
  });
  text = text
    .replace(/\[([^\]]*)\]\(([^)]*)\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1');
  text = text.replace(/[\s\u3000]+/g, ' ').trim();
  return { text, emojis };
}

/**
 * 列表行匹配:同时接受 `*` 与 `-` 符号(上游"置顶"节用 `-`)。
 * @returns {{ indent: number, content: string } | null}
 */
export function matchListItem(line) {
  const m = /^(\s*)[*-] (.+)$/.exec(line);
  if (!m) return null;
  return { indent: m[1].length, content: m[2].trim() };
}

/** `## 标题` 二级标题 */
export function matchH2(line) {
  const m = /^## (?!#)(.+?)\s*$/.exec(line);
  return m ? m[1].trim() : null;
}

/** `### 标题` 三级标题 */
export function matchH3(line) {
  const m = /^### (?!#)(.+?)\s*$/.exec(line);
  return m ? m[1].trim() : null;
}

/** `<h2 id="x">标题</h2>` HTML 标题(上游 CSS/HTML 节) */
export function matchHtmlH2(line) {
  const m = /^<h2(?:\s+id="([^"]*)")?>(.+?)<\/h2>\s*$/i.exec(line.trim());
  if (!m) return null;
  return { anchor: m[1] || null, text: m[2].trim() };
}

/** 列表缩进 → 嵌套层级(上游目录区 2 空格、正文嵌套 4 空格) */
export function indentLevel(indent) {
  if (indent <= 0) return 0;
  if (indent < 4) return 1;
  return Math.round(indent / 4);
}

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', copy: '©',
  mdash: '—', ndash: '–', hellip: '…', middot: '·', laquo: '«', raquo: '»',
};

/** 解码 HTML 实体(上游标题偶用 `C&#35;` 表示 C#) */
export function decodeEntities(s) {
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, body) => {
    if (body.startsWith('#x') || body.startsWith('#X')) {
      const n = parseInt(body.slice(2), 16);
      return Number.isNaN(n) ? m : String.fromCodePoint(n);
    }
    if (body.startsWith('#')) {
      const n = parseInt(body.slice(1), 10);
      return Number.isNaN(n) ? m : String.fromCodePoint(n);
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? m;
  });
}

/** 短 id:URL 的 sha1 前 12 位,同 URL 重复时追加序号 */
export function bookId(url, seenCounts) {
  const hash = cryptoHash(url);
  const n = (seenCounts.get(url) || 0) + 1;
  seenCounts.set(url, n);
  return n === 1 ? hash : `${hash}-${n}`;
}

function cryptoHash(s) {
  return createHash('sha1').update(s).digest('hex').slice(0, 12);
}
