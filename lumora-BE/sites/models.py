from django.conf import settings
from django.db import models


class SiteSetup(models.Model):
    TYPE_WEBSITE = 'Website'
    TYPE_LANDING_PAGE = 'Landing Page'
    TYPE_EVENT_PAGE = 'Event Page'
    TYPE_CHOICES = [
        (TYPE_WEBSITE, 'Website'),
        (TYPE_LANDING_PAGE, 'Landing Page'),
        (TYPE_EVENT_PAGE, 'Event Page'),
    ]

    START_TEMPLATE = 'Template'
    START_AI = 'AI'
    START_BLANK = 'Blank'
    STARTING_POINT_CHOICES = [
        (START_TEMPLATE, 'Template'),
        (START_AI, 'AI'),
        (START_BLANK, 'Blank'),
    ]

    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='site_setup',
    )
    site_name = models.CharField(max_length=160, blank=True, default='Enter site name')
    site_type = models.CharField(max_length=40, choices=TYPE_CHOICES, default=TYPE_WEBSITE)
    domain = models.CharField(max_length=255, blank=True, default='my-site.acme.com')
    starting_point = models.CharField(
        max_length=40,
        choices=STARTING_POINT_CHOICES,
        default=START_TEMPLATE,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site setup'
        verbose_name_plural = 'Site setups'

    def __str__(self):
        return f'{self.site_name or self.domain} — {self.owner}'
