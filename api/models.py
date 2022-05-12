from django.db import models
from string import ascii_lowercase
import random

# Create your models here.


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(ascii_lowercase, k=length))
        if Lobby.objects.filter(code=code).count() == 0:
            break

    return code

class Lobby(models.Model):
    code = models.CharField(max_length=10, unique=True, default=generate_unique_code, primary_key=True)
    name = models.CharField(max_length=50)
    event_date = models.DateField()
    created = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.code

    class Meta:
        verbose_name = 'Lobby'
        verbose_name_plural = 'Lobbies'
    

class Guest(models.Model):
    email = models.EmailField()
    name = models.CharField(max_length=50)
    preferences = models.TextField(max_length=250, null=True, blank=True)
    lobby = models.ForeignKey('Lobby', on_delete=models.CASCADE)
    is_host = models.BooleanField(default=False)

    def __str__(self):
        return self.email
