
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from .managers import CustomUserManager

class CustomUser(AbstractUser):

    RUE = "rue"
    BOULEVARD = "boulevard"
    IMPASSE = "impasse"
    CHEMIN = "chemin"
    LIEU_DIT = "lieu dit"

    STREET_TYPES_CHOICES = [
        (RUE, "rue"),
        (BOULEVARD, "boulevard"),
        (IMPASSE, "impasse"),
        (CHEMIN, "chemin"),
        (LIEU_DIT, "lieu dit")
    ]

    username = models.CharField(max_length=50, unique=True, blank=True)
    email = models.EmailField(_('email address'), unique=True)

    date_of_birth = models.DateField(blank=True, null=True)

    street_number = models.CharField(max_length=10, blank=True)
    street_type = models.CharField(
        max_length=50,
        choices= STREET_TYPES_CHOICES,
        blank=True
    )
    street_name = models.CharField(max_length=200, blank=True)
    city_number = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=100, blank=True)

    phone_number = models.CharField(max_length=15, blank=True)
    
    paypal_email = models.EmailField(blank=True)
    iban = models.CharField(max_length=30, blank=True)

    card_number = models.CharField(max_length=20, blank=True)
    card_expiration = models.CharField(max_length=5, blank=True)
    card_owner_name = models.CharField(max_length=100, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()


    def __str__(self):
        return self.username