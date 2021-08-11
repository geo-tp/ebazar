
from .models import *
from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from users.serializers import UserSerializer
from users.serializers import BasicUserSerializer, ExpeditionUserSerializer
from .functions_utils import isOwner
from .glob import GLOBAL
from .functions_utils import hidePartOfData, hidePartOfPaymentMethod
from rest_framework.response import Response
from rest_framework import status
from django.core import serializers as ser

class OfferBannerSerializer(serializers.ModelSerializer):

    class Meta:
        model = OfferBanner
        fields = "__all__"

class StateOfObjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = StateOfObject
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

# class WithdrawalSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Withdrawal
#         fields = "__all__"

class OperationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Operation
        fields = "__all__"

class BalanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Operation
        fields = "__all__"

    def calculate_queryset_amount(self, queryset):

        result = 0
        for query in queryset:
            result += int(query.amount)

        return result

    def calculate_queryset_object_total_price(self, queryset):
        
        result = 0
        for query in queryset:
            result += int(query.obj.actualPrice)

        return result

    def to_representation(self, instance):

        rep = {"waitingConfirmationAmount":0, "payableAmount":0, "paidAmount":0}

        solde_debit_queryset = Operation.objects.filter(user=instance.id, isType__name="Debit")
        solde_withdrawal_queryset = Operation.objects.filter(user=instance.id, isWithdrawal=True)
        solde_credit_queryset = Operation.objects.filter(user=instance.id, isType__name="Credit")
        solde_waiting_confirmation_queryset = PurchasedObject.objects.filter(user=instance.id, isComplete=0, isPaid=1)

        result_debit = self.calculate_queryset_amount(solde_debit_queryset)
        result_credit = self.calculate_queryset_amount(solde_credit_queryset)
        result_withdrawal = self.calculate_queryset_amount(solde_withdrawal_queryset)
        result_waiting_confirmation = self.calculate_queryset_object_total_price(solde_waiting_confirmation_queryset)

        rep['waitingConfirmationAmount'] = result_waiting_confirmation
        rep["payableAmount"] = result_credit - result_debit
        rep["paidAmount"] = result_withdrawal

        return rep


class BidSerializer(serializers.ModelSerializer):

    user = BasicUserSerializer()

    class Meta:
        model = Bid
        fields = ["id", "price", "user"]

    def to_representation(self, instance, request=None):

        rep = super().to_representation(instance)
        rep["user"]["username"] = hidePartOfData(rep["user"]["username"])

        return rep


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

class FollowedObjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = FollowedObject
        fields = "__all__"
        
class BiddedObjectByUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
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
        model = User
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

class MessagingSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', "username"]


    def to_representation(self, instance):

        rep = super().to_representation(instance)

        messages = MessagesAndQuestionsSerializer.get_recieved_messages(instance)
        rep["messages"] = MessagesAndQuestionsSerializer.serialize_received_messages(messages)

        request = self.context.get("request")
        rep["questions"] = MessagesAndQuestionsSerializer.get_questions(request, instance)
        rep["sended_messages"] = MessagesAndQuestionsSerializer.get_sended_messages(instance)

        return rep

class MessagesAndQuestionsSerializer(serializers.ModelSerializer):

    @classmethod
    def get_recieved_messages(self, instance):

        try:
            messages = Message.objects.filter(receiver=instance.id).order_by("-date")
        except:
            messages = None

        return messages

    @classmethod
    def serialize_received_messages(self, messages):

        recieved_messages = []
        for message in messages:
            mess = MessageSerializer().to_representation(message)
            user = User.objects.get(id=message.sender.id)
            mess["sender"] = BasicUserSerializer().to_representation(user)

            recieved_messages.append(mess)

        return recieved_messages

    @classmethod
    def get_sended_messages(self, instance):

        try:
            messages = Message.objects.filter(sender=instance.id).order_by("-date")
        except:
            messages = None

        sended_message = []
        for message in messages:
            mess = MessageSerializer().to_representation(message)
            user = User.objects.get(id=message.receiver.id)
            mess["receiver"] = BasicUserSerializer().to_representation(user)

            sended_message.append(mess)


        return sended_message

    @classmethod
    def get_questions(self, request, instance):

        active_objects = Object.objects.filter(user=instance.id, isActive=1)

        questions_set = []
        count = 0
        end = 0
        for active_object in active_objects:
            questions = Question.objects.filter(obj=active_object, answered=False).order_by('-date')

            for question in questions:

                q = QuestionSerializer().to_representation(question)
                user = User.objects.get(id=question.user.id)
                q['obj'] = {'id': active_object.id, 
                            'title': active_object.title, 
                            "mainImage": "http://" + request.get_host() + active_object.mainImage.url,
                            }
                q["user"] = BasicUserSerializer().to_representation(user)
                questions_set.append(q)

                count += 1

                if count > 4:
                    break

            if end:
                break


        return questions_set

    @classmethod
    def number_of_questions(self, instance):

        active_objects = Object.objects.filter(user=instance.id, isActive=1)

        count = 0
        for active_object in active_objects:
            questions = Question.objects.filter(obj=active_object, answered=0)
            count += len(questions)          

        return count 


class AccountUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', "username", "paypal_email", "iban"]

    def serialize_operation(self, queryset):

        paymment_methods = PaymentMethod.objects.all()
        operation_types = OperationType.objects.all()

        serialized_queryset = []
        for query in queryset:

            operation = OperationSerializer().to_representation(query)
            operation['paymentMethod'] = paymment_methods[int(operation["paymentMethod"])-1].name
            operation["isType"] = operation_types[int(operation['isType'])-1].name
            serialized_queryset.append(operation)

        return serialized_queryset

    def to_representation(self, instance):

        rep = super().to_representation(instance)

        credits = Operation.objects.filter(user=instance.id, isType=1).order_by("-id")
        debits = Operation.objects.filter(user=instance.id, isType=2).order_by("-id")

        rep["balance"] = BalanceSerializer().to_representation(instance)
        rep["credits"] = self.serialize_operation(credits)
        rep["debits"] = self.serialize_operation(debits)

        return rep


class DetailledUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ("password", )


    def to_representation(self, instance):

        rep = super().to_representation(instance)

        rep["card_number"] = hidePartOfPaymentMethod(rep["card_number"])
        rep["iban"] = hidePartOfPaymentMethod(rep["iban"])

        rep['balance'] = BalanceSerializer().to_representation(instance)
        
        return rep

class QuestionAndAnwserOfObjectSerializer(serializers.ModelSerializer):

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
            request_user = User.objects.get(username=request_user)
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
        user = User.objects.get(email=obj.user.email)
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

