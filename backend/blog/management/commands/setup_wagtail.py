from django.core.management.base import BaseCommand
from wagtail.models import Page, Site

from blog.models import BlogIndexPage, BlogPage


class Command(BaseCommand):
    help = "Set up Wagtail site and blog index page"

    def handle(self, *args, **options):
        root = Page.get_first_root_node()

        if not Site.objects.filter(is_default_site=True).exists():
            Site.objects.create(
                hostname="localhost",
                port=8000,
                root_page=root,
                is_default_site=True,
                site_name="Job Portal",
            )
            self.stdout.write("Created default Wagtail site")
        else:
            site = Site.objects.get(is_default_site=True)
            if site.root_page_id != root.id:
                site.root_page = root
                site.save()
                self.stdout.write("Updated site root to include all pages")

        if not BlogIndexPage.objects.exists():
            blog_index = BlogIndexPage(
                title="Blog",
                slug="blog",
                intro="<p>Career tips, industry news, and job search advice.</p>",
            )
            root.add_child(instance=blog_index)
            blog_index.save_revision().publish()
            self.stdout.write("Created blog index page")

            sample_posts = [
                {
                    "title": "How to Write a Standout Resume",
                    "slug": "how-to-write-a-standout-resume",
                    "intro": "Tips for crafting a resume that gets noticed by recruiters.",
                    "body": "<p>Your resume is often the first impression you make...</p>",
                },
                {
                    "title": "Ace Your Next Job Interview",
                    "slug": "ace-your-next-job-interview",
                    "intro": "Prepare confidently with these proven interview strategies.",
                    "body": "<p>Interview preparation is key to landing your dream job...</p>",
                },
            ]

            from datetime import date

            for post_data in sample_posts:
                post = BlogPage(
                    title=post_data["title"],
                    slug=post_data["slug"],
                    date=date.today(),
                    intro=post_data["intro"],
                    body=[("paragraph", post_data["body"])],
                    seo_title=post_data["title"],
                    search_description=post_data["intro"],
                )
                blog_index.add_child(instance=post)
                post.save_revision().publish()
                self.stdout.write(f"Created blog post: {post.title}")

        self.stdout.write(self.style.SUCCESS("Wagtail blog setup complete."))
