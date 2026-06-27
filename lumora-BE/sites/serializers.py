from rest_framework import serializers

from .models import SiteSetup


def owner_initials(user):
    source = (user.full_name or user.username or user.email or user.phone or 'U').strip()
    parts = source.split()
    if len(parts) >= 2:
        return ''.join(part[0] for part in parts[:2]).upper()
    return source[:2].upper()


class SiteSetupSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField()
    owner_initials = serializers.SerializerMethodField()

    class Meta:
        model = SiteSetup
        fields = [
            'id',
            'site_name',
            'site_type',
            'domain',
            'starting_point',
            'owner_name',
            'owner_initials',
        ]

    def get_owner_name(self, obj):
        owner = obj.owner
        return owner.full_name or owner.username or owner.email or owner.phone or 'User'

    def get_owner_initials(self, obj):
        return owner_initials(obj.owner)
