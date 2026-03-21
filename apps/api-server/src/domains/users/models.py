# api-server/src/domains/users/models.py

import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('이메일 주소는 필수입니다.')
        if not username:
            raise ValueError('아이디(username)는 필수입니다.')
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password) # 비밀번호 암호화(bcrypt 등) 자동 처리
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('role', 'SUPER_MASTER')
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    # 권한 및 상태 Choice 정의
    ROLE_CHOICES = (
        ('SUPER_MASTER', 'Super Master'),
        ('MASTER', 'Master'),
        ('OWNER', 'Owner'),
        ('END_USER', 'End User'),
    )
    
    STATUS_CHOICES = (
        ('ACTIVE', 'Active'),
        ('SUSPENDED', 'Suspended'), # 제재
        ('SLEEP', 'Sleep'),         # 휴면
        ('DELETED', 'Deleted'),     # 탈퇴 (Soft Delete)
    )

    # 기본 정보
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='END_USER')
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    nickname = models.CharField(max_length=50, null=True, blank=True)
    profile_icon_url = models.CharField(max_length=255, null=True, blank=True)
    
    # 정책 및 서비스 부가 정보
    preferred_region = models.CharField(max_length=100, null=True, blank=True)
    tier = models.CharField(max_length=20, null=True, blank=True) # Phase 2 등급용
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ACTIVE')
    
    # 타임스탬프 (Soft Delete 포함)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    
    # Django 관리자 페이지 및 권한 제어용 필수 필드
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username' # 로그인 시 사용할 기준 필드 (ID 로그인 정책 반영)
    REQUIRED_FIELDS = ['email'] # superuser 생성 시 추가로 받을 필드

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f"[{self.role}] {self.username}"

    def delete(self, *args, **kwargs):
        """ 물리적 삭제 대신 Soft Delete 처리 """
        self.deleted_at = timezone.now()
        self.status = 'DELETED'
        self.is_active = False
        self.save()