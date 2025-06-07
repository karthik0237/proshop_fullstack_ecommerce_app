from rest_framework import serializers
from .models import BaseModel, Product, Order, Review, OrderItem, ShippingAddress



class BaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = BaseModel
        fields = ('createdAt', 'updatedAt', 'isActive')
        read_only_fields = ('createdAt', 'updatedAt', 'isActive')


class ProductSerializer(BaseSerializer):

    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(BaseSerializer):

    class Meta:
        model = Order
        fields = '__all__'

class OrderItemSerializer(BaseSerializer):

    class Meta:
        model = OrderItem
        fields = '__all__'

class ReviewSerializer(BaseSerializer):

    class Meta:
        model = Review
        fields = '__all__'


class ShippingAddressSerializer(BaseSerializer):

    class Meta:
        model = ShippingAddress
        fields = '__all__'