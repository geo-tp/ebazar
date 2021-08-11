from django.db import models
from users.models import CustomUser
# from ebay_objects.models import Object

# Create your models here.

class Bid(models.Model):

    price = models.FloatField()

    obj = models.ForeignKey("ebay_objects.Object", on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class PurchaseMethod(models.Model):

    name = models.CharField(max_length=50)

class PaymentMethod(models.Model):

    name = models.CharField(max_length=50)

class OperationType(models.Model):

    name = models.CharField(max_length=50)

class Operation(models.Model):

    amount = models.FloatField()
    date = models.DateField(auto_now_add=True)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    paymentMethod = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)

    isType = models.ForeignKey(OperationType, on_delete=models.CASCADE)
    isWithdrawal = models.BooleanField(default=0)