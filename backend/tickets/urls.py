from django.urls import path
from django.http import HttpResponse
from .views import (TicketDetailView, TicketListView, CategoryView, TicketTaskView, TicketCommentView, 
                    TicketAttachmentView,TaskTypeView)

urlpatterns = [
    path('home/', lambda request: HttpResponse('Welcome to Tickets!')),
    path('', TicketListView.as_view(), name='ticket'),
    path('<int:pk>/', TicketDetailView.as_view(), name='ticket-detail'),
    path('<int:ticket_id>/tasks/', TicketTaskView.as_view(), name='ticket-task'),
    path('tasks/<int:pk>/', TicketTaskView.as_view(), name='ticket-task-detail'),
    path('categories/', CategoryView.as_view(), name='category'),
    # path('categories/<int:pk>/', CategoryView.as_view(), name='category-detail'),
    path('<int:ticket_id>/comments/', TicketCommentView.as_view(), name='ticket-comment'),
    path('comments/<int:pk>/', TicketCommentView.as_view(), name='ticket-comment-detail'),
    path('<int:ticket_id>/attachments/', TicketAttachmentView.as_view(), name='ticket-attachment'),
    path('attachments/<int:pk>/', TicketAttachmentView.as_view(), name='ticket-attachment-detail'),
    path('task-types/', TaskTypeView.as_view(), name='task-type'),
]