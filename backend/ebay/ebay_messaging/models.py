from django.db import models
from users.models import CustomUser
from ebay_objects.models import Object

class Message(models.Model):

    title = models.CharField(max_length=50, blank=True)
    text = models.CharField(max_length=2000)

    answered = models.BooleanField(default=0)
    viewed = models.BooleanField(default=0)

    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="message_sender")
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='message_receiver')

    date=models.DateTimeField(auto_now_add=True)

class Question(models.Model):

    questionText = models.CharField(max_length=200)
    answered = models.BooleanField(default=0)
    viewed = models.BooleanField(default=0)

    obj = models.ForeignKey(Object, on_delete=models.CASCADE)

    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="question_sender")
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='question_receiver')

    date = models.DateTimeField(auto_now_add=True)

class Answer(models.Model):

    answerText = models.CharField(max_length=1000)

    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
