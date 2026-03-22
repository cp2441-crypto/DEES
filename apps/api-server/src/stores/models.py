from django.db import models


# ── 가게 ──────────────────────────────────────────
class Store(models.Model):
    STATUS_CHOICES = [
        ("active", "운영"),
        ("paused", "휴점"),
        ("closed", "폐점"),
    ]

    name = models.CharField("가게명", max_length=50)
    phone = models.CharField("대표 번호", max_length=20, blank=True, default="")
    address = models.TextField("주소", blank=True, default="")
    adderess_detail = models.CharField(
        "주소 상세", max_length=100, blank=True, default=""
    )
    province = models.ForeignKey(
        "common.RegionProvince",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="광역시/도",
    )
    district = models.ForeignKey(
        "common.RegionDistrict",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="시/군/구",
    )
    primary_category = models.ForeignKey(
        "common.Category", on_delete=models.PROTECT, verbose_name="대표 카테고리"
    )
    description = models.TextField("가게 소개", blank=True, default="")
    business_hours = models.TextField("영업시간", blank=True, default="")
    sns_youtube = models.CharField("유튜브", max_length=500, blank=True, default="")
    sns_instagram = models.CharField(
        "인스타그램", max_length=500, blank=True, default=""
    )
    sns_tiktok = models.CharField("틱톡", max_length=500, blank=True, default="")
    naver_map_url = models.CharField(
        "네이버 지도 URL", max_length=500, blank=True, default=""
    )

    # P3 대비 예약 필드
    business_reg_number = models.CharField(
        "사업자등록번호", max_length=12, blank=True, default=""
    )
    representative_name = models.CharField(
        "대표자명", max_length=30, blank=True, default=""
    )
    opening_date = models.DateField("개업연월일", null=True, blank=True)

    status = models.CharField(
        "가게 상태", max_length=10, choices=STATUS_CHOICES, default="active"
    )
    registered_by = models.ForeignKey(
        "accounts.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="registered_stores",
        verbose_name="등록자",
    )

    created_at = models.DateTimeField("등록일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "stores"
        verbose_name = "가게"
        verbose_name_plural = "가게"

    def __str__(self):
        return self.name


# ── 가게 이미지 (최대 10장) ────────────────────────
class StoreImage(models.Model):
    store = models.ForeignKey(
        Store, on_delete=models.CASCADE, related_name="images", verbose_name="가게"
    )
    image_url = models.CharField("이미지 URL", max_length=500)
    thumb_url = models.CharField("썸네일 URL", max_length=500, blank=True, default="")
    is_primary = models.BooleanField("대표 이미지", default=False)
    sort_order = models.SmallIntegerField("정렬 순서", default=0)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "store_images"
        ordering = ["sort_order"]
        verbose_name = "가게 이미지"
        verbose_name_plural = "가게 이미지"


# ── 가게 정보 변경 이력 (1주일 유예) ────────────────
class StoreChangeLog(models.Model):
    STATUS_CHOICES = [
        ("pending_grace", "유예 기간"),
        ("applied", "적용 완료"),
        ("reverted", "취소됨"),
    ]

    store = models.ForeignKey(
        Store, on_delete=models.CASCADE, related_name="change_logs", verbose_name="가게"
    )
    changed_by = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, verbose_name="변경자"
    )
    field_name = models.CharField("변경 항목", max_length=50)
    old_value = models.TextField("이전 값", blank=True, default="")
    new_value = models.TextField("변경 값", blank=True, default="")
    status = models.CharField(
        "상태", max_length=15, choices=STATUS_CHOICES, default="applied"
    )
    grace_until = models.DateTimeField("유예 종료 시각", null=True, blank=True)
    created_at = models.DateTimeField("변경일시", auto_now_add=True)

    class Meta:
        db_table = "store_change_logs"
        ordering = ["-created_at"]
        verbose_name = "가게 정보 변경 이력"
        verbose_name_plural = "가게 정보 변경 이력"


# ── 상품 ──────────────────────────────────────────
class Product(models.Model):
    store = models.ForeignKey(
        Store, on_delete=models.CASCADE, related_name="products", verbose_name="가게"
    )
    name = models.CharField("상품명", max_length=30)
    price = models.IntegerField("가격")
    description = models.CharField("한 줄 설명", max_length=80, blank=True, default="")
    image_url = models.CharField("이미지 URL", max_length=500, blank=True, default="")
    thumb_url = models.CharField("썸네일 URL", max_length=500, blank=True, default="")
    sub_category = models.ForeignKey(
        "common.SubCategory",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="소분류 카테고리",
    )
    is_visible = models.BooleanField("공개 여부", default=True)
    sort_order = models.SmallIntegerField("정렬 순서", default=0)

    # 디즈랭크 (P1: 마스터 수동 지정, 1~20)
    dees_rank = models.SmallIntegerField("디즈랭크 순위", null=True, blank=True)

    created_at = models.DateTimeField("등록일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "products"
        ordering = ["sort_order"]
        verbose_name = "상품"
        verbose_name_plural = "상품"

    def __str__(self):
        return f"{self.store.name} > {self.name}"


# ── 상품 ↔ 태그 (N:N 구조) ──────────────────────────
class ProductTagAssignment(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="tag_assignments",
        verbose_name="상품",
    )
    tag = models.ForeignKey(
        "common.ProductTag", on_delete=models.CASCADE, verbose_name="태그"
    )
    assigned_by = models.ForeignKey(
        "accounts.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="지정자",
    )
    created_at = models.DateTimeField("지정일시", auto_now_add=True)

    class Meta:
        db_table = "product_tag_assignments"
        unique_together = [("product", "tag")]
        verbose_name = "상품 태그 지정"
        verbose_name_plural = "상품 태그 지정"
