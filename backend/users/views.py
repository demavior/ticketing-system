from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import CustomUser, TenantToken, Tenant
from .serializers import UserRegistrationSerializer, UserDetailSerializer, TenantUsersSerializer, UserTenantsSerializer

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = token.user
        tenant = Tenant.objects.get(id=request.data['tenant_id'])
        # Get or create a tenant token
        try:
            token = TenantToken.objects.get(key=token)
            if token.tenant != tenant:
                token.tenant = tenant
                token.save()
        except TenantToken.DoesNotExist:
            token = TenantToken.objects.create(key=token.pk, tenant_id=tenant.id, user_id=token.user, created=token.created)

        return Response({
            'token': token.key,
            'user': user,
            'tenant': tenant
        })
    
class RegistrationView(APIView):
    def post(self, request):
        print(request.tenant)
        request.data['tenants'] = [request.tenant.id]
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(CustomAuthToken):
    def post(self, request, *args, **kwargs):
        try:
            response = super(LoginView, self).post(request, *args, **kwargs)
            token = Token.objects.get(key=response.data['token'])
            user = token.user
            tenant = Tenant.objects.get(id=request.data['tenant_id'])
            # Verify user tenant
            if tenant not in user.tenants.all():
                return Response({"non_field_errors": ["Unable to login to this tenant"]}, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email,
                'role': user.role,
                'tenant_id': tenant.id,
                'tenant': tenant.name
            })
        except Token.DoesNotExist:
            return Response({"non_field_errors": ["Unable to login with provided tenant"]}, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            # Get the token from the request, and delete it
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, user_id=None):
        if user_id:
            try:
                user = CustomUser.objects.get(id=user_id)
            except CustomUser.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            user = request.user
        serializer = UserDetailSerializer(user)
        return Response(serializer.data)
        
    def patch(self, request, user_id=None):
        if user_id:
            try:
                user = CustomUser.objects.get(id=user_id)
            except CustomUser.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            user = request.user
        serializer = UserDetailSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListView(APIView):
    def get(self, request):
        # Get all users by tenant
        if request.tenant:
            users = CustomUser.objects.filter(tenants=request.tenant)
            serializer = TenantUsersSerializer(users, many=True)
            return Response(serializer.data)
        # Get all users
        users = CustomUser.objects.all()
        serializer = TenantUsersSerializer(users, many=True)
        return Response(serializer.data)
    
class UserTenantsView(APIView):
    def get(self, request, username):
        try:
            # Ge all Tenants by user id
            user = CustomUser.objects.get(username=username)
            tenants = user.tenants.all()
            serializer = UserTenantsSerializer(tenants, many=True)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)