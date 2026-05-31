import Link from "next/link";
import PageHero from "@/components/PageHero";
import { fetchJobs } from "@/lib/api";

const employmentLabels: Record<string, string> = {
  full_time: "Full Time",
  part_time: "Part Time",
  contract: "Contract",
  internship: "Internship",
  remote: "Remote",
};

export default async function JobsPage() {
  const jobs = await fetchJobs();

  return (
    <>
      <PageHero
        title="Open Positions"
        description="Browse current job openings from top employers across industries."
        image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Person working on a laptop"
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-6">
          {jobs.length === 0 ? (
            <p className="text-zinc-600">No jobs available at the moment.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-lime-300 hover:shadow-md"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-900">{job.title}</h2>
                    <p className="text-zinc-600">{job.company_name}</p>
                  </div>
                  {job.salary_range && (
                    <span className="text-sm font-semibold text-lime-700">
                      {job.salary_range}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-500">
                  <span>{job.location}</span>
                  <span>&middot;</span>
                  <span>{employmentLabels[job.employment_type] || job.employment_type}</span>
                </div>
                <p className="mt-4 line-clamp-3 leading-relaxed text-zinc-600">
                  {job.description}
                </p>
              </div>
            ))
          )}
        </div>

        <p className="mt-12 text-center text-sm text-zinc-600">
          Want to apply?{" "}
          <Link href="/for-job-seekers" className="font-medium text-lime-700 hover:underline">
            Download our mobile app
          </Link>{" "}
          to submit applications.
        </p>
      </div>
    </>
  );
}
