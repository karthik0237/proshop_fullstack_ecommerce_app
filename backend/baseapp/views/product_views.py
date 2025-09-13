from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator,PageNotAnInteger,EmptyPage

from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from django.contrib.auth.hashers import make_password

from baseapp.models import Product,Review
from baseapp.serializers import ProductSerializer,ReviewSerializer


@api_view(['GET'])
def get_products(request):
    query = request.query_params.get('keyword')
    print('query: ',query)
    if query == None:
        query = ''

    # filtering products based on search query
    products = Product.objects.filter(name__icontains = query) # field lookup using doubleunderscore

    page = request.query_params.get('page')
    paginator = Paginator(products,2)
    
    try:
        products = paginator.page(page)
    except PageNotAnInteger:            # for any undefined or invalid pagenumber return firstpage
        products = paginator.page(1)
    except EmptyPage:                    # if page number is greater than last page
        products = paginator.page(paginator.num_pages)

    if page == None:
        page=1
    page = int(page)

    serializer = ProductSerializer(products, many = True)
    return Response({
            'products':serializer.data,
            'page':page,
            'totalPages':paginator.num_pages
            })


@api_view(['GET'])
def get_product(request, pk):
    product = get_object_or_404(Product, _id = pk)
    serializer = ProductSerializer(product, many = False)
    return Response(serializer.data)

@api_view(['GET'])
def get_top_products(request):
    top_products = Product.objects.filter(rating__gte = 4).order_by('-rating')[0:5]
    serializer = ProductSerializer(top_products, many = True)
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
@permission_classes([IsAdminUser])
def upload_image(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was Uploaded')



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product_review(request,pk):
    user = request.user
    data = request.data
    product = Product.objects.get(_id=pk)

    #1- Review Already exists
    # sets true if review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    #2- No Rating or 0
    elif data['rating'] == 0:
        content = {'detail':'Please select a rating'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)

    #3- Create Review
    else:
        review = Review.objects.create(
            user = user,
            product = product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment']
        )
        # get all reviews of a product
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total/len(reviews)
        product.save()
        return Response('Review Added')

