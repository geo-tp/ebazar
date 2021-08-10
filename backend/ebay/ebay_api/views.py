from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .filters import ObjectFilter
import django_filters
from .serializers import *
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import filters

from .requeteSQL import requete_recherche
from django.http import HttpResponse
from django.http import JsonResponse

from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.permissions import AllowAny, AllowAny, AllowAny
from rest_framework import status

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import pagination

import datetime

from .functions_utils import checkUserMatching, checkUserIsOwner,\
                             checkSenderIsNotReceiver, restrictedEndPoint, checkUserIsReceiver


class OfferBannerViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]

    queryset = OfferBanner.objects.all()
    serializer_class = OfferBannerSerializer

    permission_classes = [permissions.AllowAny]

    pagination_class = None


    @method_decorator(cache_page(600))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

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

    permission_classes = [AllowAny]

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

    permission_classes = [AllowAny]

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

    permission_classes = [AllowAny]

    @method_decorator(cache_page(600))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

class ObjectViewSet(viewsets.ModelViewSet):

    queryset = Object.objects.all()
    serializer_class = ObjectSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ['title', 'description']
    ordering_fields = ["endingDate", "actual_price", "shippingPrice"]
    filterset_fields = ["shippingPrice", 'title', 'user', "state", "category", "subcategory", "isActive"]

    permission_classes = [AllowAny]


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



class MessageViewSet(viewsets.ModelViewSet):

    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["sender", "receiver"]

    permission_classes = [AllowAny]

    @checkUserMatching
    @checkSenderIsNotReceiver
    def create(self, request, *args, **kwargs):

        return super().create(request, *args, **kwargs)

    # @restrictedEndPoint
    # def list(self, request, *args, **kwargs):
    #     pass

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

# class WithdrawalViewSet(viewsets.ModelViewSet):

#     queryset = Withdrawal.objects.all()
#     serializer_class = WithdrawalSerializer

        
#     filter_backends = [filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]

#     filterset_fields = ["user"]
#     ordering_fields = ["id"]

#     permission_classes = [AllowAny]


class OperationViewSet(viewsets.ModelViewSet):

    queryset = Operation.objects.all()
    serializer_class = OperationSerializer

        
    filter_backends = [filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]

    filterset_fields = ["user"]
    ordering_fields = ["id"]

    permission_classes = [AllowAny]


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

    queryset = User.objects.all()
    serializer_class = FollowedObjectsByUserSerializer

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
    queryset = User.objects.all()
    serializer_class = BiddedObjectByUserSerializer

    def retrieve(self, request, pk):
        rep = self.serializer_class().to_representation(request, pk)
        page = self.paginate_queryset(rep)

        if page is not None:
            return self.get_paginated_response(rep)

        return Response(rep, status=status.HTTP_200_OK)

    @restrictedEndPoint
    def list(self, request):
        pass

class QuestionViewSet(viewsets.ModelViewSet):

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["obj", "sender", "receiver"]

    permission_classes = [AllowAny]

    @checkUserMatching
    @checkSenderIsNotReceiver
    def create(self, request, *args, **kwargs):

        return super().create(request, *args, **kwargs)

    # @checkUserIsReceiver("question")
    def retrieve(self, request, pk):
        question = Question.objects.get(id=pk)
        question.viewed = 1
        question.save()

        return super().retrieve(request, pk)
    # @restrictedEndPoint
    # def list(self, request, *args, **kwargs):
    #     pass

class QuestionAndAnswerViewSet(viewsets.ModelViewSet):

    class CustomPaginate(pagination.PageNumberPagination):
        page_size = 3

    # http_method_names = ["get"]

    pagination_class = CustomPaginate

    queryset = Question.objects.all()
    serializer_class = QuestionAndAnwserOfObjectSerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["obj", "answered"]

    permission_classes = [AllowAny]


    # def retrieve(self, request, pk):
    #     questions = Question.objects.filter(obj=pk)
    #     rep = self.question_answer_to_dict(questions)
    #     return Response(data=rep, status=status.HTTP_200_OK)

class AnswerViewSet(viewsets.ModelViewSet):

    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["question"]

    permission_classes = [AllowAny]

    @restrictedEndPoint
    def list(self, request, *args, **kwargs):
        pass

    def create(self, request, *args, **kwargs):

        question_id = request.data["question"]
        question = Question.objects.get(id=question_id)
        obj = question.obj

        if question.answered:
            return Response({"detail": "Question already answered"},
                            status=status.HTTP_401_UNAUTHORIZED)

        if isOwner(request, obj):
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            
            question.answered = 1
            question.save()
                        
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        else:
            return Response({"detail": "You're not owner of this object"},
                            status=status.HTTP_401_UNAUTHORIZED)
        


    ######## ENDPOINTS SPECIAUX #######

class MessagingViewSet(viewsets.ModelViewSet):

    http_method_names = ["get"]

    queryset = User.objects.all()
    serializer_class = MessagingSerializer

    @checkUserIsOwner
    @method_decorator(cache_page(60))
    def retrieve(self, request, pk, *args, **kwargs):
        return super().retrieve(request, pk, *args, **kwargs)

    @restrictedEndPoint
    def list(self, request, *args, **kwargs):
        pass


class DetailledObjectViewSet(viewsets.ModelViewSet):

    http_method_names = ["get"]

    queryset = Object.objects.all()
    serializer_class = DetailledObjectSerializer



class DetailledUserViewSet(viewsets.ModelViewSet):

    http_method_names = ["get"]

    queryset = User.objects.all()
    serializer_class = DetailledUserSerializer

    # @checkUserIsOwner
    @method_decorator(cache_page(60))
    def retrieve(self, request, pk):
        
        return super().retrieve(request, pk)

    @restrictedEndPoint
    def list(self, request):
            pass    

class AccountUserViewSet(viewsets.ModelViewSet):

    http_method_names = ["get"]

    queryset = User.objects.all()
    serializer_class = AccountUserSerializer

    @checkUserIsOwner
    def retrieve(self, request, pk):
        
        return super().retrieve(request, pk)

    @restrictedEndPoint
    def list(self, request):
            pass   


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