"""
URL configuration for backend project.

"""
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('baseapp.urls.product_urls')),
    path('api/users/', include('baseapp.urls.user_urls')),
    path('api/orders/', include('baseapp.urls.order_urls')),
    

]

urlpatterns  += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)