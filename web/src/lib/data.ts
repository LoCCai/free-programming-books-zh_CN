/**
 * 数据访问层:读取仓库 data/*.json(由 scripts/parse-books.mjs 生成)。
 * 构建时内联,运行时零 IO。
 */
import booksJson from '../../../data/books.json';
import categoriesJson from '../../../data/categories.json';
import nonproJson from '../../../data/non-programming-books.json';
import metaJson from '../../../data/meta.json';

export interface Book {
  id: string;
  title: string;
  url: string;
  description: string;
  categoryPath: string[];
  status: 'ok' | 'deprecated';
  sourceFile: string;
  line: number;
}

export interface Category {
  name: string;
  /** URL 安全 slug(C/C++ → C-C),路由统一使用 */
  slug: string;
  anchor: string;
  bookCount: number;
}

export interface NonProBook extends Book {
  subtitle: string;
}

export interface SiteMeta {
  generatedAt: string;
  sourceCommit: string;
  stats: {
    totalBooks: number;
    totalNonProgramming: number;
    categories: number;
    deprecated: number;
  };
}

export const allBooks = booksJson as Book[];
export const allCategories = categoriesJson as Category[];
export const nonProBooks = nonproJson as NonProBook[];
export const siteMeta = metaJson as unknown as SiteMeta;

export function bookById(id: string): Book | undefined {
  return allBooks.find((b) => b.id === id);
}

export function booksOfCategory(name: string): Book[] {
  return allBooks.filter((b) => b.categoryPath[0] === name);
}

const slugByName = new Map(allCategories.map((c) => [c.name, c.slug]));

/** 分类页路径(统一走 slug,避免分类名中的 / 破坏路由) */
export function categoryPath(name: string): string {
  const slug = slugByName.get(name) ?? encodeURIComponent(name);
  return `/category/${slug}`;
}

/** 分类内按子路径分组的条目:同路径的归一组,保持上游顺序 */
export function groupBooks(books: Book[]): { path: string; books: Book[] }[] {
  const groups = new Map<string, Book[]>();
  for (const b of books) {
    const key = b.categoryPath.join('/');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(b);
  }
  return [...groups.entries()].map(([path, bs]) => ({ path, books: bs }));
}

/** 书籍详情页路径(仅依赖 id) */
export function bookPath(b: { id: string }): string {
  return `/books/${b.id}`;
}

/** 拼接站点 base 路径(GitHub Pages 项目页子路径) */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
