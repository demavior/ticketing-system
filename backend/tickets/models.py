from django.db import models
from users.models import CustomUser
from tenants.models import Tenant

class Ticket(models.Model):
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

class Category(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField()
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='created_categories')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
class TicketComment(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='comments')
    comment = models.TextField()
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='ticket_comments')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.ticket.number} - {self.created_by.username}'
    
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
    
class TicketTask(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='tasks')
    number = models.IntegerField(editable=False)
    task = models.TextField()
    type = models.ForeignKey(TaskType, on_delete=models.RESTRICT, related_name='tasks', null=True, blank=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, related_name='ticket_tasks')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.ticket} - {self.number}'

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