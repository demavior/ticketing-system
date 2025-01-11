from rest_framework import serializers
from .models import Ticket, TicketComment, TicketAttachment, Category, TicketTask, TaskType

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

    requester = serializers.SerializerMethodField()
    user_email = serializers.SerializerMethodField()
    tenant = serializers.SerializerMethodField()
    tenant_phone = serializers.SerializerMethodField()
    priority_name = serializers.SerializerMethodField()
    assigned_to_name = serializers.SerializerMethodField()

    def get_tenant(self, obj):
        return obj.tenant.name if obj.tenant else None
    def get_requester(self, obj):
        return obj.created_by.first_name + ' ' + obj.created_by.last_name if obj.created_by else None
    def get_user_email(self, obj):
        return obj.created_by.email if obj.created_by else None
    def get_tenant_phone(self, obj):
        return obj.tenant.phone_number if obj.tenant else None
    def get_priority_name(self, obj):
        return obj.get_priority_display()
    def get_assigned_to_name(self, obj):
        return obj.assigned_to.first_name + ' ' + obj.assigned_to.last_name if obj.assigned_to else None

class TicketCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketComment
        fields = '__all__'
    
    author = serializers.SerializerMethodField()

    def get_author(self, obj):
        return obj.created_by.first_name + ' ' + obj.created_by.last_name if obj.created_by else None

class TicketAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketAttachment
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TicketTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketTask
        fields = '__all__'
    
    assigned_name = serializers.SerializerMethodField()
    type_name = serializers.SerializerMethodField()

    def get_assigned_name(self, obj):
        return obj.assigned_to.first_name + ' ' + obj.assigned_to.last_name if obj.assigned_to else None
    def get_type_name(self, obj):
        return obj.type.name if obj.type else None
    

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TaskTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskType
        fields = '__all__'