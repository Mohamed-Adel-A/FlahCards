from rest_framework import serializers
from flashCards.models import Collection, Card
from django.contrib.auth.models import User


class CollectionSerializer(serializers.ModelSerializer):
    created_at = serializers.ReadOnlyField()
    class Meta:
        model = Collection
        fields = ['id', 'name', 'description', 'category', 'created_at'] #'__all__'

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'front', 'back']

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        fields = ['username', 'password', 'email']