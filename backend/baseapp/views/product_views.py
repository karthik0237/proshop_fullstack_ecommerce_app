from django.shortcuts import render, get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from django.contrib.auth.hashers import make_password

from baseapp.models import Product
from baseapp.serializers import ProductSerializer


@api_view(['GET'])
def get_products(request):
    queryset = Product.objects.all()
    serializer = ProductSerializer(queryset, many = True)

    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, pk):
    product = get_object_or_404(Product, _id = pk)
    serializer = ProductSerializer(product, many = False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    user = request.user
    product = Product.objects.create(
        user = user,
        name = 'Sample Name',
        price = 0,
        brand = '',
        category = 'Sample Category',
        description = '',
        countInStock = 0
    )
    serializer = ProductSerializer(product, many = False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, pk):

    data = request.data
    product = get_object_or_404(Product, _id = pk)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.save()

    serializer = ProductSerializer(product, many = False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    product = get_object_or_404(Product, _id = pk)
    product.delete()
    return Response('Product Deleted Successfully')

@api_view(['POST'])
def upload_image(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was Uploaded')