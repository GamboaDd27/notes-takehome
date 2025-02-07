from django.shortcuts import render

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User

from .models import Category, Note
from .serializers import (
    UserSerializer, 
    CategorySerializer, 
    NoteSerializer
)

# --- User Registration View ---
class UserCreateView(generics.CreateAPIView):
    """
    Creates a new user.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


# --- Category ViewSet ---
class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet to handle categories (list, create, retrieve, update, delete).
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# --- Note ViewSet ---
class NoteViewSet(viewsets.ModelViewSet):
    """
    ViewSet for CRUD on notes.
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        """
        Automatically set the user of the note to the logged-in user.
        """
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """
        Filter notes so users only see their own notes.
        """
        return self.queryset.filter(user=self.request.user)
