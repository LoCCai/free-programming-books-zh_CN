/**
 * 上游书单 markdown → 结构化数据。
 *
 * README.md 结构(经实测确认):
 * - `## 分类` 二级标题 + 一处 `<h2 id="csshtml">CSS/HTML</h2>` HTML 标题
 * - 特殊节:`参与交流`、`目录`(锚点列表,需跳过)
 * - 条目 `* [书名](URL) 描述`,`置顶` 节用 `-` 符号
 * - `:worried:` 标记失效链接;嵌套列表父项为无链接纯文本(如 `* jQuery`)
 * - `[返回目录](#目录)` 等锚点链接混在正文
 */
import {
  extractLink,
  cleanDescription,
  matchListItem,
  matchH2,
  matchH3,
  matchHtmlH2,
  indentLevel,
  bookId,
  decodeEntities,
} from './mdparse.mjs';

/** 这些分类是站务内容而非书籍,整节跳过 */
const SKIP_SECTIONS = new Set(['参与交流', '目录']);

/**
 * 解析 README.md 内容为条目数组。
 * @param {string} content 文件全文
 * @param {string} sourceFile 文件名(写入条目 sourceFile 便于追溯)
 * @returns {{ books: object[], sections: string[], skippedLines: number }}
 */
export function parseBookListMd(content, sourceFile) {
  // Windows 检出(autocrlf)下内容为 CRLF,而 matchListItem 的 `.` 不匹配 \r,
  // 统一在此归一换行,行级正则不必各自兼容
  const lines = content.split(/\r\n?|\n/);
  const books = [];
  const sections = [];
  let skippedLines = 0;

  let category = null; // 当前 ## 分类
  let inSkip = false; // 当前是否处于跳过节
  let parents = []; // 嵌套父类目栈,元素 { level, name }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;

    const h2 = matchH2(line);
    const htmlH2 = h2 ? null : matchHtmlH2(line);
    if (h2 || htmlH2) {
      category = decodeEntities(h2 || htmlH2.text);
      inSkip = SKIP_SECTIONS.has(category);
      parents = [];
      if (!inSkip) sections.push(category);
      continue;
    }
    if (inSkip) continue;
    if (!category) continue; // 文件头部说明区(首个分类标题之前)的列表行不是书单

    // ### 三级标题 → 视作分类下新子类目起点(当前上游仅一个空的"测试相关")
    const h3 = matchH3(line);
    if (h3) {
      parents = [{ level: 0, name: h3 }];
      continue;
    }

    const item = matchListItem(line);
    if (!item) continue;

    // 目录区之外的锚点链接条目(如 [返回目录](#目录))不可达此分支:
    // inSkip 已过滤;但防御性再过滤一次纯锚点
    const link = extractLink(item.content);
    if (!link) {
      // 无链接 → 嵌套父类目(如 `* jQuery`)
      const level = indentLevel(item.indent);
      parents = parents.slice(0, level);
      parents.push({ level, name: item.content });
      continue;
    }
    if (!link.url || link.url.startsWith('#')) {
      skippedLines++;
      continue;
    }
    if (!/^https?:\/\//i.test(link.url)) {
      skippedLines++;
      continue;
    }

    const { text: description, emojis } = cleanDescription(link.rest);
    const desc = decodeEntities(description);
    // 链接条目按自身缩进裁剪父类目栈:与最后一个父类目同级的书不属于其下
    // (如 JavaScript 下 `* jQuery`(无链接)之后出现的顶级书)
    parents = parents.slice(0, indentLevel(item.indent));
    const path = [category, ...parents.filter(Boolean).map((p) => p.name)];
    // `* 书名 ([译本一](u) [译本二](u))` 这类条目:书名取链接前的文本,
    // 链接文本("译本一")不是书名
    const prefixTitle = link.before.replace(/[([（【]\s*$/, '').trim();
    books.push({
      id: '', // 由调用方统一编号
      title: decodeEntities(prefixTitle || link.title),
      url: link.url,
      description: desc,
      categoryPath: path,
      status: emojis.includes(':worried:') ? 'deprecated' : 'ok',
      sourceFile,
      line: lineNo,
    });
  }

  return { books, sections, skippedLines };
}

/**
 * 解析非编程书单:每个 `## 《书名》` 是一本书,标题下正文段落即介绍。
 * 链接多为亚马逊购买页,非免费在线阅读,故 url 取首个链接(可为空)。
 * @returns {{ books: object[] }}
 */
export function parseNonProgrammingMd(content, sourceFile) {
  const lines = content.split(/\r\n?|\n/);
  const books = [];
  let current = null; // { titleLine, paragraphs: string[] }

  const flush = () => {
    if (!current) return;
    const { text: description } = cleanDescription(current.paragraphs.join(' '));
    const desc = decodeEntities(description);
    // 标题形如 `《哥德尔、艾舍尔、巴赫——集异璧之大成》Gödel, Escher, Bach, …`
    const zh = /《(.+?)》/.exec(current.titleLine);
    const title = decodeEntities(zh ? `《${zh[1]}》` : current.titleLine);
    // 取正文第一个 markdown 链接作为参考链接(亚马逊等)
    const lm = /\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/.exec(current.paragraphs.join('\n'));
    books.push({
      id: '',
      title,
      subtitle: zh ? current.titleLine.replace(zh[0], '').trim() : '',
      url: lm ? lm[2] : '',
      description: desc.slice(0, 500),
      categoryPath: ['程序员应有的非编程书籍'],
      status: 'ok',
      sourceFile,
      line: current.line,
    });
    current = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const h2 = matchH2(line);
    if (h2) {
      flush();
      current = { titleLine: h2, paragraphs: [], line: i + 1 };
      continue;
    }
    if (!current) continue;
    // 引用块与正文都计入介绍;跳过空行与图片
    if (line.trim()) current.paragraphs.push(line.replace(/!\[[^\]]*\]\([^)]*\)/g, ''));
  }
  flush();

  return { books };
}

/**
 * 为条目分配稳定 id(URL sha1 前 12 位,重复加序号)并做同源去重标记。
 */
export function assignIds(books) {
  const seen = new Map();
  for (const b of books) {
    b.id = bookId(b.url || b.title, seen);
  }
  return books;
}
