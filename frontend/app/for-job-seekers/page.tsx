import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function ForJobSeekersPage() {
  return (
    <>
      <PageHero
        title="For Job Seekers"
        description="Discover opportunities, apply with confidence, and grow your career with JobPortal."
        image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Professional woman in a business setting"
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-8">
          {[
            {
              title: "Search Thousands of Jobs",
              description:
                "Filter by location, role type, and salary to find positions that match your goals.",
            },
            {
              title: "Apply in One Tap",
              description:
                "Use our mobile app to browse jobs and submit applications on the go.",
            },
            {
              title: "Career Advice",
              description:
                "Read expert tips on resumes, interviews, and professional development on our blog.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-zinc-900">{item.title}</h2>
              <p className="mt-2 leading-relaxed text-zinc-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/jobs"
            className="rounded-lg bg-lime-600 px-6 py-3 text-center font-semibold text-white hover:bg-lime-700"
          >
            Browse Jobs
          </Link>
          <Link
            href="/blog"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-center font-semibold text-zinc-800 hover:bg-zinc-50"
          >
            Read Career Tips
          </Link>
        </div>
      </div>
    </>
  );
}
