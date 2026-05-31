from django.core.management.base import BaseCommand

from accounts.models import User
from jobs.models import Job


class Command(BaseCommand):
    help = "Seed sample jobs for development"

    def handle(self, *args, **options):
        employer, created = User.objects.get_or_create(
            username="demo_employer",
            defaults={
                "email": "employer@example.com",
                "role": User.Role.EMPLOYER,
                "company_name": "Acme Corp",
            },
        )
        if created:
            employer.set_password("password123")
            employer.save()
            self.stdout.write("Created demo employer (demo_employer / password123)")

        sample_jobs = [
            {
                "title": "Senior Software Engineer",
                "description": "Build scalable backend systems with Django and PostgreSQL.",
                "company_name": "Acme Corp",
                "location": "San Francisco, CA",
                "employment_type": Job.EmploymentType.FULL_TIME,
                "salary_range": "$140k - $180k",
            },
            {
                "title": "Frontend Developer",
                "description": "Create beautiful user interfaces with React and Next.js.",
                "company_name": "TechStart Inc",
                "location": "Remote",
                "employment_type": Job.EmploymentType.REMOTE,
                "salary_range": "$100k - $130k",
            },
            {
                "title": "Product Designer",
                "description": "Design intuitive experiences for our job portal platform.",
                "company_name": "DesignCo",
                "location": "New York, NY",
                "employment_type": Job.EmploymentType.FULL_TIME,
                "salary_range": "$90k - $120k",
            },
            {
                "title": "DevOps Engineer",
                "description": "Manage cloud infrastructure and CI/CD pipelines.",
                "company_name": "CloudOps Ltd",
                "location": "Austin, TX",
                "employment_type": Job.EmploymentType.CONTRACT,
                "salary_range": "$80/hr",
            },
            {
                "title": "Marketing Intern",
                "description": "Support growth marketing campaigns and content strategy.",
                "company_name": "GrowthHub",
                "location": "Chicago, IL",
                "employment_type": Job.EmploymentType.INTERNSHIP,
                "salary_range": "$25/hr",
            },
        ]

        for job_data in sample_jobs:
            job, created = Job.objects.get_or_create(
                title=job_data["title"],
                posted_by=employer,
                defaults={**job_data, "status": Job.Status.PUBLISHED},
            )
            if created:
                self.stdout.write(f"Created job: {job.title}")

        self.stdout.write(self.style.SUCCESS("Seed data created successfully."))
