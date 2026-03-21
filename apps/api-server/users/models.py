from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # 나중에 기획에 맞춰 필드를 추가할 수 있도록 비워둡니다.
    pass