from django.urls import path
from .views import RegistrationView, LoginView, LogoutView, UserDetailView, UserListView

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('detail/', UserDetailView.as_view(), name='user-detail'),
    path('detail/<int:user_id>/', UserDetailView.as_view(), name='user-detail'),
    path('list/', UserListView.as_view(), name='user-list'),
]