from django.db import models
from users.models import CustomUser
from ebay_base.models import Category, SubCategory
from ebay_account.models import Operation

class StateOfObject(models.Model):

    """State of an object: example : Good Condition, Used, New..."""

    title= models.CharField(max_length=50)
    description = models.CharField(max_length=1500, blank=True)


class Object(models.Model):

    title = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    actualPrice = models.FloatField(default=0)
    state = models.ForeignKey(StateOfObject, on_delete=models.CASCADE)
    creationDate = models.DateTimeField(auto_now_add=True, null=False)
    durationInDays = models.IntegerField(default=7)
    endingDate = models.DateTimeField(blank=True, null=True)
    isActive = models.BooleanField(default=True)
    isSelled = models.BooleanField(default=False)
    reservePrice = models.FloatField(default=0)
    shippingPrice = models.FloatField()
    returnPolicy = models.BooleanField()
    mainImage = models.ImageField()

    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='owner')

    views = models.IntegerField(default=0, blank=True, null=True)

    def get_fields(self):
        fields_tuple = [(field.name, field.value_to_string(self)) for field in Object._meta.fields]
        return {val[0]:val[1] for val in fields_tuple}

class Image(models.Model):

    """Additionnal image of object"""

    imageOfObject = models.ImageField()
    obj = models.ForeignKey(Object, on_delete=models.CASCADE)

class FollowedObject(models.Model):

    """Association table for Object followed by user"""

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    obj = models.ForeignKey(Object, on_delete=models.CASCADE)

class PurchasedObject(models.Model):

    """Purchased object with delivery and payment informations"""

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    obj = models.ForeignKey(Object, on_delete=models.CASCADE)

    isCancelled = models.BooleanField(default=0, blank=True, null=True)
    isComplete = models.BooleanField(default=0, blank=True, null=True)

    isShipped = models.BooleanField(default=0, blank=True, null=True)
    shippingNumber = models.CharField(max_length=120, blank=True, null=True)
    shippingCompany = models.CharField(max_length=120, blank=True, null=True)

    isPaid = models.BooleanField(default=0, blank=True, null=True)

    operation = models.ForeignKey(Operation, on_delete=models.CASCADE, blank=True, null=True)
