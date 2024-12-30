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