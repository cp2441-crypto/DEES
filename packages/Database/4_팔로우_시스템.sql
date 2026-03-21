-- ============================================
-- 4. 팔로우 시스템
-- ============================================

-- 팔로우 테이블
CREATE TABLE follows (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('category', 'store', 'user')),
    target_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, target_type, target_id)
);

-- 인덱스
CREATE INDEX idx_follows_user_id ON follows(user_id);
CREATE INDEX idx_follows_target ON follows(target_type, target_id);

-- 코멘트
COMMENT ON TABLE follows IS '팔로우 시스템 (카테고리, 가게, 사용자)';
COMMENT ON COLUMN follows.target_type IS '팔로우 대상 타입: category, store, user';
COMMENT ON COLUMN follows.target_id IS '팔로우 대상 ID';

-- Note: category는 2개 이상 팔로우 가능
