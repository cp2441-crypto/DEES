from django.db import models


# ── 캠페인 ────────────────────────────────────────
class Campaign(models.Model):
    STATUS_CHOICES = [
        ("scheduled", "예약"),
        ("active", "진행중"),
        ("paused", "중지"),
        ("ended", "종료"),
        ("rejected", "반려"),
    ]
    LANDING_CHOICES = [
        ("external", "외부 URL"),
        ("internal", "내부 페이지"),
    ]

    name = models.CharField("캠페인명", max_length=100)
    registered_by = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="campaigns",
        verbose_name="등록자",
    )
    is_ad = models.BooleanField("광고 여부", default=False)

    # 노출 기간
    start_at = models.DateTimeField("노출 시작일시")
    end_at = models.DateTimeField("노출 종료일시")
    original_end_at = models.DateTimeField("원래 종료일시", null=True, blank=True)

    # 상태
    status = models.CharField(
        "상태", max_length=10, choices=STATUS_CHOICES, default="scheduled"
    )
    paused_at = models.DateTimeField("중지일시", null=True, blank=True)
    ended_at = models.DateTimeField("종료일시", null=True, blank=True)
    rejected_at = models.DateTimeField("반려일시", null=True, blank=True)

    # 랜딩
    landing_type = models.CharField(
        "랜딩 유형", max_length=10, choices=LANDING_CHOICES, blank=True, default=""
    )
    landing_url = models.CharField(
        "외부 랜딩 URL", max_length=500, blank=True, default=""
    )
    landing_page_ref = models.CharField(
        "내부 페이지 참조", max_length=100, blank=True, default=""
    )

    # 반려
    rejection_reason = models.ForeignKey(
        "common.RejectionReasonCode",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="반려 사유",
    )
    rejection_detail = models.TextField("반려 상세 사유", blank=True, default="")
    rejection_count = models.SmallIntegerField("반려 횟수", default=0)
    blocked_until = models.DateTimeField("등록 제한 해제일", null=True, blank=True)

    # 집계
    impressions_count = models.IntegerField("노출수", default=0)
    clicks_count = models.IntegerField("클릭수", default=0)

    # P3 대비 지역 타겟팅
    region_province = models.ForeignKey(
        "common.RegionProvince",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="타겟 지역",
    )

    created_at = models.DateTimeField("등록일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "campaigns"
        verbose_name = "캠페인"
        verbose_name_plural = "캠페인"

    def __str__(self):
        return self.name


# ── 캠페인 유형 (다대다) ──────────────────────────
class CampaignTypeAssignment(models.Model):
    TYPE_CHOICES = [
        ("banner", "배너"),
        ("popup", "팝업"),
        ("feed_ad", "피드 광고"),
        ("exhibition", "기획전"),
        ("event", "이벤트"),
    ]

    campaign = models.ForeignKey(
        Campaign,
        on_delete=models.CASCADE,
        related_name="type_assignments",
        verbose_name="캠페인",
    )
    type_code = models.CharField("유형", max_length=10, choices=TYPE_CHOICES)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "campaign_type_assignments"
        unique_together = [("campaign", "type_code")]
        verbose_name = "캠페인 유형"
        verbose_name_plural = "캠페인 유형"


# ── 배너 소재 ─────────────────────────────────────
class CampaignBanner(models.Model):
    campaign = models.ForeignKey(
        Campaign,
        on_delete=models.CASCADE,
        related_name="banners",
        verbose_name="캠페인",
    )
    placement = models.CharField("노출 위치", max_length=30)
    image_url = models.CharField("이미지 URL", max_length=500)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "campaign_banners"
        verbose_name = "배너 소재"
        verbose_name_plural = "배너 소재"


# ── 팝업 소재 ─────────────────────────────────────
class CampaignPopup(models.Model):
    campaign = models.ForeignKey(
        Campaign, on_delete=models.CASCADE, related_name="popups", verbose_name="캠페인"
    )
    image_url = models.CharField("이미지 URL", max_length=500)
    sort_order = models.SmallIntegerField("정렬 순서", default=0)
    is_notice = models.BooleanField("공지 고정", default=False)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "campaign_popups"
        ordering = ["sort_order"]
        verbose_name = "팝업 소재"
        verbose_name_plural = "팝업 소재"
