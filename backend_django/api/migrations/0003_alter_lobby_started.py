# Generated by Django 4.1.4 on 2022-12-19 20:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_alter_lobby_event_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="lobby",
            name="started",
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
