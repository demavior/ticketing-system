from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Tenant
from users.models import CustomUser
from .serializers import TenantSerializer, UserTenantsSerializer

class TenantView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        tenant = Tenant.objects.get(id=request.tenant.id)
        serializer = TenantSerializer(tenant)
        return Response(serializer.data)

    def patch(self, request):
        tenant = Tenant.objects.get(id=request.tenant.id)
        serializer = TenantSerializer(tenant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class UserTenantsView(APIView):
    def get(self, request):
        try:
            # Ge all Tenants by user id
            user = request.user
            tenants = user.tenants.all()
            serializer = UserTenantsSerializer(tenants, many=True)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)