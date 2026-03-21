from django.db import models

class Shop(models.Model):
    """디저트를 판매하는 오프라인/온라인 스토어 정보 (Phase 1)"""
    name = models.CharField(
        max_length=100, 
        verbose_name="가게명"
    )
    address = models.CharField(
        max_length=255, 
        null=True, 
        blank=True, 
        verbose_name="일반 주소"
    )
    address_detail = models.CharField(
        max_length=255, 
        null=True, 
        blank=True, 
        verbose_name="상세 주소"
    )
    contact = models.CharField(
        max_length=50, 
        null=True, 
        blank=True, 
        verbose_name="연락처"
    )
    operating_hours = models.TextField(
        null=True, 
        blank=True, 
        verbose_name="영업시간"
    )
    instagram_url = models.URLField(
        null=True, 
        blank=True, 
        verbose_name="인스타그램 URL"
    )
    youtube_url = models.URLField(
        null=True, 
        blank=True, 
        verbose_name="유튜브 URL"
    )
    description = models.CharField(
        max_length=80, 
        null=True, 
        blank=True, 
        verbose_name="가게 소개(80자 제한)",
        help_text="80자까지 입력하실 수 있어요."
    )
    
    def __str__(self):
        return self.name

class Dessert(models.Model):
    """저당 디저트 상세 정보 (Phase 1: 콘텐츠 전용)"""
    shop = models.ForeignKey(
        Shop, 
        on_delete=models.CASCADE, 
        related_name='desserts',
        verbose_name="가게"
    )
    name = models.CharField(
        max_length=100, 
        verbose_name="디저트명"
    )
    main_image = models.ImageField(
        upload_to='desserts/', 
        verbose_name="대표 이미지"
    )
    category = models.CharField(
        max_length=50, 
        verbose_name="카테고리"
    )
    sugar_content = models.FloatField(
        null=True, 
        blank=True, 
        verbose_name="당류 함량(g)"
    )
    calorie = models.IntegerField(
        null=True, 
        blank=True, 
        verbose_name="칼로리(kcal)"
    )
    alt_sugar_type = models.CharField(
        max_length=100, 
        null=True, 
        blank=True, 
        verbose_name="대체당 종류"
    )
    is_gluten_free = models.BooleanField(
        default=False, 
        verbose_name="글루텐프리 여부"
    )
    description = models.TextField(
        verbose_name="상품 설명"
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"[{self.shop.name}] {self.name}"

class Magazine(models.Model):
    """큐레이션 콘텐츠 (Phase 1: 매거진)"""
    title = models.CharField(
        max_length=200, 
        verbose_name="제목"
    )
    cover_image = models.ImageField(
        upload_to='magazines/', 
        verbose_name="커버 이미지"
    )
    body = models.TextField(
        verbose_name="본문 내용"
    )
    featured_desserts = models.ManyToManyField(
        Dessert, 
        related_name='magazines', 
        verbose_name="관련 디저트"
    )
    published_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title