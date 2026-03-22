from django.db import models


# ── 지역 코드: 광역시/도 ──────────────────────────
class RegionProvince(models.Model):
    name = models.CharField("광역시/도 명칭", max_length=20, unique=True)
    short_name = models.CharField("줄임말", max_length=10, unique=True)
    sort_order = models.SmallIntegerField("정렬 순서", default=0)
    is_active = models.BooleanField("사용 여부", default=True)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "region_provinces"
        ordering = ["sort_order"]
        verbose_name = "광역시/도"
        verbose_name_plural = "광역시/도"

    def __str__(self):
        return self.short_name


# ── 지역 코드: 시/군/구 ───────────────────────────
class RegionDistrict(models.Model):
    province = models.ForeignKey(
        RegionProvince,
        on_delete=models.CASCADE,
        related_name="districts",
        verbose_name="광역시/도",
    )
    name = models.CharField("시/군/구 명칭", max_length=20)
    sort_order = models.SmallIntegerField("정렬 순서", default=0)
    is_active = models.BooleanField("사용 여부", default=True)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "region_districts"
        ordering = ["sort_order"]
        unique_together = [("province", "name")]
        verbose_name = "시/군/구"
        verbose_name_plural = "시/군/구"

    def __str__(self):
        return f"{self.province.short_name} {self.name}"


# ── 디저트 카테고리: 대분류 ────────────────────────
class Category(models.Model):
    code = models.CharField("코드", max_length=3, unique=True)
    label = models.CharField("카테고리명", max_length=30)
    icon_url = models.CharField("아이콘 URL", max_length=500, blank=True, default="")
    sort_order = models.SmallIntegerField("정렬 순서", default=0)
    is_active = models.BooleanField("사용 여부", default=True)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "categories"
        ordering = ["sort_order"]
        verbose_name = "대분류 카테고리"
        verbose_name_plural = "대분류 카테고리"

    def __str__(self):
        return self.label


# ── 디저트 카테고리: 소분류 ────────────────────────
class SubCategory(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="sub_categories",
        verbose_name="대분류",
    )
    code = models.CharField("코드", max_length=7, unique=True)
    label = models.CharField("카테고리명", max_length=30)
    description = models.CharField("설명", max_length=200, blank=True, default="")
    sort_order = models.SmallIntegerField("정렬 순서", default=0)
    is_active = models.BooleanField("사용 여부", default=True)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "sub_categories"
        ordering = ["sort_order"]
        verbose_name = "소분류 카테고리"
        verbose_name_plural = "소분류 카테고리"

    def __str__(self):
        return f"{self.category.label} > {self.label}"


# ── 상품 태그: 대분류 ─────────────────────────────
class ProductTagGroup(models.Model):
    code = models.CharField("코드", max_length=10, unique=True)
    label = models.CharField("그룹명", max_length=30)
    sort_order = models.SmallIntegerField("정렬 순서", default=0)
    is_active = models.BooleanField("사용 여부", default=True)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "product_tag_groups"
        ordering = ["sort_order"]
        verbose_name = "상품 태그 그룹"
        verbose_name_plural = "상품 태그 그룹"

    def __str__(self):
        return self.label


# ── 상품 태그: 소분류 ─────────────────────────────
class ProductTag(models.Model):
    DISPLAY_CHOICES = [
        ("badge", "뱃지"),
        ("warning", "경고"),
        ("tag_label", "태그 레이블"),
        ("keyword_tag", "키워드 태그"),
    ]

    group = models.ForeignKey(
        ProductTagGroup,
        on_delete=models.CASCADE,
        related_name="tags",
        verbose_name="태그 그룹",
    )
    code = models.CharField("코드", max_length=10, unique=True)
    label = models.CharField("태그명", max_length=30)
    description = models.CharField("설명", max_length=200, blank=True, default="")
    display_style = models.CharField(
        "노출 방식", max_length=20, choices=DISPLAY_CHOICES, blank=True, default=""
    )
    is_statutory = models.BooleanField("법정 항목 (삭제 불가)", default=False)
    sort_order = models.SmallIntegerField("정렬 순서", default=0)
    is_active = models.BooleanField("사용 여부", default=True)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "product_tags"
        ordering = ["sort_order"]
        verbose_name = "상품 태그"
        verbose_name_plural = "상품 태그"

    def __str__(self):
        return f"{self.group.label} > {self.label}"


# ── 큐레이션 콘텐츠 유형 코드 ──────────────────────
class CurationContentType(models.Model):
    code = models.CharField("코드", max_length=3, unique=True)
    label = models.CharField("콘텐츠 유형명", max_length=30)
    eu_label = models.CharField(
        "End-user 출력 레이블", max_length=30, blank=True, default=""
    )
    eu_icon_url = models.CharField(
        "End-user 출력 아이콘", max_length=500, blank=True, default=""
    )
    description = models.CharField("설명", max_length=200, blank=True, default="")
    sort_order = models.SmallIntegerField("정렬 순서", default=0)
    is_active = models.BooleanField("사용 여부", default=True)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "curation_content_types"
        ordering = ["sort_order"]
        verbose_name = "큐레이션 콘텐츠 유형"
        verbose_name_plural = "큐레이션 콘텐츠 유형"

    def __str__(self):
        return self.label


# ── 신고 사유 코드 ────────────────────────────────
class ReportReasonCode(models.Model):
    TARGET_CHOICES = [
        ("store", "가게"),
        ("board_post", "게시물"),
        ("board_comment", "게시물 댓글"),
        ("curation_comment", "큐레이션 댓글"),
    ]

    target_type = models.CharField(
        "신고 대상 유형", max_length=20, choices=TARGET_CHOICES
    )
    code = models.CharField("코드", max_length=20, unique=True)
    label = models.CharField("신고 사유", max_length=50)
    sort_order = models.SmallIntegerField("정렬 순서", default=0)
    is_active = models.BooleanField("사용 여부", default=True)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "report_reason_codes"
        ordering = ["sort_order"]
        verbose_name = "신고 사유 코드"
        verbose_name_plural = "신고 사유 코드"

    def __str__(self):
        return f"[{self.target_type}] {self.label}"


# ── 반려 사유 코드 ────────────────────────────────
class RejectionReasonCode(models.Model):
    CONTEXT_CHOICES = [
        ("campaign", "캠페인"),
        ("store_change", "가게 정보 변경"),
        ("owner_conversion", "점주 전환"),
    ]

    context = models.CharField("사용 맥락", max_length=30, choices=CONTEXT_CHOICES)
    code = models.CharField("코드", max_length=20, unique=True)
    label = models.CharField("반려 사유", max_length=100)
    sort_order = models.SmallIntegerField("정렬 순서", default=0)
    is_active = models.BooleanField("사용 여부", default=True)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "rejection_reason_codes"
        ordering = ["sort_order"]
        verbose_name = "반려 사유 코드"
        verbose_name_plural = "반려 사유 코드"

    def __str__(self):
        return f"[{self.context}] {self.label}"
