from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Category, Note


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        """Create a new user with a hashed password."""
        user = User(
            username=validated_data['username'],
            email=validated_data.get('email', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for note categories.
    """
    class Meta:
        model = Category
        fields = ['id', 'name']


class NoteSerializer(serializers.ModelSerializer):
    """
    Serializer for notes.
    - Includes `category_name` to return human-readable category names.
    - Ensures users can't modify `user` field directly.
    """
    user = serializers.ReadOnlyField(source='user.username')  # Read-only
    category_name = serializers.ReadOnlyField(source='category.name', default=None)

    class Meta:
        model = Note
        fields = ['id', 'user', 'category', 'category_name', 'title', 'body', 'last_edit_time']

    def validate_title(self, value):
        """Ensure title is at least 3 characters long."""
        if len(value) < 3:
            raise serializers.ValidationError("Title must be at least 3 characters long.")
        return value
