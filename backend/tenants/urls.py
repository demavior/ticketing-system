from django.urls import path
from django.http import HttpResponse
from .views import TenantView, UserTenantsView

urlpatterns = [
    path('home/', lambda request: HttpResponse('Welcome to Tenants!')),
    path('', UserTenantsView.as_view(), name='tenants-list'),
    path('current/', TenantView.as_view(), name='current-tenant'),
    
]