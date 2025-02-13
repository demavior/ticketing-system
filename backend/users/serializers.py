from rest_framework import serializers
from users.models import CustomUser
from tenants.models import Tenant

class UserRegistrationSerializer(serializers.ModelSerializer):
    tenants = serializers.PrimaryKeyRelatedField(queryset=Tenant.objects.all(), many=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'email', 'tenants', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        tenants = validated_data.pop('tenants')
        user = CustomUser.objects.create_user(**validated_data)
        user.tenants.set(tenants)
        return user
    
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']

class TenantUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']

class UserTenantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = ['id', 'name']