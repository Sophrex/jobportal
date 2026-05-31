from django.db import models
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField
from wagtail.fields import RichTextField, StreamField
from wagtail.models import Page
from wagtail.blocks import RichTextBlock
from wagtailseo.models import SeoMixin


class BlogIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
    ]

    subpage_types = ["blog.BlogPage"]
    max_count = 1


class BlogPage(SeoMixin, Page):
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    body = StreamField(
        [
            ("paragraph", RichTextBlock()),
        ],
        use_json_field=True,
    )

    content_panels = Page.content_panels + [
        FieldPanel("date"),
        FieldPanel("intro"),
        FieldPanel("body"),
    ]

    parent_page_types = ["blog.BlogIndexPage"]

    api_fields = [
        APIField("date"),
        APIField("intro"),
        APIField("body"),
        APIField("seo_title"),
        APIField("search_description"),
        APIField("og_image"),
    ]
