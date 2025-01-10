from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Ticket, TicketTask, TicketComment, TicketAttachment, Category, TaskType
from .serializers import (TicketSerializer, TicketTaskSerializer, TicketCommentSerializer, TaskTypeSerializer,
                          TicketAttachmentSerializer, CategorySerializer)

class TicketListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tickets = Ticket.objects.filter(tenant=request.tenant)
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data['tenant'] = request.tenant.id
        request.data['created_by'] = request.user.id
        request.data['modified_by'] = request.user.id
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TicketDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            ticket = Ticket.objects.get(pk=pk, tenant=self.request.tenant)
            serializer = TicketSerializer(ticket)
            return Response(serializer.data)
        except Ticket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch (self, request, pk):
        try:
            tickets = Ticket.objects.get(pk=pk)
        except Ticket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TicketSerializer(tickets, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        ticket = self.get_object(pk)
        ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TicketTaskView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, ticket_id=None, pk=None):
        if pk:
            task = TicketTask.objects.get(pk=pk)
            serializer = TicketTaskSerializer(task)
            return Response(serializer.data)
        elif ticket_id:
            tasks = TicketTask.objects.filter(ticket=ticket_id)
            serializer = TicketTaskSerializer(tasks, many=True)
            return Response(serializer.data)
        else:
            return Response(data={"error": "Ticket ID or Category ID is required."},status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, ticket_id):
        request.data['ticket'] = ticket_id
        request.data['created_by'] = request.user.id
        serializer = TicketTaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        try:
            task = TicketTask.objects.get(pk=pk)
        except TicketTask.DoesNotExist:
            return Response(data={"error": "Task not found."},status=status.HTTP_404_NOT_FOUND)
        serializer = TicketTaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            task = TicketTask.objects.get(pk=pk)
        except TicketTask.DoesNotExist:
            return Response(data={"error": "Task not found."},status=status.HTTP_404_NOT_FOUND)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk:
            category = Category.objects.get(pk=pk)
            serializer = CategorySerializer(category)
        else:
            categories = Category.objects.filter(tenant=request.tenant)
            serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data['tenant'] = request.tenant.id
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        category = Category.objects.get(pk=pk)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TaskTypeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if pk:
            task_type = TaskType.objects.get(pk=pk)
            serializer = TaskTypeSerializer(task_type)
        else:
            task_types = TaskType.objects.filter(tenant=request.tenant)
            serializer = TaskTypeSerializer(task_types, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        request.data['tenant'] = request.tenant.id
        serializer = TaskTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        task_type = TaskType.objects.get(pk=pk)
        serializer = TaskTypeSerializer(task_type, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TicketCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, ticket_id=None, pk=None):
        if pk:
            comment = TicketComment.objects.get(pk=pk)
            serializer = TicketCommentSerializer(comment)
            return Response(serializer.data)
        elif ticket_id:
            comments = TicketComment.objects.filter(ticket=ticket_id).order_by('created_at')
            serializer = TicketCommentSerializer(comments, many=True)
            return Response(serializer.data)
        else:
            return Response(data={"error": "Ticket ID or Comment ID is required."},status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, ticket_id):
        request.data['ticket'] = ticket_id
        request.data['created_by'] = request.user.id
        serializer = TicketCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        comment = TicketComment.objects.get(pk=pk)
        serializer = TicketCommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TicketAttachmentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, ticket_id):
        attachments = TicketAttachment.objects.filter(ticket=ticket_id)
        serializer = TicketAttachmentSerializer(attachments, many=True)
        return Response(serializer.data)

    def post(self, request, ticket_id):
        request.data['ticket'] = ticket_id
        serializer = TicketAttachmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)