from django.urls import path
from django.http import HttpResponse
from .views import RegistrationView, LoginView, LogoutView, UserDetailView, UserListView, UserTenantsView

urlpatterns = [
    path('home/', lambda request: HttpResponse('Welcome to Users!')),
    path('register/', RegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('current/', UserDetailView.as_view(), name='user-detail-current'),
    path('<int:user_id>/', UserDetailView.as_view(), name='user-detail'),
    path('', UserListView.as_view(), name='users-list'),
    path('<str:username>/tenants/', UserTenantsView.as_view(), name='user-tenants'),  
]