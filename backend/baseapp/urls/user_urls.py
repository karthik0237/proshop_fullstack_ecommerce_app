from django.urls import path

from baseapp.views import user_views

urlpatterns = [
    path('register/', user_views.register_user, name='register_user'),
    path('', user_views.get_users, name='get_user'),
    path('delete/<str:pk>/', user_views.delete_user, name='delete_user'),
    path('profile/', user_views.get_user_profile, name = 'user_profile'),
    path('profile/update/', user_views.update_user_profile, name = 'userprofileupdate'),
    path('login/',user_views.MyTokenObtainPairView.as_view(), name='login_user'),
    path('update/<str:pk>/', user_views.update_user, name='update_user_by_admin'),
    path('<str:pk>/', user_views.get_user_by_id, name='get_user_by_id'),
]