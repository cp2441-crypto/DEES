from django.db import models


# ── 신고 ──────────────────────────────────────────
class Report(models.Model):
    TARGET_CHOICES = [
        ("store", "가게"),
        ("board_post", "게시물"),
        ("board_comment", "게시물 댓글"),
        ("curation_comment", "큐레이션 댓글"),
    ]
    STATUS_CHOICES = [
        ("pending", "미처리"),
        ("resolved", "처리완료"),
        ("false_report", "허위신고"),
    ]

    reporter = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="reports_filed",
        verbose_name="신고자",
    )
    reporter_ip = models.GenericIPAddressField("신고자 IP", null=True, blank=True)

    target_type = models.CharField(
        "신고 대상 유형", max_length=20, choices=TARGET_CHOICES
    )
    target_id = models.BigIntegerField("신고 대상 ID")

    reason = models.ForeignKey(
        "common.ReportReasonCode", on_delete=models.CASCADE, verbose_name="신고 사유"
    )
    detail = models.TextField("상세 내용", blank=True, default="")

    status = models.CharField(
        "처리 상태", max_length=15, choices=STATUS_CHOICES, default="pending"
    )
    processed_by = models.ForeignKey(
        "accounts.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reports_processed",
        verbose_name="처리자",
    )
    processed_at = models.DateTimeField("처리일시", null=True, blank=True)

    created_at = models.DateTimeField("신고일시", auto_now_add=True)

    class Meta:
        db_table = "reports"
        ordering = ["-created_at"]
        verbose_name = "신고"
        verbose_name_plural = "신고"

    def __str__(self):
        return f"[{self.target_type}] {self.target_id} - {self.status}"


# ── 제재 이력 ─────────────────────────────────────
class Sanction(models.Model):
    TYPE_CHOICES = [
        ("warning", "경고"),
        ("suspend_7d", "7일 정지"),
        ("suspend_30d", "30일 정지"),
        ("permanent", "영구 정지"),
        ("store_warning", "가게 경고"),
        ("store_suspend_7d", "가게 7일 노출중단"),
        ("store_suspend_30d", "가게 30일 노출중단"),
    ]

    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="sanctions",
        verbose_name="대상자",
    )
    report = models.ForeignKey(
        Report,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="관련 신고",
    )
    sanction_type = models.CharField("제재 유형", max_length=20, choices=TYPE_CHOICES)
    reason = models.TextField("제재 사유")

    starts_at = models.DateTimeField("제재 시작일시", auto_now_add=True)
    ends_at = models.DateTimeField("제재 종료일시", null=True, blank=True)
    is_active = models.BooleanField("활성 여부", default=True)

    issued_by = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="sanctions_issued",
        verbose_name="처리자",
    )
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "sanctions"
        ordering = ["-created_at"]
        verbose_name = "제재"
        verbose_name_plural = "제재"


# ── 이의신청 ──────────────────────────────────────
class Appeal(models.Model):
    STATUS_CHOICES = [
        ("pending", "대기"),
        ("upheld", "제재 유지"),
        ("overturned", "제재 철회"),
    ]

    sanction = models.ForeignKey(
        Sanction,
        on_delete=models.CASCADE,
        related_name="appeals",
        verbose_name="관련 제재",
    )
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="appeals",
        verbose_name="신청자",
    )
    reason = models.TextField("이의신청 사유")

    status = models.CharField(
        "처리 상태", max_length=15, choices=STATUS_CHOICES, default="pending"
    )
    processed_by = models.ForeignKey(
        "accounts.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="appeals_processed",
        verbose_name="처리자",
    )
    processed_at = models.DateTimeField("처리일시", null=True, blank=True)
    result_reason = models.TextField("처리 사유", blank=True, default="")

    deadline_at = models.DateTimeField("신청 마감일시")
    escalated_at = models.DateTimeField("에스컬레이션일시", null=True, blank=True)

    created_at = models.DateTimeField("신청일시", auto_now_add=True)

    class Meta:
        db_table = "appeals"
        ordering = ["-created_at"]
        verbose_name = "이의신청"
        verbose_name_plural = "이의신청"
