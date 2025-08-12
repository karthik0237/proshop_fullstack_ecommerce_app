from django.shortcuts import render, get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from baseapp.models import Product,Order,OrderItem,ShippingAddress
from baseapp.serializers import OrderSerializer,OrderItemSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order_items(request):
    user = request.user
    data = request.data

    order_items = data['orderItems']
    if order_items and len(order_items) == 0:
        return Response({
            'detail': 'No Order Items',
            status:status.HTTP_400_BAD_REQUEST
        })
    else:
        # 1. create order
        # 2. create shipping address
        # 3. create order items and set order to orderitem relationship
        # 4. update count in stock
        order = Order.objects.create(
            user=user,
            paymentMethod = data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country']
        )

        for i in order_items:  # adding cart products into orderitems
            product = Product.objects.get(_id = i['product'])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = i['name'],
                qty = i['qty'],
                price = i['price'],
                image = product.image.url
            )

            product.countInStock -= int(item.qty)
            product.save()

        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request,pk):
     user = request.user
     try:
        order = Order.objects.all(id = pk)
        print(order)
        if user.is_staff or order.user == user:
         serializer = OrderSerializer(order, many=False)
         return Response(serializer.data)
        else:
         Response({
             'detail':'Not Authorized to view this order'},
            status=status.HTTP_401_UNAUTHORIZED)

     except Exception as e:
      return Response({'detail':e},status=status.HTTP_400_BAD_REQUEST)

         

