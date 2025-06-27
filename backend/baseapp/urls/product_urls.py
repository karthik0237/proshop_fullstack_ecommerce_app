from django.urls import path

from baseapp.views import product_views

urlpatterns = [
    path('', product_views.get_products, name = 'getproducts'),
    path('<str:pk>', product_views.get_product, name = 'getProduct'),
]