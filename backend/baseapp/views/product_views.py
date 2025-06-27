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
