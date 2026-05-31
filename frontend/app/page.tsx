import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find Your Dream Job Today
          </h1>
          <p className="mt-6 text-lg text-indigo-100">
            Connect with top employers, discover opportunities that match your skills,
            and take the next step in your career.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/jobs"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 hover:bg-indigo-50"
            >
              Browse Jobs
            </Link>
            <Link
              href="/for-employers"
              className="rounded-lg border border-white/30 px-8 py-3 font-semibold hover:bg-white/10"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold">Why JobPortal?</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "Smart Matching",
              description: "Our platform connects you with roles that fit your skills and goals.",
            },
            {
              title: "Trusted Employers",
              description: "Work with verified companies committed to great candidate experiences.",
            },
            {
              title: "Career Resources",
              description: "Access expert advice and tips on our blog to accelerate your growth.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-zinc-200 p-6 text-center"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-zinc-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold">Ready to get started?</h2>
          <p className="mt-4 text-zinc-600">
            Whether you&apos;re hiring or looking for your next role, we&apos;ve got you covered.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/for-job-seekers"
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              I&apos;m a Job Seeker
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-zinc-300 px-6 py-3 font-semibold hover:bg-white"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
