from django.contrib import admin

from .models import SiteSetup


@admin.register(SiteSetup)
class SiteSetupAdmin(admin.ModelAdmin):
    list_display = ['id', 'site_name', 'site_type', 'domain', 'starting_point', 'owner', 'updated_at']
    list_filter = ['site_type', 'starting_point']
    search_fields = ['site_name', 'domain', 'owner__email', 'owner__phone', 'owner__full_name']
    autocomplete_fields = ['owner']
