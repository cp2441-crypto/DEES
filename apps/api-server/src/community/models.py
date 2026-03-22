from django.db import models


# ── 게시판 게시물 ─────────────────────────────────
class BoardPost(models.Model):
    STATUS_CHOICES = [
        ("published", "공개"),
        ("hidden", "숨김"),
        ("deleted", "삭제"),
    ]

    author = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="board_posts",
        verbose_name="작성자",
    )
    title = models.CharField("제목", max_length=100)
    body = models.CharField("본문", max_length=1900)
    status = models.CharField(
        "상태", max_length=10, choices=STATUS_CHOICES, default="published"
    )
    hidden_by = models.ForeignKey(
        "accounts.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="hidden_posts",
        verbose_name="숨김 처리자",
    )
    hidden_at = models.DateTimeField("숨김 처리일시", null=True, blank=True)

    # 집계 (비정규화 캐시)
    views_count = models.IntegerField("조회수", default=0)
    likes_count = models.IntegerField("좋아요수", default=0)
    comments_count = models.IntegerField("댓글수", default=0)

    created_at = models.DateTimeField("작성일시", auto_now_add=True)
    updated_at = models.DateTimeField("수정일시", auto_now=True)

    class Meta:
        db_table = "board_posts"
        ordering = ["-created_at"]
        verbose_name = "게시물"
        verbose_name_plural = "게시물"

    def __str__(self):
        return self.title


# ── 게시판 이미지 (최대 5장) ───────────────────────
class BoardPostImage(models.Model):
    post = models.ForeignKey(
        BoardPost,
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name="게시물",
    )
    image_url = models.CharField("이미지 URL", max_length=500)
    thumb_url = models.CharField("썸네일 URL", max_length=500, blank=True, default="")
    sort_order = models.SmallIntegerField("정렬 순서", default=0)
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "board_post_images"
        ordering = ["sort_order"]
        verbose_name = "게시물 이미지"
        verbose_name_plural = "게시물 이미지"


# ── 게시판 ↔ 가게/상품 태그 ───────────────────────
class BoardPostEntityTag(models.Model):
    ENTITY_CHOICES = [
        ("store", "가게"),
        ("product", "상품"),
    ]

    post = models.ForeignKey(
        BoardPost,
        on_delete=models.CASCADE,
        related_name="entity_tags",
        verbose_name="게시물",
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
        db_table = "board_post_entity_tags"
        verbose_name = "게시물 태그"
        verbose_name_plural = "게시물 태그"


# ── 게시판 좋아요 ─────────────────────────────────
class BoardPostLike(models.Model):
    post = models.ForeignKey(
        BoardPost, on_delete=models.CASCADE, related_name="likes", verbose_name="게시물"
    )
    user = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, verbose_name="사용자"
    )
    created_at = models.DateTimeField("생성일시", auto_now_add=True)

    class Meta:
        db_table = "board_post_likes"
        unique_together = [("post", "user")]
        verbose_name = "게시물 좋아요"
        verbose_name_plural = "게시물 좋아요"


# ── 게시판 댓글/대댓글 ────────────────────────────
class BoardComment(models.Model):
    post = models.ForeignKey(
        BoardPost,
        on_delete=models.CASCADE,
        related_name="comments",
        verbose_name="게시물",
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
        db_table = "board_comments"
        ordering = ["created_at"]
        verbose_name = "게시판 댓글"
        verbose_name_plural = "게시판 댓글"
