import uuid
from django.db import models


# ── 사용자 통합 테이블 ─────────────────────────────
class User(models.Model):
    ROLE_CHOICES = [
        ("user", "일반 회원"),
        ("owner", "점주"),
        ("master", "일반 마스터"),
        ("super_master", "슈퍼 마스터"),
    ]
    STATUS_CHOICES = [
        ("active", "활성"),
        ("dormant", "휴면"),
        ("suspended", "정지"),
        ("withdrawal_pending", "탈퇴 대기"),
        ("withdrawn", "탈퇴 완료"),
    ]
    SOCIAL_CHOICES = [
        ("kakao", "카카오"),
        ("naver", "네이버"),
        ("google", "구글"),
        ("apple", "애플"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    login_id = models.CharField("아이디", max_length=20, unique=True)
    password_hash = models.CharField("암호화된 비밀번호", max_length=256)
    email = models.EmailField("이메일", max_length=254)
    nickname = models.CharField("닉네임", max_length=12)
    role = models.CharField("역할", max_length=15, choices=ROLE_CHOICES, default="user")
    status = models.CharField(
        "상태", max_length=20, choices=STATUS_CHOICES, default="active"
    )
    profile_icon_code = models.CharField(
        "프로필 아이콘 코드", max_length=10, blank=True, default=""
    )

    # 점주 전용
    store = models.OneToOneField(
        "stores.Store",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="owner_user",
        verbose_name="연결 가게",
    )

    # 마스터 전용
    master_name = models.CharField("마스터 실명", max_length=30, blank=True, default="")
    master_phone = models.CharField(
        "마스터 연락처", max_length=20, blank=True, default=""
    )

    # 소셜 로그인
    social_provider = models.CharField(
        "소셜 로그인", max_length=10, choices=SOCIAL_CHOICES, blank=True, default=""
    )
    social_uid = models.CharField("소셜 UID", max_length=200, blank=True, default="")

    # 팔로잉 대표 카테고리
    primary_category = models.ForeignKey(
        "common.Category",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="대표 카테고리",
    )

    # 선호 지역
    preferred_province = models.ForeignKey(
        "common.RegionProvince",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="선호 광역시/도",
    )
    preferred_district = models.ForeignKey(
        "common.RegionDistrict",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="선호 시/군/구",
    )

    # 보안
    failed_login_count = models.SmallIntegerField("로그인 실패 횟수", default=0)
    locked_until = models.DateTimeField("계정 잠김 해제 시각", null=True, blank=True)
    password_changed_at = models.DateTimeField(
        "비밀번호 변경일시", null=True, blank=True
    )

    # 라이프사이클
    last_login_at = models.DateTimeField("마지막 로그인", null=True, blank=True)
    dormant_notified_at = models.DateTimeField(
        "휴면 전환 알림 발송일시", null=True, blank=True
    )
    withdrawal_requested_at = models.DateTimeField(
        "탈퇴 요청일시", null=True, blank=True
    )
    withdrawn_at = models.DateTimeField("탈퇴 완료일시", null=True, blank=True)

    # 제재
    suspended_until = models.DateTimeField("정지 해제 시각", null=True, blank=True)
    sanction_count_12m = models.SmallIntegerField("12개월 제재 누적", default=0)

    created_at = models.DateTimeField("가입일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "users"
        verbose_name = "사용자"
        verbose_name_plural = "사용자"

    def __str__(self):
        return f"{self.nickname} ({self.login_id})"


# ── 세션 관리 ─────────────────────────────────────
class UserSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="sessions", verbose_name="사용자"
    )
    token_hash = models.CharField("토큰 해시", max_length=256, unique=True)
    device_info = models.CharField(
        "디바이스 정보", max_length=200, blank=True, default=""
    )
    ip_address = models.GenericIPAddressField("IP 주소", null=True, blank=True)
    expires_at = models.DateTimeField("만료 시각")
    created_at = models.DateTimeField("생성일시", auto_now_add=True)
    refreshed_at = models.DateTimeField("갱신일시", auto_now=True)

    class Meta:
        db_table = "user_sessions"
        verbose_name = "사용자 세션"
        verbose_name_plural = "사용자 세션"


# ── 가게 팔로잉 ───────────────────────────────────
class UserFollowStore(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="followed_stores",
        verbose_name="사용자",
    )
    store = models.ForeignKey(
        "stores.Store",
        on_delete=models.CASCADE,
        related_name="followers",
        verbose_name="가게",
    )
    created_at = models.DateTimeField("팔로잉 일시", auto_now_add=True)

    class Meta:
        db_table = "user_follow_stores"
        unique_together = [("user", "store")]
        verbose_name = "가게 팔로잉"
        verbose_name_plural = "가게 팔로잉"


# ── 카테고리 팔로잉 ───────────────────────────────
class UserFollowCategory(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="followed_categories",
        verbose_name="사용자",
    )
    category = models.ForeignKey(
        "common.Category", on_delete=models.CASCADE, verbose_name="카테고리"
    )
    created_at = models.DateTimeField("팔로잉 일시", auto_now_add=True)

    class Meta:
        db_table = "user_follow_categories"
        unique_together = [("user", "category")]
        verbose_name = "카테고리 팔로잉"
        verbose_name_plural = "카테고리 팔로잉"


# ── 약관 동의 이력 ────────────────────────────────
class UserTermAgreement(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="term_agreements",
        verbose_name="사용자",
    )
    term = models.ForeignKey(
        "terms.ServiceDocument", on_delete=models.CASCADE, verbose_name="약관"
    )
    agreed_at = models.DateTimeField("동의일시", auto_now_add=True)
    revoked_at = models.DateTimeField("철회일시", null=True, blank=True)

    class Meta:
        db_table = "user_term_agreements"
        verbose_name = "약관 동의 이력"
        verbose_name_plural = "약관 동의 이력"
