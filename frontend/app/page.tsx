import Image from "next/image";
import Link from "next/link";
import { siteImages } from "@/lib/images";

const features = [
  {
    title: "Hot Gigs, Fast",
    description:
      "Cleaning, handyman, moving help, and home services — fresh listings posted daily in your area.",
    image: siteImages.cleaning,
    alt: "Person cleaning a home",
  },
  {
    title: "Trusted Local Work",
    description:
      "Connect with homeowners and small businesses who need reliable help — no corporate hoops.",
    image: siteImages.tools,
    alt: "Handyman with tools",
  },
  {
    title: "Work That Fits You",
    description:
      "Part-time, full-time, or side gigs. Maids, cleaners, fixers, and helpers — find what works.",
    image: siteImages.serviceWorker,
    alt: "Service worker with equipment",
  },
];

const cardClass =
  "overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-900/5 transition hover:shadow-md hover:ring-green-200";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-green-100">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50" />
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-800">
              Hot jobs · Real work
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Hands-on jobs near you
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Handyman, cleaning, maid services, and more. Travailleso connects
              people who need help with workers ready to get the job done.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/jobs"
                className="rounded-full bg-green-600 px-8 py-3.5 text-center font-semibold text-white shadow-sm shadow-green-600/25 transition hover:bg-green-700"
              >
                Browse hot jobs
              </Link>
              <Link
                href="/for-employers"
                className="rounded-full border border-green-200 bg-white px-8 py-3.5 text-center font-semibold text-green-800 transition hover:bg-green-50"
              >
                Post a gig
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-green-900/10 ring-1 ring-green-100">
            <Image
              src={siteImages.handyman}
              alt="Handyman at work in a home"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-green-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
          {[
            { value: "5k+", label: "Service gigs" },
            { value: "800+", label: "Local hirers" },
            { value: "12k+", label: "Workers placed" },
            { value: "Same day", label: "Many start fast" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-green-700 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Why Travailleso?</h2>
            <p className="mt-4 text-lg text-slate-600">
              Built for handyman, cleaning, maid, and service work — simple,
              local, and straight to the point.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className={cardClass}>
                <div className="relative h-44">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-green-100 bg-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg shadow-green-900/5 ring-1 ring-green-100">
            <Image
              src={siteImages.kitchen}
              alt="Cleaning professional with supplies"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Jobs people actually need done
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              From deep cleans and regular maid service to repairs and odd jobs —
              Travailleso is where local demand meets ready workers.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Handyman & home repairs",
                "House cleaning & maid service",
                "Moving help & odd jobs",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/for-job-seekers"
              className="mt-8 inline-block rounded-full bg-green-600 px-6 py-3 font-semibold text-white shadow-sm shadow-green-600/20 transition hover:bg-green-700"
            >
              Find work near me
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-green-600 to-emerald-700 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Need help or ready to work?
          </h2>
          <p className="mt-4 text-lg text-green-50">
            Post a gig or pick up a hot job today — it only takes a minute.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/for-job-seekers"
              className="rounded-full bg-white px-6 py-3 font-semibold text-green-800 transition hover:bg-green-50"
            >
              I want to work
            </Link>
            <Link
              href="/for-employers"
              className="rounded-full border-2 border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              I need to hire
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
