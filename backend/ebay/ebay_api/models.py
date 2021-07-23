from django.db import models
from users.models import CustomUser as User


class StateOfObject(models.Model):

    title= models.CharField(max_length=50)
    description = models.CharField(max_length=1500, blank=True)

class Duration(models.Model):

    time = models.IntegerField(unique=True)

class Category(models.Model):

    title= models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=1500, blank=True)
    img = models.ImageField(blank=True)

    def __str__(self):
        return self.title


class Selection(models.Model):

    title=models.CharField(max_length=60, unique=True)
    img = models.ImageField()
    url = models.CharField(max_length=200)


class SubCategory(models.Model):

    title= models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=1500, blank=True)
    img=models.ImageField(blank=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

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

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')

    views = models.IntegerField(default=0, blank=True, null=True)

    def get_fields(self):
        fields_tuple = [(field.name, field.value_to_string(self)) for field in Object._meta.fields]
        return {val[0]:val[1] for val in fields_tuple}

class PurchaseMethod(models.Model):

    name = models.CharField(max_length=50)

class PaymentMethod(models.Model):

    name = models.CharField(max_length=50)

class OperationType(models.Model):

    name = models.CharField(max_length=50)

class Operation(models.Model):

    amount = models.FloatField()
    date = models.DateField(auto_now_add=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    paymentMethod = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)

    isType = models.ForeignKey(OperationType, on_delete=models.CASCADE)
    isWithdrawal = models.BooleanField(default=0)

class PurchasedObject(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    obj = models.ForeignKey(Object, on_delete=models.CASCADE)

    isCancelled = models.BooleanField(default=0, blank=True, null=True)
    isComplete = models.BooleanField(default=0, blank=True, null=True)

    isShipped = models.BooleanField(default=0, blank=True, null=True)
    shippingNumber = models.CharField(max_length=120, blank=True, null=True)
    shippingCompany = models.CharField(max_length=120, blank=True, null=True)

    isPaid = models.BooleanField(default=0, blank=True, null=True)

    operation = models.ForeignKey(Operation, on_delete=models.CASCADE, blank=True, null=True)

class Image(models.Model):

    imageOfObject = models.ImageField()
    obj = models.ForeignKey(Object, on_delete=models.CASCADE)

class Bid(models.Model):

    price = models.FloatField()

    obj = models.ForeignKey(Object, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class FollowedObject(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    obj = models.ForeignKey(Object, on_delete=models.CASCADE)
    

class Message(models.Model):

    title = models.CharField(max_length=50, blank=True)
    text = models.CharField(max_length=2000)

    answered = models.BooleanField(default=0)
    viewed = models.BooleanField(default=0)

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
    reciever = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reciever')

    date=models.DateTimeField(auto_now_add=True)

class Question(models.Model):

    questionText = models.CharField(max_length=200)
    answered = models.BooleanField(default=0)
    viewed = models.BooleanField(default=0)

    obj = models.ForeignKey(Object, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    date = models.DateTimeField(auto_now_add=True)

class Answer(models.Model):

    answerText = models.CharField(max_length=1000)

    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)


class OfferBanner(models.Model):

    linkToOffer = models.CharField(max_length=200)
    image = models.ImageField()

    isActive = models.BooleanField()

