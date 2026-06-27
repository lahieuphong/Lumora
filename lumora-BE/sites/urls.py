from django.urls import path

from .views import SiteSetupView


urlpatterns = [
    path('setup/', SiteSetupView.as_view(), name='site-setup'),
]
