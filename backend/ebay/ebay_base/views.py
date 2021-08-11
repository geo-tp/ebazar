from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework import permissions
import django_filters
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator




# Create your views here.
class OfferBannerViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]

    queryset = OfferBanner.objects.all()
    serializer_class = OfferBannerSerializer

    permission_classes = [permissions.AllowAny]

    pagination_class = None


    @method_decorator(cache_page(600))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

class DurationViewSet(viewsets.ModelViewSet):

    http_method_names = ["get", "post"]

    queryset = Duration.objects.all()
    serializer_class = DurationSerializer

    pagination_class = None


    permission_classes = [permissions.AllowAny]

class CategoryViewSet(viewsets.ModelViewSet):

    http_method_names = ["get", "post"]

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["title"]

    pagination_class = None

    permission_classes = [permissions.AllowAny]

    @method_decorator(cache_page(600))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

class SelectionViewSet(viewsets.ModelViewSet):

    http_method_names = ["get", "post"]

    queryset = Selection.objects.all()
    serializer_class = SelectionSerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["title"]

    pagination_class = None

    permission_classes = [permissions.AllowAny]

    @method_decorator(cache_page(600))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

class SubCategoryViewSet(viewsets.ModelViewSet):

    http_method_names = ["get", "post"]

    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["category"]

    pagination_class = None

    permission_classes = [permissions.AllowAny]

    @method_decorator(cache_page(600))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)