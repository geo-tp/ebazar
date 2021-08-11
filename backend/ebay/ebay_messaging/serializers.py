from rest_framework import serializers
from .models import *


class MessageSerializer(serializers.ModelSerializer):

    # sender = UserSerializer()
    # reciever = UserSerializer()

    class Meta:
        model = Message
        fields = "__all__"
        read_only_fields = ["answered"]

class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = "__all__"
        read_only_fields = ["answered"]

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
