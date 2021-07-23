from django.contrib import admin
from .models import *
from users.models import CustomUser

# Register your models here.
admin.site.register(PaymentMethod)
admin.site.register(PurchaseMethod)
admin.site.register(OperationType)

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(StateOfObject)

admin.site.register(PurchasedObject)
admin.site.register(Operation)
admin.site.register(Duration)

admin.site.register(Object)
admin.site.register(CustomUser)

admin.site.register(OfferBanner)
admin.site.register(Selection)

admin.site.register(Image)