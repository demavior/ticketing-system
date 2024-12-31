from django.db import models
from users.models import CustomUser
from tenants.models import Tenant
from .mixins import SequenceNumberMixin
from django.core.exceptions import ValidationError

class Ticket(models.Model, SequenceNumberMixin):
    STATUS_CHOICES = [('pending','Pending'),
                      ('started','Started'),
                      ('approved','Approved'),
                      ('progress','In Progress'),
                      ('resolved','Resolved'),
                      ('closed','Closed'),
                      ('cancelled', 'Cancelled'),
                      ('rejected','Rejected')]
    tenant = models.ForeignKey(Tenant, on_delete=models.PROTECT)
    number = models.IntegerField(editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey('Category', on_delete=models.RESTRICT, related_name='tickets', null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='created_tickets')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='updated_tickets', null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    assigned_to = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='assigned_tickets', null=True, blank=True)
    approved_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='approved_tickets', null=True, blank=True)
    
    def __str__(self):
        return str(self.tenant) + " # " + str(self.number)
    
    def save(self, *args, **kwargs):
        if not self.number:
            self.number = self.generate_sequence_number('tenant')
        super().save(*args, **kwargs)

    def clean(self):
        if self.tenant not in self.created_by.tenants.all():
            raise ValidationError("User not allowed to create ticket for this tenant.")
        if self.category and self.category.tenant != self.tenant:
            raise ValidationError("Category not allowed for this tenant.")
        return super().clean()    
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['tenant', 'number']
    

class Category(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='created_categories')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.tenant) + " - " + self.name
    
    class Meta:
        verbose_name_plural = 'categories'
        unique_together = ['tenant', 'name']
        
class TicketComment(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='comments')
    comment = models.TextField()
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='ticket_comments')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.ticket.number} - {self.created_by.username}'
    
    class Meta:
        ordering = ['-created_at']
    
class TicketAttachment(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='attachments')
    attachment = models.FileField(upload_to='attachments/')
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='ticket_attachments')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.ticket.number} - {self.created_by.username}'
    
class TicketStatusChange(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='status_changes')
    status = models.CharField(max_length=20, choices=Ticket.STATUS_CHOICES)
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='ticket_status_changes')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.ticket.number} - {self.status}'
    
class TaskType(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='created_task_types')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
class TicketTask(models.Model, SequenceNumberMixin):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='tasks')
    number = models.IntegerField(editable=False)
    task = models.TextField()
    type = models.ForeignKey(TaskType, on_delete=models.RESTRICT, related_name='tasks', null=True, blank=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='ticket_tasks')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.ticket} - {self.number}'
    
    def save(self, *args, **kwargs):
        if not self.number:
            self.number = self.generate_sequence_number('ticket')
        super().save(*args, **kwargs)

    def clean(self):
        print(self.ticket.tenant)
        print(self.ticket.created_by.tenants.all())
        if self.ticket.tenant not in self.created_by.tenants.all():
            raise ValidationError("User not allowed to create tasks for this tenant.")
        if self.type and self.type.tenant != self.ticket.tenant:
            raise ValidationError("Ticket Type not allowed for this tenant.")
        return super().clean()   
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['ticket', 'number']

class TicketTaskComment(models.Model):
    task = models.ForeignKey(TicketTask, on_delete=models.CASCADE, related_name='comments')
    comment = models.TextField()
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='ticket_task_comments')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.task.ticket.number} - {self.task.number} - {self.created_by.username}'
    
class TicketTaskAttachment(models.Model):
    task = models.ForeignKey(TicketTask, on_delete=models.CASCADE, related_name='attachments')
    attachment = models.FileField(upload_to='attachments/')
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='ticket_task_attachments')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.task.ticket.number} - {self.task.number} - {self.created_by.username}'