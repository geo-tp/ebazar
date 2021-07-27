from rest_framework import serializers

from users.models import CustomUser

from rest_framework import serializers
from rest_auth.models import TokenModel
from rest_auth.registration.serializers import RegisterSerializer
from .models import CustomUser
# from rest_auth.utils import import_callable

class BasicUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id', 'username']


class CustomRegisterSerializer(RegisterSerializer):

    last_name = serializers.CharField()
    first_name = serializers.CharField()
    date_of_birth = serializers.DateField()

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.date_of_birth = self.validated_data.get('date_of_birth', '')

        user.save(update_fields=['first_name', 'last_name', 'date_of_birth'])


class ExpeditionUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_of_birth',
                  "street_number", "street_type", "street_name", "city_number", "city"]


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id',"username", 'email', 'first_name', 'last_name', 'date_of_birth',
                  "street_number", "street_type", "street_name", "city_number", "city", "phone_number"]

# # This is to allow you to override the UserDetailsSerializer at any time.
# # If you're sure you won't, you can skip this and use DefaultUserDetailsSerializer directly
# rest_auth_serializers = getattr(settings, 'REST_AUTH_SERIALIZERS', {})
# UserDetailsSerializer = import_callable(
#     rest_auth_serializers.get('USER_DETAILS_SERIALIZER', DefaultUserDetailsSerializer)
# )

class CustomTokenSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer(read_only=True)

    class Meta:
        model = TokenModel
        fields = ('key', 'user', )
