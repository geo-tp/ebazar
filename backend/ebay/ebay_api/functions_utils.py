from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.http import HttpResponse
from users.models import CustomUser as User
from .models import Object, Question, Message

from rest_framework import status
import datetime

def hidePartOfData(data):

    return data[0:1] + '****' + data[-1:]



def remaningTimeToBid(c_time, e_time):

    """
    Permet d'afficher le temps ecoulé par rapport a une date donnée
    """

    creation_days, creation_time = c_time.split(" ")
    ending_days, ending_time = e_time.split(" ")


    y1, m1, d1 = creation_days.split('-')
    h1, min1, s1 = creation_time.split(':')

    y2, m2, d2 = ending_days.split('-')
    h2, min2, s2 = ending_time.split(':')


    date_creation = datetime.datetime(int(y1), int(m1), int(d1),
                                      int(h1), int(min1), int(s1))

    date_ending = datetime.datetime(int(y2), int(m2), int(d2),
                                    int(h2), int(min2), int(s2))

    remaining_time = str(date_ending - date_creation)

    if ',' in remaining_time:
        days, time = remaining_time.split(",")
        time = time[1:]
    else:
        time = remaining_time

    if remaining_time == time:

        hours, minutes, seconds = time.split(":")
        returned_time = "il reste "

        if hours != "0":
            returned_time += "{} heure(s) ".format(hours)

        if minutes != "0":
            returned_time += "{} minutes(s) ".format(minutes)

        if seconds != "0":
            returned_time += "{} seconde(s) ".format(seconds)

        return returned_time

    days = days.replace("days", "jour(s)")
    
    return "Il reste "+ days


def restrictedEndPoint(func):
    """
    Decorateur : Restreint l'acces l'endpoint decoré
    """
    def inner(self, request, *args, **kwargs):

        return Response({"detail": "This endpoint is restricted."}, 
                         status=status.HTTP_401_UNAUTHORIZED)

    return inner


def checkUserIsOwner(func):
    """
    Decorateur pour checker si l'utilisateur qui fait la requete est le meme que le createur de la data
    """
    def inner(self, request, pk, *args, **kwargs):

        if request.user != "Anonymous":
            
            if request.user.id == int(pk):
                return func(self, request, pk, *args, **kwargs)
            
        try:
            token = request.headers["Authorization"]
            token = " ".split(token)[1]

            Token.objects.get(key=token, user_id=pk)

            return func(self, request, pk, *args, **kwargs)

        except:
            return Response({"detail": "Unhauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        

    return inner

def checkSenderIsNotReceiver(func):
    """
    Decorateur Check si le destinataire et l'expediteur d'un message/question n'est pas identique
    """

    def inner(self, request, *args, **kwargs):

        data_type = request.data.get("questionText", False)

        if data_type:

            obj = Object.objects.get(id=request.data["obj"])

            if int(request.data["user"]) == obj.user.id:
                return Response({"detail": "You can't send a question to yourself"})
            
            else:
                return func(self, request, *args, **kwargs)

        else:

            if request.data["sender"] == request.data["receiver"]:
                return Response({"detail": "You can't send a message to yourself"})

            else:
                return func(self, request, *args, **kwargs)

    return inner

def checkUserIsReceiver(endpoint_type):
    """
    Check si une question/message est adressé a l'utilisateur qui fait la requete GET
    """

    def decorator(func):

        def inner(self, request, pk):

            if endpoint_type == "question":
                q = Question.objects.get(id=pk)
                obj = Object.objects.get(id=q.obj.id)
                
                if request.user == obj.user:
                    return func(self, request, pk)

            elif endpoint_type == "message":

                m = Message.objects.get(id=pk)

                if request.user == m.receiver:
                    return func(self, request, pk)

            return Response({"detail": "You're not the receiver"}, 
                    status=status.HTTP_401_UNAUTHORIZED)
        return inner

    return decorator

def checkUserMatching(func):
    """
    Check si 'lutilisateur qui fait la requete est le meme que celui renseigné dans la form
    Check le token ou la session (request.user)
    """
    def inner(self, request, *args, **kwargs):
        
        data_user = ""

        if request.data.get("user", 0):
            data_user = request.data["user"]
        
        elif request.data.get("sender", 0):
            data_user = request.data["sender"]
        
        if (request.user != "AnonymousUser"):
            # try:
                if request.user.id == int(data_user):
                    return func(self, request, *args, **kwargs)
                else:

                    return Response({"detail": "Request User and User mismatching"}, 
                                     status=status.HTTP_401_UNAUTHORIZED)
            # except:
                pass

        try:
            token = request.headers["Authorization"]
            token = token.split(" ")[1]

            Token.objects.get(key=token, user_id=user)
            return func(self, request, *args, **kwargs)
    
        except:
            return Response({"detail": "User and token mismatching"}, 
                                 status=status.HTTP_401_UNAUTHORIZED)

    return inner


def isOwner(request, obj):

    if (request.user != "AnonymousUser"):

        if request.user.id == obj.user.id :
            return 1

    try:
        token = request.headers["Authorization"]
        token = token.split(" ")[1]

        token = Token.objects.get(key=token)

        if token.user_id == obj.user.id:
            return 1
    except:
        pass

    return 0

