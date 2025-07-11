from rest_framework import serializers
from django.contrib.auth.models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import BaseModel, Product, Order, Review, OrderItem, ShippingAddress



class BaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = BaseModel
        fields = ('createdAt', 'updatedAt', 'isActive')
        read_only_fields = ('createdAt', 'updatedAt', 'isActive')


class UserSerializer(serializers.ModelSerializer):

    # custom names for default user model fields
    _id = serializers.SerializerMethodField(read_only = True)
    name = serializers.SerializerMethodField(read_only = True)
    isAdmin = serializers.SerializerMethodField(read_only = True)
    
    class Meta:
        model = User
        fields = ['id','_id', 'username','email','name','isAdmin']

    def get__id(self,obj):
        return obj.id
    
    def get_isAdmin(self,obj):
        return obj.is_staff
        
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name



class UserSerializerWithToken(UserSerializer):

    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','_id','name','username','isAdmin','email','token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self,attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v
            
        return data


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