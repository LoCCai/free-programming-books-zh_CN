/**
 * 普通 URL 抓取:HTML → readability 正文抽取 → markdown。
 * 支持"下一页"链式抓取(上限 MAX_PAGES),适配多数在线教程站。
 */
import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';
import TurndownService from 'turndown';
import * as gfmExports from 'turndown-plugin-gfm';

const gfm = gfmExports.gfm ?? gfmExports.default?.gfm ?? gfmExports.default ?? gfmExports;

const MAX_PAGES = 50;
const PAGE_TIMEOUT_MS = 20000;

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});
turndown.use(gfm);
turndown.remove(['script', 'style', 'noscript', 'nav', 'footer', 'form']);

export async function fetchPageText(url) {
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
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

/** 单页 HTML → { title, markdown, nextUrl } */
export function htmlToArticle(html, baseUrl) {
  const { document } = parseHTML(html);
  // 常见"下一页"链接(rel=next 或文本匹配)
  let nextUrl;
  const nextLink =
    document.querySelector('link[rel="next"]') ||
    [...document.querySelectorAll('a')].find((a) => {
      const t = (a.textContent || '').trim();
      return /^(下一页|下一章|next\s*page|next\s*chapter|next\s*›?|›|»)$/i.test(t);
    });
  if (nextLink) {
    try {
      const href = nextLink.getAttribute('href') || nextLink.href;
      if (href && !href.startsWith('#')) {
        const abs = new URL(href, baseUrl);
        if (abs.origin === new URL(baseUrl).origin) nextUrl = abs.href;
      }
    } catch { /* 忽略非法链接 */ }
  }

  for (const el of document.querySelectorAll('script,style,noscript,nav,footer,header form')) el.remove();
  const article = new Readability(document.cloneNode(true)).parse();
  if (!article?.content) {
    // readability 失败 → 回退 body 直转
    const body = document.querySelector('body')?.innerHTML || html;
    return { title: document.title || baseUrl, markdown: turndown.turndown(body), nextUrl };
  }
  return {
    title: article.title || document.title || baseUrl,
    markdown: turndown.turndown(article.content),
    nextUrl,
  };
}

/**
 * 链式抓取一本书:起始页 + 跟随"下一页"。
 * @returns {{ chapters: { slug, title, body }[] }}
 */
export async function fetchWebBook(startUrl) {
  const chapters = [];
  const seen = new Set();
  let url = startUrl;
  let bookTitle;
  while (url && chapters.length < MAX_PAGES && !seen.has(url)) {
    seen.add(url);
    const html = await fetchPageText(url);
    const { title, markdown, nextUrl } = htmlToArticle(html, url);
    if (!bookTitle) bookTitle = title;
    const body = markdown.trim();
    // 过短页面(目录壳/空壳)仅当有下一页时跳过
    if (body.length > 200 || !nextUrl) {
      chapters.push({
        slug: `${String(chapters.length + 1).padStart(3, '0')}-${url.length.toString(36)}`,
        title: chapters.length === 0 && title ? title : title || `第 ${chapters.length + 1} 页`,
        body,
      });
    }
    url = nextUrl;
  }
  if (!chapters.length) throw new Error('未能抽取到正文内容');
  return { title: bookTitle, chapters };
}
