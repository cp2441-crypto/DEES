from django.db import models


# ── 알림 템플릿 ───────────────────────────────────
class NotificationTemplate(models.Model):
    CHANNEL_CHOICES = [
        ("email", "이메일"),
        ("browser", "브라우저"),
        ("sms", "SMS"),
    ]

    code = models.CharField("코드", max_length=30, unique=True)
    channel = models.CharField("발송 채널", max_length=10, choices=CHANNEL_CHOICES)
    title_template = models.CharField(
        "제목 템플릿", max_length=200, blank=True, default=""
    )
    body_template = models.TextField("본문 템플릿", blank=True, default="")
    is_mandatory = models.BooleanField("필수 알림 (거부 불가)", default=False)
    is_active = models.BooleanField("사용 여부", default=True)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "notification_templates"
        verbose_name = "알림 템플릿"
        verbose_name_plural = "알림 템플릿"

    def __str__(self):
        return f"[{self.channel}] {self.code}"


# ── 알림 ──────────────────────────────────────────
class Notification(models.Model):
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="notifications",
        verbose_name="수신자",
    )
    template = models.ForeignKey(
        NotificationTemplate, on_delete=models.CASCADE, verbose_name="알림 템플릿"
    )
    channel = models.CharField("발송 채널", max_length=10)
    title = models.CharField("제목", max_length=200, blank=True, default="")
    body = models.TextField("본문", blank=True, default="")
    is_read = models.BooleanField("읽음 여부", default=False)
    sent_at = models.DateTimeField("발송일시", null=True, blank=True)
    read_at = models.DateTimeField("읽음일시", null=True, blank=True)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "notifications"
        ordering = ["-created_at"]
        verbose_name = "알림"
        verbose_name_plural = "알림"


# ── 알림 수신 설정 ────────────────────────────────
class NotificationPreference(models.Model):
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="notification_preferences",
        verbose_name="사용자",
    )
    template = models.ForeignKey(
        NotificationTemplate, on_delete=models.CASCADE, verbose_name="알림 템플릿"
    )
    is_enabled = models.BooleanField("수신 여부", default=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "notification_preferences"
        unique_together = [("user", "template")]
        verbose_name = "알림 수신 설정"
        verbose_name_plural = "알림 수신 설정"
