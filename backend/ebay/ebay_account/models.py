from django.db import models
from users.models import CustomUser

class Bid(models.Model):
    """
    When user place a bid on object, Bid is created
    """
    price = models.FloatField()

    obj = models.ForeignKey("ebay_objects.Object", on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class PurchaseMethod(models.Model):
    """
    Avalaible Method for purchasing an object, ex: Paypal
    """

    name = models.CharField(max_length=50)

class PaymentMethod(models.Model):
    """
    useless ?
    """
    name = models.CharField(max_length=50)

class OperationType(models.Model):
    """
    OperationType: Credit or Debit
    Only used for serializing operations
    """

    name = models.CharField(max_length=50)

class Operation(models.Model):
    """
        Operations ara created when user pay an object or do a withdrawal
    """

    amount = models.FloatField()
    date = models.DateField(auto_now_add=True)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    paymentMethod = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)

    isType = models.ForeignKey(OperationType, on_delete=models.CASCADE)
    isWithdrawal = models.BooleanField(default=0)