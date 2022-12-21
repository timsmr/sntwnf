from rest_framework.serializers import ModelSerializer
from .models import Lobby, Guest


class LobbySerializer(ModelSerializer):
    class Meta:
        model = Lobby
        fields = '__all__'


class GuestSerializer(ModelSerializer):

    def create(self, validated_data):
        return Guest.objects.create(**validated_data)

    class Meta:
        model = Guest
        fields = '__all__'
