import django_filters
from .models import Object
from .serializers import ObjectSerializer
from rest_framework import generics

class ObjectFilter(django_filters.FilterSet):

    class Meta:
        model = Object
        fields = ['endingDate', 'shippingPrice', 'user']