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

    class Meta:
        model = User
        # we take only few fields from user model to serialize for frontend
        fields = ['id','_id','name','username','isAdmin','email']


    

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self,attrs):
        data = super().validate(attrs)
    # this serializer already serializes access and refreshtokens 
    # add userserializer with token fields to it
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v
            
        return data 


class ProductSerializer(BaseSerializer):

    class Meta:
        model = Product
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

class OrderSerializer(BaseSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self,obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
    
    def get_shippingAddress(self,obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False
        return address
    
    def get_user(self,obj):

        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
    
