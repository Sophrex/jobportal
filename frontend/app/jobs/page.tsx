import Link from "next/link";
import PageHero from "@/components/PageHero";
import { fetchJobs } from "@/lib/api";
import { siteImages } from "@/lib/images";

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
        title="Hot jobs near you"
        description="Handyman, cleaning, maid work, and local service gigs — updated daily."
        image={siteImages.handyman}
        imageAlt="Worker ready for a service job"
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <p className="rounded-3xl bg-white p-8 text-center text-slate-600 ring-1 ring-slate-900/5">
              No jobs available at the moment.
            </p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition hover:shadow-md hover:ring-green-200"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{job.title}</h2>
                    <p className="text-slate-600">{job.company_name}</p>
                  </div>
                  {job.salary_range && (
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                      {job.salary_range}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
                  <span>{job.location}</span>
                  <span>&middot;</span>
                  <span>{employmentLabels[job.employment_type] || job.employment_type}</span>
                </div>
                <p className="mt-4 line-clamp-3 leading-relaxed text-slate-600">
                  {job.description}
                </p>
              </div>
            ))
          )}
        </div>

        <p className="mt-12 text-center text-sm text-slate-600">
          Want to apply?{" "}
          <Link href="/for-job-seekers" className="font-semibold text-green-700 hover:underline">
            Get the Travailleso app
          </Link>{" "}
          to submit applications.
        </p>
      </div>
    </>
  );
}
