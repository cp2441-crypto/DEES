-- ============================================
-- 5. 피드 시스템 (Phase 2)
-- ============================================

-- 피드 테이블
CREATE TABLE feeds (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    images TEXT, -- JSON 배열
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'deleted', 'hidden')),
    likes_count INT DEFAULT 0, -- 캐시
    comments_count INT DEFAULT 0, -- 캐시
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_feeds_user_id ON feeds(user_id);
CREATE INDEX idx_feeds_status ON feeds(status);
CREATE INDEX idx_feeds_created_at ON feeds(created_at);

-- 코멘트
COMMENT ON TABLE feeds IS '피드 게시글';
COMMENT ON COLUMN feeds.images IS 'JSON 배열 형식 이미지 URL들';
COMMENT ON COLUMN feeds.status IS '상태: active, deleted, hidden';


-- 피드 태그 테이블
CREATE TABLE feed_tags (
    id BIGSERIAL PRIMARY KEY,
    feed_id BIGINT NOT NULL REFERENCES feeds(id) ON DELETE CASCADE,
    tag_type VARCHAR(20) NOT NULL CHECK (tag_type IN ('menu', 'store')),
    tag_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_feed_tags_feed_id ON feed_tags(feed_id);
CREATE INDEX idx_feed_tags_tag ON feed_tags(tag_type, tag_id);

-- 코멘트
COMMENT ON TABLE feed_tags IS '피드 태그 (메뉴, 가게)';
COMMENT ON COLUMN feed_tags.tag_type IS '태그 타입: menu, store';

-- Note: 메뉴 태그 시 해당 가게도 자동 태그 (로직 처리)


-- 피드 좋아요 테이블
CREATE TABLE feed_likes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    feed_id BIGINT NOT NULL REFERENCES feeds(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, feed_id)
);

-- 인덱스
CREATE INDEX idx_feed_likes_user_id ON feed_likes(user_id);
CREATE INDEX idx_feed_likes_feed_id ON feed_likes(feed_id);

-- 코멘트
COMMENT ON TABLE feed_likes IS '피드 좋아요';


-- 피드 댓글 테이블
CREATE TABLE feed_comments (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    feed_id BIGINT NOT NULL REFERENCES feeds(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_comment_id BIGINT REFERENCES feed_comments(id) ON DELETE CASCADE, -- 대댓글
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_feed_comments_user_id ON feed_comments(user_id);
CREATE INDEX idx_feed_comments_feed_id ON feed_comments(feed_id);
CREATE INDEX idx_feed_comments_parent_id ON feed_comments(parent_comment_id);

-- 코멘트
COMMENT ON TABLE feed_comments IS '피드 댓글';
COMMENT ON COLUMN feed_comments.parent_comment_id IS '상위 댓글 ID (대댓글)';
