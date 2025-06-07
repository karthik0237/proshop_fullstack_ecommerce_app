from django.contrib import admin

from .models import Product,Order,OrderItem,ShippingAddress,Review

# Register your models here.
admin.site.register([Product, Order, OrderItem, ShippingAddress, Review])
