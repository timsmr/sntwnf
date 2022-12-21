from django.db import models
from django.conf import settings
from string import ascii_lowercase
import random


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(ascii_lowercase, k=length))
        if Lobby.objects.filter(code=code).count() == 0:
            break

    return code


class Lobby(models.Model):
    code = models.CharField(max_length=10, unique=True,
                            default=generate_unique_code, primary_key=True)
    name = models.CharField(max_length=50)
    event_date = models.DateField(null=True, blank=True)
    created = models.DateField(auto_now_add=True)
    started = models.BooleanField(default=False, null=True, blank=True)

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = 'Lobby'
        verbose_name_plural = 'Lobbies'


class Guest(models.Model):
    lobby = models.ForeignKey(Lobby, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    is_host = models.BooleanField(default=False)
    giving_to = models.ForeignKey(
        'Guest', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.lobby.code + ' | ' + self.user.username
