from django.db import models

class Tenant(models.Model):
    name = models.CharField(max_length=50)
    domain = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=255)
    address = models.TextField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('users.CustomUser', on_delete=models.RESTRICT, related_name='created_tenants')
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey('users.CustomUser', on_delete=models.RESTRICT, related_name='updated_tenants', null=True, blank=True)

    def __str__(self):
        return self.name