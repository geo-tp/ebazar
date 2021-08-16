from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import filters
import django_filters

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny

from users.models import CustomUser

from ebay_base.functions_utils import checkUserMatching, checkUserIsOwner,\
                             checkSenderIsNotReceiver, restrictedEndPoint, checkUserIsReceiver


class BidViewSet(viewsets.ModelViewSet):

    http_method_names = ["get", "post"]
    
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, 
                       filters.OrderingFilter]
    ordering_fields = ['price']
    filterset_fields = ["obj"]


    permission_classes = [AllowAny]

    # @restrictedEndPoint
    # def list(self, request, *args, **kwargs):
    #     pass

    @checkUserMatching
    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_bid = float(request.data["price"])
        bid_user = request.data["user"]
        obj_id = int(request.data["obj"])
        obj = Object.objects.get(id=obj_id)

        # if (bid_user != req)

        try:
            maxBid = float(Bid.objects.filter(obj=obj_id).order_by("-price")[0].price)
        except IndexError:
            maxBid = 0

        objIsActive = obj.isActive

        if  not objIsActive:
            error = "Sale is over"

        elif bid_user == obj.user.id:
            error = "You can't bid on your own item"
            
        else:
            if user_bid <= maxBid or user_bid < obj.actualPrice:
                error = "Bid is too low"
            
            else:
                obj.actualPrice = user_bid
                obj.save()
                return super().create(request, *args, **kwargs)

        headers = self.get_success_headers(serializer.data)
        return Response({"detail": error,
                         "actual_price": maxBid}, status=status.HTTP_200_OK)


class TransactionViewsSet(viewsets.ModelViewSet):

    # http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']


    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    
    filter_backends = [filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]

    filterset_fields = ["user", "obj", "obj__user__id"]
    ordering_fields = ["id"]

    permission_classes = [AllowAny]

    # @checkUserMatching
    def create(self, request, *args, **kwargs):

        return super().create(request, *args, **kwargs)

    @method_decorator(cache_page(60))
    def list(self, request):
        return super().list(request)


class OperationViewSet(viewsets.ModelViewSet):

    queryset = Operation.objects.all()
    serializer_class = OperationSerializer

        
    filter_backends = [filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]

    filterset_fields = ["user"]
    ordering_fields = ["id"]

    permission_classes = [AllowAny]

class BalanceViewSet(viewsets.ModelViewSet):

    http_method_names = ["get"]

    queryset = Operation.objects.all()
    serializer_class = BalanceSerializer

    @checkUserIsOwner
    def retrieve(self, request, pk):
        
        return super().retrieve(request, pk)

    @restrictedEndPoint
    def list(self, request):
            pass   

class AccountUserViewSet(viewsets.ModelViewSet):

    http_method_names = ["get"]

    queryset = CustomUser.objects.all()
    serializer_class = AccountUserSerializer

    @checkUserIsOwner
    def retrieve(self, request, pk):
        
        return super().retrieve(request, pk)

    @restrictedEndPoint
    def list(self, request):
            pass   
