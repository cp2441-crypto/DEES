from django.db import models


# ── 서비스 문서 (약관/정책) ────────────────────────
class ServiceDocument(models.Model):
    CONSENT_CHOICES = [
        ("required", "필수 동의"),
        ("optional", "선택 동의"),
    ]
    REVISION_CHOICES = [
        ("re_consent", "재동의 필수"),
        ("notice_only", "고지만 진행"),
    ]
    STATUS_CHOICES = [
        ("draft", "작성중"),
        ("scheduled", "적용 예정"),
        ("active", "적용중"),
        ("expired", "적용 종료"),
    ]

    doc_type = models.CharField("문서 유형", max_length=30)
    title = models.CharField("항목명", max_length=100)
    version = models.CharField("문서 버전", max_length=20)
    full_text = models.TextField("전문")
    change_summary = models.TextField("개정 내용", blank=True, default="")
    consent_type = models.CharField("동의 구분", max_length=10, choices=CONSENT_CHOICES)
    revision_type = models.CharField(
        "개정 유형", max_length=15, choices=REVISION_CHOICES
    )

    status = models.CharField(
        "상태", max_length=15, choices=STATUS_CHOICES, default="draft"
    )
    effective_at = models.DateTimeField("적용일", null=True, blank=True)
    created_by = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="created_documents",
        verbose_name="작성자",
    )
    updated_by = models.ForeignKey(
        "accounts.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="updated_documents",
        verbose_name="최종 수정자",
    )

    created_at = models.DateTimeField("작성일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "service_documents"
        ordering = ["-created_at"]
        verbose_name = "서비스 문서"
        verbose_name_plural = "서비스 문서"

    def __str__(self):
        return f"{self.title} v{self.version}"
