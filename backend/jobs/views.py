from rest_framework import permissions, viewsets

from accounts.models import User
from accounts.serializers import AdminUserSerializer, UserSerializer
from .models import Application, Job
from .permissions import IsEmployer, IsJobSeeker, IsStaffUser
from .serializers import ApplicationSerializer, JobSerializer


class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    queryset = Job.objects.select_related("posted_by").all()

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            return [permissions.AllowAny()]
        if self.action in ("create", "update", "partial_update", "destroy"):
            if self.request.user.is_authenticated and self.request.user.is_staff:
                return [IsStaffUser()]
            return [IsEmployer()]
        return super().get_permissions()

    def get_queryset(self):
        qs = super().get_queryset()
        if self.action in ("list", "retrieve"):
            if not (self.request.user.is_authenticated and self.request.user.is_staff):
                if self.request.user.is_authenticated and self.request.user.is_employer:
                    return qs.filter(posted_by=self.request.user) | qs.filter(
                        status=Job.Status.PUBLISHED
                    ).distinct()
                return qs.filter(status=Job.Status.PUBLISHED)
        if self.request.user.is_authenticated and self.request.user.is_employer:
            if not self.request.user.is_staff:
                return qs.filter(posted_by=self.request.user)
        return qs

    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user)


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    queryset = Application.objects.select_related("job", "applicant").all()

    def get_permissions(self):
        if self.action == "create":
            return [IsJobSeeker()]
        if self.action in ("list", "retrieve", "update", "partial_update", "destroy"):
            if self.request.user.is_authenticated and self.request.user.is_staff:
                return [IsStaffUser()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        if user.is_staff:
            return qs
        if user.is_employer:
            return qs.filter(job__posted_by=user)
        return qs.filter(applicant=user)

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = AdminUserSerializer
    queryset = User.objects.all()
    permission_classes = [IsStaffUser]
    http_method_names = ["get", "head", "options", "patch", "put"]
