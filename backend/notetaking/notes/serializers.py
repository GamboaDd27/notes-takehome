from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Category, Note


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        # Create a new user with hashed password
        user = User(
            username=validated_data['username'],
            email=validated_data.get('email', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class NoteSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # read-only to avoid editing
    category_name = serializers.ReadOnlyField(source='category.name', default=None)

    class Meta:
        model = Note
        fields = [
            'id', 
            'user', 
            'category', 
            'category_name', 
            'title', 
            'body', 
            'last_edit_time'
        ]
