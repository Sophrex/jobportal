import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchBlogPost,
  fetchBlogPosts,
  renderStreamFieldBody,
} from "@/lib/wagtail";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((post) => ({ slug: post.meta.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.meta.seo_title || post.seo_title || post.title,
    description: post.meta.search_description || post.search_description || post.intro,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    notFound();
  }

  const bodyHtml = renderStreamFieldBody(post.body);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <time className="text-sm font-medium text-zinc-500">{post.date}</time>
      <h1 className="mt-2 text-4xl font-bold text-zinc-900">{post.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-zinc-600">{post.intro}</p>
      {bodyHtml && (
        <div
          className="prose prose-zinc mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      )}
    </article>
  );
}
