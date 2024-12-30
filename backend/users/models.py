from django.db import models
from django.contrib.auth.models import AbstractUser
from tenants.models import Tenant

class CustomUser(AbstractUser):
    CUSER_ROLES = [('admin','Admin'),
                   ('agent','Agent'),
                   ('supervisor','Supervisor'),
                   ('customer','Customer')]
    tenants = models.ManyToManyField(Tenant)
    role = models.CharField(max_length=50, choices=CUSER_ROLES, default='customer')
        
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Add related_name to avoid conflicts
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',  # Add related_name to avoid conflicts
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )