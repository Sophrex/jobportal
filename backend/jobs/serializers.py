from rest_framework import serializers

from accounts.serializers import UserSerializer
from .models import Application, Job


class JobSerializer(serializers.ModelSerializer):
    posted_by = UserSerializer(read_only=True)

    class Meta:
        model = Job
        fields = (
            "id",
            "title",
            "description",
            "company_name",
            "location",
            "employment_type",
            "salary_range",
            "status",
            "posted_by",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "posted_by", "created_at", "updated_at")


class ApplicationSerializer(serializers.ModelSerializer):
    applicant = UserSerializer(read_only=True)
    job_title = serializers.CharField(source="job.title", read_only=True)

    class Meta:
        model = Application
        fields = (
            "id",
            "job",
            "job_title",
            "applicant",
            "cover_letter",
            "status",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "applicant", "created_at", "updated_at")
