from django import urls
from django.urls import path
from base.views import user_views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('login/', user_views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('profile/', user_views.getUserProfile, name='user-profile'),
    path('', user_views.getUsers, name='users'),
    path('register/', user_views.registerUser, name='register'),
    path('profile/update/', user_views.updateUserProfile,
         name='user-profile-update'),
    path('delete/<str:pk>/', user_views.deleteUser, name='delete-users'),
    path('update/<str:pk>/', user_views.updateUser, name='update-users'),
    path('<str:pk>/', user_views.getUsersById, name='user'),
]
