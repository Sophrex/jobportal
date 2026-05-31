const WAGTAIL_API_URL =
  process.env.NEXT_PUBLIC_WAGTAIL_API_URL || "http://localhost:8000/api/v2";

export interface WagtailMeta {
  type: string;
  detail_url: string;
  html_url: string;
  slug: string;
  seo_title?: string;
  search_description?: string;
}

export interface BlogPost {
  id: number;
  meta: WagtailMeta;
  title: string;
  date: string;
  intro: string;
  body?: Array<{ type: string; value: string }>;
  seo_title?: string;
  search_description?: string;
}

interface WagtailListResponse {
  meta: { total_count: number };
  items: BlogPost[];
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const params = new URLSearchParams({
    type: "blog.BlogPage",
    fields: "title,date,intro,seo_title,search_description",
  });

  const res = await fetch(`${WAGTAIL_API_URL}/pages/?${params}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return [];
  }

  const data: WagtailListResponse = await res.json();
  return data.items;
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const params = new URLSearchParams({
    type: "blog.BlogPage",
    slug,
    fields: "title,date,intro,body,seo_title,search_description",
  });

  const res = await fetch(`${WAGTAIL_API_URL}/pages/?${params}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null;
  }

  const data: WagtailListResponse = await res.json();
  return data.items[0] ?? null;
}

export function renderStreamFieldBody(
  body?: Array<{ type: string; value: string }>,
): string {
  if (!body?.length) return "";
  return body
    .map((block) => (block.type === "paragraph" ? block.value : ""))
    .join("");
}
