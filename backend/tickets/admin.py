from django.contrib import admin
from .models import Ticket, TicketComment, TicketTask, TicketAttachment, TicketStatusChange
from .models import Category, TaskType
from .models import TicketTaskAttachment, TicketTaskComment

admin.site.register(Ticket)
admin.site.register(TicketComment)
admin.site.register(TicketAttachment)

admin.site.register(Category)
admin.site.register(TaskType)

admin.site.register(TicketTask)
admin.site.register(TicketStatusChange)
admin.site.register(TicketTaskAttachment)
admin.site.register(TicketTaskComment)