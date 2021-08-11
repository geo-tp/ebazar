from rest_framework import serializers
from .models import *

from ebay_objects.models import Object
from users.models import CustomUser
from ebay_account.models import Bid
from ebay_base.models import Category, SubCategory
from ebay_base.serializers import CategorySerializer, SubCategorySerializer
from ebay_objects.models import FollowedObject, StateOfObject

from ebay_base.functions_utils import isOwner

class StateOfObjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = StateOfObject
        fields = "__all__"

class ImageSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Image
        fields = "__all__"


class ObjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Object
        fields = ["id", "title", "actualPrice",
                  "durationInDays", "shippingPrice",
                  "returnPolicy", "mainImage", "category", "subcategory",
                  "user", "creationDate", "endingDate", "isActive", "isSelled" ]
        # endingDate= serializers.SerializerMethodField(required=False)

        read_only_fields = ['creationDate']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        # rep['category'] = instance.category.title
        # rep["subcategory"] = instance.subcategory.title
        # rep["state"] = instance.state.title
        # rep["user"] = instance.user.username
        request = self.context.get("request")

        if rep['returnPolicy']:
            rep["returnPolicy"] = "1"
        else:
            rep["returnPolicy"] = "0"

        return rep

class FollowedObjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = FollowedObject
        fields = "__all__"
        
class PurchasedObjectSerializer(serializers.ModelSerializer):

    # user = BasicUserSerializer()
    # obj = ObjectSerializer(read_only=True)

    class Meta:
        model = PurchasedObject
        fields = ["id", "isPaid", "isComplete", "isCancelled", "isShipped",
                  "shippingCompany", "shippingNumber", "user", "obj"]
                  
    def to_representation(self, instance):

        rep = super().to_representation(instance)
        rep["user"] = ExpeditionUserSerializer().to_representation(User.objects.get(id=int(rep["user"])))
        rep["obj"] = ObjectSerializer().to_representation(Object.objects.get(id=int(rep['obj'])))
        rep["obj"]["user"] = BasicUserSerializer().to_representation(User.objects.get(id=int(rep["obj"]["user"])))

        request = self.context.get("request")
        rep['obj']["mainImage"] = "http://" + request.get_host() + rep["obj"]["mainImage"]

        return rep

class BiddedObjectByUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = "__all__"

    def get_url_of_host(self, request):
        return request.scheme+"://"+request.get_host()

    def get_bidded_objects(self, instance, request):

        url = self.get_url_of_host(request)

        try:
            bids = Bid.objects.filter(user=instance)
        except:
            bids = []

        bidded_object = []
        for bid in bids:
            if ObjectSerializer().to_representation(bid.obj) not in bidded_object:
                serialized_obj = ObjectSerializer().to_representation(bid.obj)
                serialized_obj["mainImage"] = url+serialized_obj["mainImage"]

                if serialized_obj not in bidded_object:
                    bidded_object.append(serialized_obj)

        return bidded_object

    def to_representation(self, instance, request=None):

        objects = self.get_bidded_objects(request, instance)

        return objects

class FollowedObjectsByUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = "__all__"

    def _get_url_of_host(self, request):
        
        return request.scheme+"://"+request.get_host()

    def _get_followed_objects(self, request, pk):

        url = self._get_url_of_host(request)

        try:
            followed_objects = FollowedObject.objects.filter(user=pk)
        except:
            followed_objects = None

        objects = []
        for followed_object in followed_objects:
            serialized_obj = ObjectSerializer().to_representation(followed_object.obj)
            serialized_obj["mainImage"] = url+serialized_obj["mainImage"]
            objects.append(serialized_obj)


        return objects

    def to_representation(self, instance, request=None):

        objects = self._get_followed_objects(request, instance)

        return objects

class DetailledObjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Object
        fields = '__all__'

    def images_to_dict(self, request, queryset):

        count = 1
        img = []
        for image in queryset:
            img.append("http://" + request.get_host() + image.imageOfObject.url)
            count +=1
        
        return img
    
    def is_item_followed(self, request_user, obj):

        try:
            request_user = CustomUser.objects.get(username=request_user)
            FollowedObject.objects.get(user=request_user, obj=obj)
            isFollowed = 1
        except:
            isFollowed = 0

        return isFollowed

    
    def to_representation(self, instance):

        request = self.context.get("request")
        obj = instance
    
        mainImage = "http://" + request.get_host() + obj.mainImage.url
        state = StateOfObject.objects.get(id=obj.state.id).title
        user = CustomUser.objects.get(email=obj.user.email)
        category = CategorySerializer().to_representation(
            Category.objects.get(id=obj.category.id))
        subcategory = SubCategorySerializer().to_representation(
            SubCategory.objects.get(id=obj.subcategory.id))

        full_details_object = obj.get_fields()

        full_details_object["mainImage"] = mainImage
        full_details_object["state"] = state
        full_details_object["user"] = user.username
        full_details_object["category"] = category
        full_details_object["subcategory"] = subcategory
        full_details_object["isFollowed"] = self.is_item_followed(request.user, obj)
        full_details_object["isOwner"] = isOwner(request, obj)

        return full_details_object
