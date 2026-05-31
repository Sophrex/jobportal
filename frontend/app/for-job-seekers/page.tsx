import Link from "next/link";

export default function ForJobSeekersPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold">For Job Seekers</h1>
      <p className="mt-4 text-lg text-zinc-600">
        Discover opportunities, apply with confidence, and grow your career with JobPortal.
      </p>

      <div className="mt-12 space-y-8">
        {[
          {
            title: "Search Thousands of Jobs",
            description: "Filter by location, role type, and salary to find positions that match your goals.",
          },
          {
            title: "Apply in One Tap",
            description: "Use our mobile app to browse jobs and submit applications on the go.",
          },
          {
            title: "Career Advice",
            description: "Read expert tips on resumes, interviews, and professional development on our blog.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-zinc-200 p-6">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-zinc-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/jobs"
          className="rounded-lg bg-indigo-600 px-6 py-3 text-center font-semibold text-white hover:bg-indigo-700"
        >
          Browse Jobs
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-zinc-300 px-6 py-3 text-center font-semibold hover:bg-zinc-50"
        >
          Read Career Tips
        </Link>
      </div>
    </div>
  );
}
