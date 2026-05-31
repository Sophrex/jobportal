const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Job {
  id: number;
  title: string;
  description: string;
  company_name: string;
  location: string;
  employment_type: string;
  salary_range: string;
  status: string;
  created_at: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch(`${API_URL}/api/v1/jobs/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data: PaginatedResponse<Job> = await res.json();
  return data.results;
}

export async function fetchJob(id: string): Promise<Job | null> {
  const res = await fetch(`${API_URL}/api/v1/jobs/${id}/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
