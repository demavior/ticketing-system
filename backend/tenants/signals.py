from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Tenant
from tickets.models import Category, DEFAULT_CATEGORIES, TaskType, DEFAULT_TASK_TYPES

@receiver(post_save, sender=Tenant)
def create_default_categories(sender, instance, created, **kwargs):
    if created:
        for category_name in DEFAULT_CATEGORIES:
            Category.objects.create(tenant=instance, 
                                    name=category_name, 
                                    description=category_name, 
                                    created_by=instance.created_by)

@receiver(post_save, sender=Tenant)
def create_default_task_types(sender, instance, created, **kwargs):
    if created:
        for task_type_name in DEFAULT_TASK_TYPES:
            TaskType.objects.create(tenant=instance, 
                                    name=task_type_name, 
                                    created_by=instance.created_by)