from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from .models import Note, Category
from .serializers import UserSerializer, NoteSerializer, CategorySerializer
from .permissions import IsOwner

# --- User Registration View ---
class UserCreateView(CreateAPIView):
    """
    API endpoint to register a new user.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# --- Category ViewSet ---
class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing categories.
    - Anyone can list categories.
    - Authenticated users can create/update/delete.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# --- Note ViewSet ---
class NoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint for user notes.
    - Users can only see their own notes.
    - Users can create, update, and delete their own notes.
    - Filtering & search supported.
    """
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['title']

    def get_queryset(self):
        """Ensure users only see their own notes."""
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Automatically assign the logged-in user to the note."""
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        """Ensure users can only update their own notes."""
        note = get_object_or_404(Note, id=kwargs["pk"], user=request.user)
        serializer = self.get_serializer(note, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        """Ensure users can only delete their own notes."""
        note = get_object_or_404(Note, id=kwargs["pk"], user=request.user)
        note.delete()
        return Response({"message": "Note deleted successfully"}, status=204)
