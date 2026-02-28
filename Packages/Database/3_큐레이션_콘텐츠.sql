-- ============================================
-- 3. 큐레이션 콘텐츠
-- ============================================

-- 브랜드 스토리 테이블
CREATE TABLE brand_stories (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(200),
    thumbnail_image VARCHAR(500) NOT NULL, -- 대표 이미지
    body TEXT NOT NULL, -- HTML 에디터 콘텐츠
    author_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0, -- 캐시
    comments_count INT DEFAULT 0, -- 캐시
    shares_count INT DEFAULT 0, -- 캐시
    published_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_brand_stories_author_id ON brand_stories(author_id);
CREATE INDEX idx_brand_stories_status ON brand_stories(status);
CREATE INDEX idx_brand_stories_published_at ON brand_stories(published_at);

-- 코멘트
COMMENT ON TABLE brand_stories IS '브랜드 스토리 큐레이션';
COMMENT ON COLUMN brand_stories.body IS 'HTML 에디터 콘텐츠 (이미지 URL 포함)';
COMMENT ON COLUMN brand_stories.status IS '상태: draft, published, archived';


-- 스페셜 테이블
CREATE TABLE specials (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(200),
    thumbnail_image VARCHAR(500) NOT NULL,
    description TEXT NOT NULL, -- HTML 에디터 콘텐츠
    author_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0, -- 캐시
    comments_count INT DEFAULT 0, -- 캐시
    shares_count INT DEFAULT 0, -- 캐시
    published_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_specials_author_id ON specials(author_id);
CREATE INDEX idx_specials_status ON specials(status);
CREATE INDEX idx_specials_published_at ON specials(published_at);

-- 코멘트
COMMENT ON TABLE specials IS '스페셜 큐레이션';
COMMENT ON COLUMN specials.description IS 'HTML 에디터 콘텐츠';


-- 스페셜 메뉴 매핑 테이블
CREATE TABLE special_menus (
    id BIGSERIAL PRIMARY KEY,
    special_id BIGINT NOT NULL REFERENCES specials(id) ON DELETE CASCADE,
    menu_id BIGINT NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(special_id, menu_id)
);

-- 인덱스
CREATE INDEX idx_special_menus_special_id ON special_menus(special_id);
CREATE INDEX idx_special_menus_menu_id ON special_menus(menu_id);

-- 코멘트
COMMENT ON TABLE special_menus IS '스페셜에 포함된 메뉴 (카페 이름은 JOIN으로 조회)';


-- 유명 카페 테이블
CREATE TABLE famous_cafes (
    id BIGSERIAL PRIMARY KEY,
    store_id BIGINT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    thumbnail_image VARCHAR(500) NOT NULL,
    created_by BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    approval_status VARCHAR(20) NOT NULL DEFAULT 'approved' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
    approved_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_famous_cafes_store_id ON famous_cafes(store_id);
CREATE INDEX idx_famous_cafes_approval_status ON famous_cafes(approval_status);
CREATE INDEX idx_famous_cafes_created_by ON famous_cafes(created_by);

-- 코멘트
COMMENT ON TABLE famous_cafes IS '유명 카페 큐레이션';
COMMENT ON COLUMN famous_cafes.approval_status IS 'Phase 1-2: approved, Phase 3부터 승인제';


-- 큐레이션 좋아요 테이블
CREATE TABLE curation_likes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('brand_story', 'special')),
    target_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, target_type, target_id)
);

-- 인덱스
CREATE INDEX idx_curation_likes_user_id ON curation_likes(user_id);
CREATE INDEX idx_curation_likes_target ON curation_likes(target_type, target_id);

-- 코멘트
COMMENT ON TABLE curation_likes IS '큐레이션 콘텐츠 좋아요';
COMMENT ON COLUMN curation_likes.target_type IS '대상 타입: brand_story, special';


-- 큐레이션 댓글 테이블
CREATE TABLE curation_comments (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('brand_story', 'special')),
    target_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    parent_comment_id BIGINT REFERENCES curation_comments(id) ON DELETE CASCADE, -- 대댓글
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_curation_comments_user_id ON curation_comments(user_id);
CREATE INDEX idx_curation_comments_target ON curation_comments(target_type, target_id);
CREATE INDEX idx_curation_comments_parent_id ON curation_comments(parent_comment_id);

-- 코멘트
COMMENT ON TABLE curation_comments IS '큐레이션 콘텐츠 댓글 (famous_cafe 제외)';
COMMENT ON COLUMN curation_comments.target_type IS '대상 타입: brand_story, special';


-- 큐레이션 공유 테이블
CREATE TABLE curation_shares (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('brand_story', 'special')),
    target_id BIGINT NOT NULL,
    share_method VARCHAR(20) NOT NULL CHECK (share_method IN ('kakao', 'link', 'instagram')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_curation_shares_user_id ON curation_shares(user_id);
CREATE INDEX idx_curation_shares_target ON curation_shares(target_type, target_id);

-- 코멘트
COMMENT ON TABLE curation_shares IS '큐레이션 콘텐츠 공유';
COMMENT ON COLUMN curation_shares.share_method IS '공유 방법: kakao, link, instagram';
