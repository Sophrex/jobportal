from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        JOB_SEEKER = "job_seeker", "Job Seeker"
        EMPLOYER = "employer", "Employer"
        STAFF = "staff", "Staff"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.JOB_SEEKER,
    )
    company_name = models.CharField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        if self.role == self.Role.STAFF:
            self.is_staff = True
        super().save(*args, **kwargs)

    @property
    def is_employer(self):
        return self.role == self.Role.EMPLOYER

    @property
    def is_job_seeker(self):
        return self.role == self.Role.JOB_SEEKER
