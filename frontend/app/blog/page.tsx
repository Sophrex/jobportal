import Link from "next/link";
import PageHero from "@/components/PageHero";
import { fetchBlogPosts } from "@/lib/wagtail";

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <>
      <PageHero
        title="Blog"
        description="Career tips, industry news, and job search advice from our team."
        image="https://images.unsplash.com/photo-1456513080920-98a5e279d725?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Open notebook with study materials"
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-zinc-600">No blog posts yet. Check back soon!</p>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-lime-300 hover:shadow-md"
              >
                <time className="text-sm font-medium text-zinc-500">{post.date}</time>
                <h2 className="mt-2 text-xl font-semibold text-zinc-900">
                  <Link href={`/blog/${post.meta.slug}`} className="hover:text-lime-700">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 leading-relaxed text-zinc-600">{post.intro}</p>
                <Link
                  href={`/blog/${post.meta.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-lime-700 hover:text-lime-800"
                >
                  Read more &rarr;
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </>
  );
}
