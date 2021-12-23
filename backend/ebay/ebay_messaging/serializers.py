from rest_framework import serializers
from .models import *
from users.serializers import BasicUserSerializer
from users.models import CustomUser
from ebay_objects.models import Object
from ebay_objects.serializers import ObjectSerializer

class MessageSerializer(serializers.ModelSerializer):

    # sender = UserSerializer()
    # # reciever = UserSerializer()
    # sender = BasicUserSerializer()
    # receiver = BasicUserSerializer()

    class Meta:
        model = Message
        fields = "__all__"
        read_only_fields = ["answered"]

    def to_representation(self, instance, request=None):
        rep = super().to_representation(instance)
    
        sender = CustomUser.objects.get(id=rep["sender"])
        rep['sender'] = BasicUserSerializer().to_representation(sender)

        receiver = CustomUser.objects.get(id=rep["receiver"])
        rep['receiver'] = BasicUserSerializer().to_representation(receiver)

        return rep


class QuestionSerializer(serializers.ModelSerializer):

    # sender = BasicUserSerializer()

    class Meta:
        model = Question
        fields = "__all__"
        read_only_fields = ["answered"]

    def to_representation(self, instance, request=None):
        rep = super().to_representation(instance)
        full_user = CustomUser.objects.get(id=rep["sender"])
        object_ = ObjectSerializer().to_representation(Object.objects.get(id=rep["obj"]))
        rep["obj"] = object_
        request = self.context.get("request")
        rep['obj']["mainImage"] = "http://" + request.get_host() + rep["obj"]["mainImage"]
        rep["sender_username"] = full_user.username

        # if answer:

        # else: rep["answerText"] = ""

        return rep


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = "__all__"


class QuestionAndAnwserOfObjectSerializer(serializers.ModelSerializer):
    """
    Serialize Question and add answer if exist
    """

    class Meta:
        model = Question
        fields = ["id", "questionText", "obj", 
                  "answered", "sender", "receiver"]

    def to_representation(self, instance, request=None):
        rep = super().to_representation(instance)

        try:
            answer = Answer.objects.get(question=instance.id)
            rep ["answerText"] = answer.answerText
        except:
            pass

        # if answer:

        # else: rep["answerText"] = ""

        return rep
