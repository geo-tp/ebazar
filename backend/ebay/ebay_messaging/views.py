from django.shortcuts import render
from rest_framework import pagination
from rest_framework import viewsets
from .models import *
from rest_framework import filters
import django_filters
from .serializers import *
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from rest_framework.response import Response


from ebay_objects.models import StateOfObject

from rest_framework import status

from ebay_base.functions_utils import checkUserMatching, checkUserIsOwner, isOwner,\
                             checkSenderIsNotReceiver, restrictedEndPoint, checkUserIsReceiver

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

        #Marked as viewed when user request for question
        question.viewed = 1
        question.save()

        return super().retrieve(request, pk)
    # @restrictedEndPoint
    # def list(self, request, *args, **kwargs):
    #     pass

class QuestionAndAnswerViewSet(viewsets.ModelViewSet):
    """
        Return nested question and answer
    """

    class CustomPaginate(pagination.PageNumberPagination):
        """
        Customize numbers of results returned by pagination
        """
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
        