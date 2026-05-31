import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function ForEmployersPage() {
  return (
    <>
      <PageHero
        title="For Employers"
        description="Reach qualified candidates and streamline your hiring process with JobPortal."
        image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Business team reviewing candidates"
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-8">
          {[
            {
              title: "Post Jobs in Minutes",
              description:
                "Create compelling job listings and publish them to our active candidate network.",
            },
            {
              title: "Manage Applications",
              description:
                "Review applications, track candidates, and collaborate with your hiring team.",
            },
            {
              title: "Build Your Brand",
              description:
                "Showcase your company culture and attract top talent to your organization.",
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

        <div className="mt-12 rounded-xl bg-lime-50 p-8 text-center ring-1 ring-lime-200">
          <p className="text-lg font-semibold text-zinc-900">Ready to hire?</p>
          <p className="mt-2 text-zinc-600">
            Download our mobile app or contact us to get started with an employer account.
          </p>
          <Link
            href="/jobs"
            className="mt-6 inline-block rounded-lg bg-lime-600 px-6 py-3 font-semibold text-white hover:bg-lime-700"
          >
            View Open Roles
          </Link>
        </div>
      </div>
    </>
  );
}
