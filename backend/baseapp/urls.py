from django.urls import path

from . import views

urlpatterns = [
    path('products/', views.getProducts, name = 'getproducts'),
    path('products/<str:pk>', views.getProduct, name = 'getProduct'),
]