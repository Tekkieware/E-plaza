from django.db.models.signals import pre_save
from django.contrib.auth.models import User


def upateUser(sender, instance, **kwargs):
    user = instance
    if user.username != '':
        user.username = user.email


pre_save.connect(upateUser, sender=User)
