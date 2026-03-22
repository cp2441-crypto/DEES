from django.db import models


# ── 큐레이션 콘텐츠 (5종 통합) ─────────────────────
class Curation(models.Model):
    STATUS_CHOICES = [
        ("scheduled", "예약"),
        ("published", "공개"),
        ("hidden", "숨김"),
    ]

    content_type = models.ForeignKey(
        "common.CurationContentType",
        on_delete=models.PROTECT,
        verbose_name="콘텐츠 유형",
    )
    title = models.CharField("제목", max_length=200)
    body = models.TextField("본문", blank=True, default="")
    thumbnail_url = models.CharField(
        "썸네일 URL", max_length=500, blank=True, default=""
    )
    external_url = models.CharField("외부 URL", max_length=500, blank=True, default="")
    author = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="curations",
        verbose_name="작성자",
    )

    status = models.CharField(
        "상태", max_length=10, choices=STATUS_CHOICES, default="scheduled"
    )
    scheduled_at = models.DateTimeField("예약 공개 일시", null=True, blank=True)
    published_at = models.DateTimeField("공개일시", null=True, blank=True)

    # 집계 (비정규화 캐시)
    views_count = models.IntegerField("조회수", default=0)
    likes_count = models.IntegerField("좋아요수", default=0)
    comments_count = models.IntegerField("댓글수", default=0)
    shares_count = models.IntegerField("공유수", default=0)

    created_at = models.DateTimeField("생성일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "curations"
        ordering = ["-published_at"]
        verbose_name = "큐레이션 콘텐츠"
        verbose_name_plural = "큐레이션 콘텐츠"

    def __str__(self):
        return self.title


# ── 큐레이션 ↔ 가게/상품 태그 ─────────────────────
class CurationEntityTag(models.Model):
    ENTITY_CHOICES = [
        ("store", "가게"),
        ("product", "상품"),
    ]

    curation = models.ForeignKey(
        Curation,
        on_delete=models.CASCADE,
        related_name="entity_tags",
        verbose_name="큐레이션",
    )
    entity_type = models.CharField("태그 유형", max_length=10, choices=ENTITY_CHOICES)
    store = models.ForeignKey(
        "stores.Store",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="가게",
    )
    product = models.ForeignKey(
        "stores.Product",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="상품",
    )
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "curation_entity_tags"
        verbose_name = "큐레이션 태그"
        verbose_name_plural = "큐레이션 태그"


# ── 큐레이션 좋아요 ───────────────────────────────
class CurationLike(models.Model):
    curation = models.ForeignKey(
        Curation,
        on_delete=models.CASCADE,
        related_name="likes",
        verbose_name="큐레이션",
    )
    user = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, verbose_name="사용자"
    )
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "curation_likes"
        unique_together = [("curation", "user")]
        verbose_name = "큐레이션 좋아요"
        verbose_name_plural = "큐레이션 좋아요"


# ── 큐레이션 댓글/대댓글 ──────────────────────────
class CurationComment(models.Model):
    curation = models.ForeignKey(
        Curation,
        on_delete=models.CASCADE,
        related_name="comments",
        verbose_name="큐레이션",
    )
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="replies",
        verbose_name="상위 댓글",
    )
    user = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, verbose_name="작성자"
    )
    body = models.CharField("댓글 내용", max_length=500)
    is_deleted = models.BooleanField("삭제 여부", default=False)
    deleted_at = models.DateTimeField("삭제일시", null=True, blank=True)
    created_at = models.DateTimeField("작성일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "curation_comments"
        ordering = ["created_at"]
        verbose_name = "큐레이션 댓글"
        verbose_name_plural = "큐레이션 댓글"


# ── 큐레이션 공유 기록 ────────────────────────────
class CurationShare(models.Model):
    curation = models.ForeignKey(
        Curation,
        on_delete=models.CASCADE,
        related_name="shares",
        verbose_name="큐레이션",
    )
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="사용자",
    )
    session_id = models.CharField(
        "비회원 세션 ID", max_length=100, blank=True, default=""
    )
    created_at = models.DateTimeField("공유일시", auto_now_add=True)

    class Meta:
        db_table = "curation_shares"
        verbose_name = "큐레이션 공유"
        verbose_name_plural = "큐레이션 공유"


# ── 공지사항 ──────────────────────────────────────
class Notice(models.Model):
    CHANNEL_CHOICES = [
        ("admin", "Admin"),
        ("enduser", "End-user"),
        ("both", "양쪽"),
    ]
    STATUS_CHOICES = [
        ("scheduled", "예약"),
        ("published", "공개"),
        ("hidden", "숨김"),
    ]

    title = models.CharField("제목", max_length=200)
    body = models.TextField("본문")
    channel = models.CharField("게시 채널", max_length=10, choices=CHANNEL_CHOICES)
    status = models.CharField(
        "상태", max_length=10, choices=STATUS_CHOICES, default="scheduled"
    )
    scheduled_at = models.DateTimeField("예약 공개 일시", null=True, blank=True)
    published_at = models.DateTimeField("공개일시", null=True, blank=True)
    author = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="notices",
        verbose_name="작성자",
    )
    views_count = models.IntegerField("조회수", default=0)

    created_at = models.DateTimeField("작성일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "notices"
        ordering = ["-created_at"]
        verbose_name = "공지사항"
        verbose_name_plural = "공지사항"

    def __str__(self):
        return self.title
