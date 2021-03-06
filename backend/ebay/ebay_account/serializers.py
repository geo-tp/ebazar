from rest_framework import serializers
from users.models import CustomUser
from .models import *
from users.serializers import BasicUserSerializer
from ebay_base.functions_utils import hidePartOfData
from users.serializers import ExpeditionUserSerializer, BasicUserSerializer
from ebay_objects.serializers import ObjectSerializer
from ebay_objects.models import Object

class AccountUserSerializer(serializers.ModelSerializer):
    """
    Serialize User Operations
    """

    class Meta:
        model = CustomUser
        fields = ['id', "username", "paypal_email", "iban"]

    def serialize_operation(self, queryset):
        """

        """
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

class TransactionSerializer(serializers.ModelSerializer):

    # user = BasicUserSerializer()
    # obj = ObjectSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ["id", "isPaid", "isComplete", "isCancelled", "isShipped",
                  "shippingCompany", "shippingNumber", "user", "obj"]
                  
    def to_representation(self, instance):

        rep = super().to_representation(instance)
        rep["user"] = ExpeditionUserSerializer().to_representation(CustomUser.objects.get(id=int(rep["user"])))
        rep["obj"] = ObjectSerializer().to_representation(Object.objects.get(id=int(rep['obj'])))
        rep["obj"]["user"] = BasicUserSerializer().to_representation(CustomUser.objects.get(id=int(rep["obj"]["user"])))

        request = self.context.get("request")
        rep['obj']["mainImage"] = "http://" + request.get_host() + rep["obj"]["mainImage"]

        return rep

class OperationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Operation
        fields = "__all__"

class BalanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Operation
        fields = "__all__"

    def calculate_queryset_amount(self, queryset):
        """
         Sum of all amount in a queryset
        """
        result = 0
        for query in queryset:
            result += int(query.amount)

        return result

    def calculate_queryset_object_total_price(self, queryset):
        """
           Sum of all price in a queryset 
        """
        result = 0
        for query in queryset:
            result += int(query.obj.actualPrice)

        return result

    def to_representation(self, instance):
        """
        Add waitingConfirmation, payable and paid amount
        """

        rep = {"waitingConfirmationAmount":0, "payableAmount":0, "paidAmount":0}

        solde_debit_queryset = Operation.objects.filter(user=instance.id, isType__name="Debit")
        solde_withdrawal_queryset = Operation.objects.filter(user=instance.id, isWithdrawal=True)
        solde_credit_queryset = Operation.objects.filter(user=instance.id, isType__name="Credit")
        solde_waiting_confirmation_queryset = Transaction.objects.filter(user=instance.id, isComplete=0, isPaid=1)

        result_debit = self.calculate_queryset_amount(solde_debit_queryset)
        result_credit = self.calculate_queryset_amount(solde_credit_queryset)
        result_withdrawal = self.calculate_queryset_amount(solde_withdrawal_queryset)
        result_waiting_confirmation = self.calculate_queryset_object_total_price(solde_waiting_confirmation_queryset)

        rep['waitingConfirmationAmount'] = result_waiting_confirmation
        rep["payableAmount"] = result_credit - result_debit
        rep["paidAmount"] = result_withdrawal

        return rep


class BidSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bid
        fields = ["id", "price", "user", "obj"]

    def to_representation(self, instance, request=None):

        rep = super().to_representation(instance)

        # Payment data are hided for confidentiality, 
        # Others bidders cant know exactly against who they are fighting
        user = CustomUser.objects.get(id=rep["user"])
        rep["user"] = hidePartOfData(user.username)

        return rep
