from django.db import models

class Duration(models.Model):

    "Duration of a bid, example : 3days, 7days ..."

    time = models.IntegerField(unique=True)

class Category(models.Model):

    "Main categories of Object example : High Tech, Video Games..."

    title= models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=1500, blank=True)
    img = models.ImageField(blank=True)

    def __str__(self):
        return self.title

class SubCategory(models.Model):

    "Sub categories of Object, example : TV, Smartphone..."

    title= models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=1500, blank=True)
    img=models.ImageField(blank=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Selection(models.Model):
    "Objects Selection to promote Good Deal on Homepage or others pages"

    title=models.CharField(max_length=60, unique=True)
    img = models.ImageField()
    url = models.CharField(max_length=200)


class OfferBanner(models.Model):

    "Offers Banners to promote on Homepage or others pages"

    linkToOffer = models.CharField(max_length=200)
    image = models.ImageField()

    isActive = models.BooleanField()

