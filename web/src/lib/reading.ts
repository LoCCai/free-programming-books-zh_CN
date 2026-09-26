/**
 * 阅读器内容层:扫描 content/books/<id>/(由抓取管道生成)。
 * - meta.json:书籍抓取元数据 + 章节树
 * - chapters/*.md:章节正文(抓取时统一转为 markdown)
 */
export interface ChapterRef {
  slug: string;
  title: string;
  file: string;
}

export interface BookMeta {
  bookId: string;
  title: string;
  url: string;
  license?: string;
  sourceType?: 'github' | 'web' | 'manual';
  status: 'ok' | 'partial' | 'failed';
  fetchedAt?: string;
  error?: string;
  chapters: ChapterRef[];
}

// eager:false:章节按需编译;meta eager:true:路由生成需要全部章节树
const metaModules = import.meta.glob('../_content/books/*/meta.json', {
  eager: true,
}) as Record<string, { default: BookMeta }>;

export const bookMetas: Record<string, BookMeta> = {};
for (const [path, mod] of Object.entries(metaModules)) {
  const m = mod.default;
  if (m?.bookId) bookMetas[m.bookId] = m;
}

export function metaOf(bookId: string): BookMeta | undefined {
  return bookMetas[bookId];
}

/** 站内可读 = 抓取成功且至少一个章节 */
export function isReadable(bookId: string): boolean {
  const m = bookMetas[bookId];
  return !!m && m.status !== 'failed' && m.chapters.length > 0;
}

/** 章节排序:按 meta.chapters 声明顺序 */
export function chaptersOf(bookId: string): ChapterRef[] {
  return bookMetas[bookId]?.chapters ?? [];
}

export function chapterHref(bookId: string, ch?: ChapterRef): string {
  return ch ? `/read/${bookId}/${ch.slug}` : `/read/${bookId}/`;
}

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
