from django.shortcuts import render, get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Product
from .serializers import ProductSerializer

# Create your views here.
@api_view(['GET'])
def getProducts(request):
    queryset = Product.objects.all()
    serializer = ProductSerializer(queryset, many = True)

    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = get_object_or_404(Product, _id = pk)
    serializer = ProductSerializer(product, many = False)

    return Response(serializer.data)

