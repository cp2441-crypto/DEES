from django.db import models


# ── 관리 행위 로그 (3년 보관) ──────────────────────
class AdminActionLog(models.Model):
    actor = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="action_logs",
        verbose_name="수행자",
    )
    action_type = models.CharField("행위 유형", max_length=50)
    target_table = models.CharField("대상 테이블", max_length=50)
    target_id = models.CharField("대상 ID", max_length=50, blank=True, default="")
    field_name = models.CharField("변경 항목", max_length=50, blank=True, default="")
    old_value = models.TextField("이전 값", blank=True, default="")
    new_value = models.TextField("변경 값", blank=True, default="")
    ip_address = models.GenericIPAddressField("IP 주소", null=True, blank=True)
    created_at = models.DateTimeField("기록일시", auto_now_add=True)

    class Meta:
        db_table = "admin_action_logs"
        ordering = ["-created_at"]
        verbose_name = "관리 행위 로그"
        verbose_name_plural = "관리 행위 로그"


# ── 시스템 접속 로그 (1년 보관) ────────────────────
class SystemAccessLog(models.Model):
    ACTION_CHOICES = [
        ("login", "로그인"),
        ("logout", "로그아웃"),
        ("failed_login", "로그인 실패"),
    ]

    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="access_logs",
        verbose_name="사용자",
    )
    ip_address = models.GenericIPAddressField("IP 주소")
    user_agent = models.CharField(
        "브라우저 정보", max_length=500, blank=True, default=""
    )
    action = models.CharField(
        "행위", max_length=20, choices=ACTION_CHOICES, default="login"
    )
    created_at = models.DateTimeField("접속일시", auto_now_add=True)

    class Meta:
        db_table = "system_access_logs"
        ordering = ["-created_at"]
        verbose_name = "시스템 접속 로그"
        verbose_name_plural = "시스템 접속 로그"


# ── 비회원 검색 데이터 수집 ────────────────────────
class AnonymousSearchLog(models.Model):
    session_id = models.CharField("세션 ID", max_length=100)
    keyword = models.CharField("검색 키워드", max_length=200)
    result_count = models.IntegerField("검색 결과 수", null=True, blank=True)
    clicked_type = models.CharField(
        "클릭 대상 유형", max_length=20, blank=True, default=""
    )
    clicked_id = models.BigIntegerField("클릭 대상 ID", null=True, blank=True)
    ip_masked = models.CharField("마스킹 IP", max_length=50, blank=True, default="")
    user_agent = models.CharField(
        "브라우저 정보", max_length=500, blank=True, default=""
    )
    category_filter = models.CharField(
        "카테고리 필터", max_length=50, blank=True, default=""
    )
    created_at = models.DateTimeField("검색일시", auto_now_add=True)

    class Meta:
        db_table = "anonymous_search_logs"
        ordering = ["-created_at"]
        verbose_name = "비회원 검색 로그"
        verbose_name_plural = "비회원 검색 로그"
