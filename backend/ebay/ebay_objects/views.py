from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import filters
import django_filters

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from .models import *
from .serializers import *
from ebay_objects.serializers import PurchasedObjectSerializer
from users.models import CustomUser
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import permissions

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page


from ebay_base.functions_utils import checkUserMatching, checkUserIsOwner,\
                             checkSenderIsNotReceiver, restrictedEndPoint, checkUserIsReceiver

import datetime
from rest_framework import status

class StateOfObjectViewSet(viewsets.ModelViewSet):

    http_method_names = ["get", "post"]

    queryset = StateOfObject.objects.all()
    serializer_class = StateOfObjectSerializer

    pagination_class = None


    permission_classes = [permissions.AllowAny]

    @method_decorator(cache_page(600))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


    @method_decorator(cache_page(6000))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

class ImageViewSet(viewsets.ModelViewSet):

    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["obj"]

    pagination_class = None


    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):

        request.data["obj"] = "http://{}/object/{}/".format(request.get_host(), request.data["obj"])

        return super().create(request, *args, **kwargs)

class ObjectViewSet(viewsets.ModelViewSet):

    queryset = Object.objects.all()
    serializer_class = ObjectSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ['title', 'description']
    ordering_fields = ["endingDate", "actual_price", "shippingPrice"]
    filterset_fields = ["shippingPrice", 'title', 'user', "state", "category", "subcategory", "isActive"]

    permission_classes = [AllowAny]

    @method_decorator(cache_page(60))
    def list(self, request, *args, **kwargs):

        return super().list(request, *args, **kwargs)

    def get_serializer(self, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """

        serializer_class = self.get_serializer_class()
        # if self.action != "create":
        #     serializer_class.Meta.fields.append("endingDate")

        # else:
        #     if "endingDate" in serializer_class.Meta.fields:
        #         serializer_class.Meta.fields.remove("endingDate")


        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    # def partial_update(self, request, pk):
# 
        # if  request.data['mainImage'] or request.data["mainImage"] is type("str"):
        #     del request.data["mainImage"]

        # super().partial_update(self, request, pk)


    # @checkUserMatching
    def create(self, request, *args, **kwargs):
        
        now = datetime.datetime.now()
        # request.data["creationDate"] = now
        duration_of_bid = datetime.timedelta(days=int(request.data["durationInDays"]))

        # # remember old state
        # _mutable = request.data._mutable

        # # set to mutable
        # request.data._mutable = True

        ending = now+duration_of_bid
        request.data["endingDate"] = ending

        # # set mutable flag back
        # request.data._mutable = _mutable
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



class PurchasedObjectViewsSet(viewsets.ModelViewSet):

    # http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']


    queryset = PurchasedObject.objects.all()
    serializer_class = PurchasedObjectSerializer
    
    filter_backends = [filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]

    filterset_fields = ["user", "obj", "obj__user__id"]
    ordering_fields = ["id"]

    permission_classes = [AllowAny]

    @checkUserMatching
    def create(self, request, *args, **kwargs):

        return super().create(request, *args, **kwargs)

    @method_decorator(cache_page(60))
    def list(self, request):
        return super().list(request)

# class WithdrawalViewSet(viewsets.ModelViewSet):

#     queryset = Withdrawal.objects.all()
#     serializer_class = WithdrawalSerializer

        
#     filter_backends = [filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]

#     filterset_fields = ["user"]
#     ordering_fields = ["id"]

#     permission_classes = [AllowAny]


class FollowedObjectViewSet(viewsets.ModelViewSet):

    http_method_names = ["get", "post", "delete"]

    queryset = FollowedObject.objects.all()
    serializer_class = FollowedObjectSerializer
    
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["user", "obj"]

    permission_classes = [AllowAny]

    @checkUserMatching
    def create(self, request, *args, **kwargs):

        return super().create(request, *args, **kwargs)


class FollowedObjectByUserViewSet(viewsets.ModelViewSet):

    http_method_names = ["get"]

    queryset = CustomUser.objects.all()
    serializer_class = FollowedObjectsByUserSerializer

    @method_decorator(cache_page(60))
    def retrieve(self, request, pk):
        
        rep = self.serializer_class().to_representation(pk, request)
        page = self.paginate_queryset(rep)

        if page is not None:
            return self.get_paginated_response(rep)

        return Response(rep, status=status.HTTP_200_OK)

    @restrictedEndPoint
    def list(self, request):
        pass

class BiddedObjectByUserViewSet(viewsets.ModelViewSet):

    http_method_names = ["get"]
    queryset = CustomUser.objects.all()
    serializer_class = BiddedObjectByUserSerializer

    @method_decorator(cache_page(60))
    def retrieve(self, request, pk):
        rep = self.serializer_class().to_representation(request, pk)
        page = self.paginate_queryset(rep)

        if page is not None:
            return self.get_paginated_response(rep)

        return Response(rep, status=status.HTTP_200_OK)

    @restrictedEndPoint
    def list(self, request):
        pass

class DetailledObjectViewSet(viewsets.ModelViewSet):

    http_method_names = ["get"]

    queryset = Object.objects.all()
    serializer_class = DetailledObjectSerializer

