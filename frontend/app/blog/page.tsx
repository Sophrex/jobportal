import Link from "next/link";
import PageHero from "@/components/PageHero";
import { fetchBlogPosts } from "@/lib/wagtail";
import { siteImages } from "@/lib/images";

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <>
      <PageHero
        title="Tips & stories"
        description="Practical advice for service workers — cleaning, handyman work, and local gigs."
        image={siteImages.blog}
        imageAlt="Open notebook with study materials"
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="rounded-3xl bg-white p-8 text-center text-slate-600 ring-1 ring-slate-900/5">
              No blog posts yet. Check back soon!
            </p>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition hover:shadow-md hover:ring-green-200"
              >
                <time className="text-sm font-medium text-slate-500">{post.date}</time>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  <Link href={`/blog/${post.meta.slug}`} className="hover:text-green-700">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 leading-relaxed text-slate-600">{post.intro}</p>
                <Link
                  href={`/blog/${post.meta.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-green-700 hover:text-green-800"
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
