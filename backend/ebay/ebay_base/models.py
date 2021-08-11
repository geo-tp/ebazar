from django.db import models

class Duration(models.Model):

    time = models.IntegerField(unique=True)

class Category(models.Model):

    title= models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=1500, blank=True)
    img = models.ImageField(blank=True)

    def __str__(self):
        return self.title

class SubCategory(models.Model):

    title= models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=1500, blank=True)
    img=models.ImageField(blank=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Selection(models.Model):

    title=models.CharField(max_length=60, unique=True)
    img = models.ImageField()
    url = models.CharField(max_length=200)


class OfferBanner(models.Model):

    linkToOffer = models.CharField(max_length=200)
    image = models.ImageField()

    isActive = models.BooleanField()

