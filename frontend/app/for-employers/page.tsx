import Link from "next/link";
import PageHero from "@/components/PageHero";
import { siteImages } from "@/lib/images";

export default function ForEmployersPage() {
  return (
    <>
      <PageHero
        title="Hire help fast"
        description="Post handyman, cleaning, and maid gigs on Travailleso and reach workers ready to start."
        image={siteImages.hiring}
        imageAlt="Homeowner discussing work with a service provider"
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-4">
          {[
            {
              title: "Post a gig in minutes",
              description:
                "Need a cleaner, handyman, or helper? List the job and get applicants quickly.",
            },
            {
              title: "Review applicants",
              description:
                "See who applied, check profiles, and pick the right person for the job.",
            },
            {
              title: "Built for local jobs",
              description:
                "Homes, small businesses, and one-off projects — not enterprise hiring pipelines.",
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

        <div className="mt-12 rounded-3xl bg-green-50 p-8 text-center ring-1 ring-green-100">
          <p className="text-lg font-semibold text-slate-900">Ready to hire?</p>
          <p className="mt-2 text-slate-600">
            Use our mobile app or sign up as an employer to post your first gig.
          </p>
          <Link
            href="/jobs"
            className="mt-6 inline-block rounded-full bg-green-600 px-6 py-3 font-semibold text-white shadow-sm shadow-green-600/20 hover:bg-green-700"
          >
            See example listings
          </Link>
        </div>
      </div>
    </>
  );
}
