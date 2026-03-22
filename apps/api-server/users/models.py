from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("ID(username)는 필수입니다.")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "MASTER")
        return self.create_user(username, email, password, **extra_fields)


# 1. 통합 로그인용 User 테이블 (Phase 1 기본 스펙)
class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ("MASTER", "마스터"),
        ("OWNER", "점주"),
        ("USER", "End-user"),
    ]

    username = models.CharField(max_length=20, unique=True, verbose_name="아이디(ID)")
    email = models.EmailField(unique=True, verbose_name="이메일")
    role = models.CharField(
        max_length=10, choices=ROLE_CHOICES, default="USER", verbose_name="사용자 권한"
    )

    is_active = models.BooleanField(default=True, verbose_name="활성 여부")
    is_staff = models.BooleanField(
        default=False, verbose_name="관리자 페이지 접근 권한"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        verbose_name = "통합 계정"
        verbose_name_plural = "통합 계정 목록"


# 2. End-user 전용 프로필
class EndUserProfile(models.Model):
    GRADE_CHOICES = [
        ("CHOCO", "초콜릿"),
        ("MACARON", "마카롱"),
        ("TART", "타르트"),
        ("GATEAU", "갸또"),
    ]
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="enduser_profile"
    )
    grade = models.CharField(
        max_length=10, choices=GRADE_CHOICES, default="CHOCO", verbose_name="회원 등급"
    )
    marketing_agreed = models.BooleanField(
        default=False, verbose_name="마케팅 수신 동의"
    )


# 3. 점주 전용 프로필 (Phase 1: 복잡한 승인 절차 제거)
class ShopOwnerProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="owner_profile"
    )
    # Phase 1에서는 가입 즉시 가게를 등록/관리할 수 있도록 최소한의 프로필만 유지합니다.
    business_number = models.CharField(
        max_length=20, blank=True, null=True, verbose_name="사업자등록번호"
    )
