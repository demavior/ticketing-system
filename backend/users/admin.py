from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from rest_framework.authtoken.admin import TokenAdmin
from .models import CustomUser, TenantToken

class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Tenant info', {'fields': ('tenants', 'role')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'tenants', 'role'),
        }),
    )
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('username',)

class CustomTokenAdmin(TokenAdmin):
    list_display = ('key', 'user', 'created', 'tenant')

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(TenantToken, CustomTokenAdmin)