from wagtail.api.v2.views import PagesAPIViewSet
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail import hooks

api_router = WagtailAPIRouter("wagtailapi")
api_router.register_endpoint("pages", PagesAPIViewSet)


@hooks.register("construct_page_api_fields")
def add_seo_fields(fields, page):
    if hasattr(page, "seo_title"):
        fields.append("seo_title")
    if hasattr(page, "search_description"):
        fields.append("search_description")
