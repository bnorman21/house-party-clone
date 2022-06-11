from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        # Serialize the request and make sure it is all valid
        fields = ('guest_can_pause', 'votes_to_skip')

class UpdateRoomSerializer(serializers.ModelSerializer):
    # redefine code field, so we can pass in a non-unique code and model wont complain
    code = serializers.CharField(validators=[])
    class Meta:
        model = Room
        # Serialize the request and make sure it is all valid
        fields = ('guest_can_pause', 'votes_to_skip', 'code')
