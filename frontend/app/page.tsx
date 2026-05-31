import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Smart Matching",
    description:
      "Our platform connects you with roles that fit your skills, experience, and career goals.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop",
    alt: "Team collaborating around a laptop",
  },
  {
    title: "Trusted Employers",
    description:
      "Work with verified companies committed to transparent hiring and great candidate experiences.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
    alt: "Modern office workspace",
  },
  {
    title: "Career Resources",
    description:
      "Access expert advice on resumes, interviews, and professional growth on our blog.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop",
    alt: "Person studying career materials",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[520px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80&auto=format&fit=crop"
          alt="Professionals collaborating in a modern office"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-lime-950/90 via-lime-900/80 to-lime-800/70" />
        <div className="relative mx-auto flex min-h-[520px] max-w-6xl flex-col justify-center px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-lime-300">
              Your next career move starts here
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find Your Dream Job Today
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-lime-50">
              Connect with top employers, discover opportunities that match your
              skills, and take the next step in your career with confidence.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/jobs"
                className="rounded-lg bg-white px-8 py-3 text-center font-semibold text-lime-800 shadow-lg transition hover:bg-lime-50"
              >
                Browse Jobs
              </Link>
              <Link
                href="/for-employers"
                className="rounded-lg border-2 border-white/40 px-8 py-3 text-center font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4">
          {[
            { value: "10k+", label: "Active jobs" },
            { value: "2,500+", label: "Companies hiring" },
            { value: "50k+", label: "Candidates placed" },
            { value: "98%", label: "Satisfaction rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-lime-700 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-zinc-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-zinc-900">Why JobPortal?</h2>
            <p className="mt-4 text-lg text-zinc-600">
              Everything you need to discover opportunities, stand out to employers,
              and grow your career — in one place.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-48">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-zinc-900">{feature.title}</h3>
                  <p className="mt-2 leading-relaxed text-zinc-600">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Split section */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop"
              alt="Professional team meeting in a bright office"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-zinc-900">
              Built for modern hiring
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">
              Whether you&apos;re searching for your first role or building a team,
              JobPortal streamlines every step — from discovery to application to
              offer.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Curated listings from verified employers",
                "One-tap applications via our mobile app",
                "Expert career content updated weekly",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-100 text-sm font-bold text-lime-700">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/for-job-seekers"
              className="mt-8 inline-block rounded-lg bg-lime-600 px-6 py-3 font-semibold text-white transition hover:bg-lime-700"
            >
              Explore for Job Seekers
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lime-700 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-lime-100">
            Whether you&apos;re hiring or looking for your next role, we&apos;ve got
            you covered.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/for-job-seekers"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-lime-800 transition hover:bg-lime-50"
            >
              I&apos;m a Job Seeker
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border-2 border-white/40 px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
