from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Note(models.Model):
    """
    Each note belongs to a user and a category.
    `last_edit_time` is automatically updated on save.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    body = models.TextField()
    last_edit_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
