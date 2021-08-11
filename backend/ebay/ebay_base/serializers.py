from .models import *
from ebay_objects.models import Image
from rest_framework import serializers


class OfferBannerSerializer(serializers.ModelSerializer):

    class Meta:
        model = OfferBanner
        fields = "__all__"

class DurationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Duration
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"

class SelectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Selection
        fields = "__all__"

class SubCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = SubCategory
        fields = "__all__"

class ImageSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Image
        fields = "__all__"