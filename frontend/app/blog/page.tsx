import Link from "next/link";
import { fetchBlogPosts } from "@/lib/wagtail";

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="mt-4 text-lg text-zinc-600">
        Career tips, industry news, and job search advice.
      </p>

      <div className="mt-12 space-y-8">
        {posts.length === 0 ? (
          <p className="text-zinc-500">No blog posts yet. Check back soon!</p>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-zinc-200 p-6 hover:border-indigo-200"
            >
              <time className="text-sm text-zinc-500">{post.date}</time>
              <h2 className="mt-2 text-xl font-semibold">
                <Link
                  href={`/blog/${post.meta.slug}`}
                  className="hover:text-indigo-600"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-zinc-600">{post.intro}</p>
              <Link
                href={`/blog/${post.meta.slug}`}
                className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Read more &rarr;
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
