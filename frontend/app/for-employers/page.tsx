import Link from "next/link";

export default function ForEmployersPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold">For Employers</h1>
      <p className="mt-4 text-lg text-zinc-600">
        Reach qualified candidates and streamline your hiring process with JobPortal.
      </p>

      <div className="mt-12 space-y-8">
        {[
          {
            title: "Post Jobs in Minutes",
            description: "Create compelling job listings and publish them to our active candidate network.",
          },
          {
            title: "Manage Applications",
            description: "Review applications, track candidates, and collaborate with your hiring team.",
          },
          {
            title: "Build Your Brand",
            description: "Showcase your company culture and attract top talent to your organization.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-zinc-200 p-6">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-zinc-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl bg-indigo-50 p-8 text-center">
        <p className="text-lg font-medium">Ready to hire?</p>
        <p className="mt-2 text-zinc-600">
          Download our mobile app or contact us to get started with an employer account.
        </p>
        <Link
          href="/jobs"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          View Open Roles
        </Link>
      </div>
    </div>
  );
}
