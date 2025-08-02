from django.urls import path

from baseapp.views import user_views

urlpatterns = [
    path('register/', user_views.register_user, name='register_user'),
    path('', user_views.get_users),
    path('profile/', user_views.get_user_profile, name = 'user_profile'),
    path('profile/update/', user_views.update_user_profile, name = 'userprofileupdate'),
    path('login/',user_views.MyTokenObtainPairView.as_view(), name='login_user'),
]