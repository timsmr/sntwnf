# Generated by Django 4.1.4 on 2022-12-19 12:50

import api.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Lobby",
            fields=[
                (
                    "code",
                    models.CharField(
                        default=api.models.generate_unique_code,
                        max_length=10,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("event_date", models.DateField()),
                ("created", models.DateField(auto_now_add=True)),
                ("started", models.BooleanField(default=False)),
            ],
            options={"verbose_name": "Lobby", "verbose_name_plural": "Lobbies",},
        ),
        migrations.CreateModel(
            name="Guest",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("is_host", models.BooleanField(default=False)),
                (
                    "giving_to",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="api.guest",
                    ),
                ),
                (
                    "lobby",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.lobby"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
