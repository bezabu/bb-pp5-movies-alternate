from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator 

RATING = ((0, "0 stars"), (1, "1 star"), (2, "2 stars"), (3, "3 stars"), (4, "4 stars"), (5, "5 stars"))

class Movie(models.Model):
    title = models.CharField(max_length=255, blank=True)
    year = models.DateField(auto_now=False, auto_now_add=False)
    director = models.CharField(max_length=255, blank=True)
    genre = models.CharField(max_length=255, blank=True)
    actors = models.CharField(max_length=255, blank=True)
    image = models.ImageField(
        upload_to='images/', default='../clapper_board_vector_oi5zxv'
    )

    class Meta:
        ordering = ['-year']

    def __str__(self):
        return f'{self.title}'

class Review(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="reviews")
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE, related_name="reviews")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField(blank=True)
    rating = models.IntegerField(default=3, choices=RATING)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.author} reviews {self.movie_title}'