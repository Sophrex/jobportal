import Link from "next/link";
import PageHero from "@/components/PageHero";
import { siteImages } from "@/lib/images";

export default function ForJobSeekersPage() {
  return (
    <>
      <PageHero
        title="Find hands-on work"
        description="Handyman, cleaning, maid, and service gigs near you — apply fast on Travailleso."
        image={siteImages.tools}
        imageAlt="Worker with tools ready for a job"
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-4">
          {[
            {
              title: "Hot jobs in your area",
              description:
                "Browse cleaning, handyman, moving help, and other service work — updated daily.",
            },
            {
              title: "Apply in one tap",
              description:
                "Use the Travailleso app to grab gigs and submit applications on the go.",
            },
            {
              title: "Real work, fair listings",
              description:
                "No fluff job titles. See what the work is, where it is, and what it pays.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5"
            >
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/jobs"
            className="rounded-full bg-green-600 px-6 py-3 text-center font-semibold text-white shadow-sm shadow-green-600/20 hover:bg-green-700"
          >
            Browse hot jobs
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-green-200 bg-white px-6 py-3 text-center font-semibold text-green-800 hover:bg-green-50"
          >
            Tips for service workers
          </Link>
        </div>
      </div>
    </>
  );
}
