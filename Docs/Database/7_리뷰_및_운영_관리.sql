-- ============================================
-- 7. 리뷰 및 운영 관리
-- ============================================

-- 리뷰 테이블
CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    store_id BIGINT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    content TEXT NOT NULL,
    images TEXT, -- JSON 배열
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'hidden', 'deleted')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_order_id ON reviews(order_id);
CREATE INDEX idx_reviews_store_id ON reviews(store_id);
CREATE INDEX idx_reviews_status ON reviews(status);

-- 코멘트
COMMENT ON TABLE reviews IS '리뷰';
COMMENT ON COLUMN reviews.rating IS '평점 (1-5점)';
COMMENT ON COLUMN reviews.images IS 'JSON 배열 형식 리뷰 이미지 URL들';
COMMENT ON COLUMN reviews.status IS '상태: active, hidden, deleted';


-- 리뷰 답글 테이블
CREATE TABLE review_replies (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- 점주
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_review_replies_review_id ON review_replies(review_id);
CREATE INDEX idx_review_replies_user_id ON review_replies(user_id);

-- 코멘트
COMMENT ON TABLE review_replies IS '리뷰 답글 (점주)';


-- 알림 테이블
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('order', 'review', 'comment', 'like', 'system')),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    related_type VARCHAR(20),
    related_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- 코멘트
COMMENT ON TABLE notifications IS '알림';
COMMENT ON COLUMN notifications.type IS '알림 타입: order, review, comment, like, system';
COMMENT ON COLUMN notifications.related_type IS '관련 대상 타입';
COMMENT ON COLUMN notifications.related_id IS '관련 대상 ID';


-- 신고 테이블
CREATE TABLE reports (
    id BIGSERIAL PRIMARY KEY,
    reporter_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('user', 'store', 'feed', 'comment', 'review')),
    target_id BIGINT NOT NULL,
    reason VARCHAR(50) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'rejected')),
    handled_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    handled_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_reports_reporter_id ON reports(reporter_id);
CREATE INDEX idx_reports_target ON reports(target_type, target_id);
CREATE INDEX idx_reports_status ON reports(status);

-- 코멘트
COMMENT ON TABLE reports IS '신고';
COMMENT ON COLUMN reports.target_type IS '신고 대상 타입: user, store, feed, comment, review';
COMMENT ON COLUMN reports.target_id IS '신고 대상 ID';
COMMENT ON COLUMN reports.status IS '처리 상태: pending, reviewing, resolved, rejected';
COMMENT ON COLUMN reports.handled_by IS '처리자 (마스터 계정)';
