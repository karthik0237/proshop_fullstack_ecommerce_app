from django.shortcuts import render, get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from baseapp.models import Product
from baseapp.serializers import ProductSerializer, MyTokenObtainPairSerializer,UserSerializer,UserSerializerWithToken