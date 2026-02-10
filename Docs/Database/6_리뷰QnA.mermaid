---
title: "DEES ERD ⑥ 리뷰·Q&A 도메인 (Phase 3)"
---
```mermaid
erDiagram
    reviews {
        bigint id PK "고유 ID"
        bigint user_id FK "users.id (작성자, end-user만)"
        bigint order_item_id FK "order_items.id (구매 증빙)"
        bigint store_id FK "stores.id"
        bigint menu_id FK "menus.id"
        int rating "별점 (1~5)"
        text content "리뷰 내용 (20~1000자)"
        boolean has_photo "포토 리뷰 여부"
        int reward_amount "적립금 (텍스트 100 / 포토 300)"
        boolean reward_claimed "적립금 지급 여부"
        enum status "active / hidden / deleted"
        timestamp created_at "작성일"
        timestamp updated_at "수정일 (7일 내)"
        timestamp deleted_at "삭제일"
    }

    review_images {
        bigint id PK "고유 ID"
        bigint review_id FK "reviews.id"
        varchar image_url "이미지 경로 (WEBP 변환)"
        int sort_order "정렬 순서"
        timestamp created_at "등록일"
    }

    qna {
        bigint id PK "고유 ID"
        bigint store_id FK "stores.id"
        bigint menu_id FK "menus.id (메뉴 Q&A 시)"
        bigint question_user_id FK "users.id (질문자, end-user만)"
        text question "질문 내용 (10~1000자)"
        bigint answer_user_id FK "users.id (답변자, 점주)"
        text answer "답변 내용"
        timestamp question_at "질문일"
        timestamp answered_at "답변일"
        timestamp deleted_at "삭제일"
    }

    faqs {
        bigint id PK "고유 ID"
        bigint store_id FK "stores.id"
        varchar question "질문"
        text answer "답변"
        int sort_order "정렬 순서 (최대 20개)"
        boolean is_active "활성 여부"
        timestamp created_at "등록일"
        timestamp updated_at "수정일"
    }

    reviews ||--o{ review_images : "리뷰 이미지 (최대 3장)"
    reviews }o--|| stores : "가게 리뷰"
    reviews }o--|| menus : "메뉴 리뷰"
    qna }o--|| stores : "가게 Q&A"
    faqs }o--|| stores : "가게 FAQ"
```