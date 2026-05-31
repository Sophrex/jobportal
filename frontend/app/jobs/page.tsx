import Link from "next/link";
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
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold">Open Positions</h1>
      <p className="mt-4 text-lg text-zinc-600">
        Browse current job openings from top employers.
      </p>

      <div className="mt-12 space-y-6">
        {jobs.length === 0 ? (
          <p className="text-zinc-500">No jobs available at the moment.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-zinc-200 p-6 hover:border-indigo-200"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="text-zinc-600">{job.company_name}</p>
                </div>
                {job.salary_range && (
                  <span className="text-sm font-medium text-indigo-600">
                    {job.salary_range}
                  </span>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-500">
                <span>{job.location}</span>
                <span>&middot;</span>
                <span>{employmentLabels[job.employment_type] || job.employment_type}</span>
              </div>
              <p className="mt-4 line-clamp-3 text-zinc-600">{job.description}</p>
            </div>
          ))
        )}
      </div>

      <p className="mt-12 text-center text-sm text-zinc-500">
        Want to apply?{" "}
        <Link href="/for-job-seekers" className="text-indigo-600 hover:underline">
          Download our mobile app
        </Link>{" "}
        to submit applications.
      </p>
    </div>
  );
}
