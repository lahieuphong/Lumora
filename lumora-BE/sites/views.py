from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SiteSetup
from .serializers import SiteSetupSerializer


class SiteSetupView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        setup, _ = SiteSetup.objects.get_or_create(owner=request.user)
        return Response(SiteSetupSerializer(setup).data)
