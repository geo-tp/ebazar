from django.shortcuts import render
from .serializers import UserSerializer
from .models import CustomUser
from rest_framework import viewsets
import django_filters
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):

    http_method_names = ['get', 'post', 'put', 'patch', 'head', 'options']

    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["username", "email"]


    permission_classes = [IsAuthenticatedOrReadOnly]