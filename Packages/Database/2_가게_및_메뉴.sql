-- ============================================
-- 2. 가게 및 메뉴
-- ============================================

-- 가게 테이블
CREATE TABLE stores (
    id BIGSERIAL PRIMARY KEY,
    owner_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    address VARCHAR(200) NOT NULL,
    address_detail VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    business_hours TEXT, -- JSON 형식
    thumbnail_image VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'closed')),
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_stores_owner_id ON stores(owner_id);
CREATE INDEX idx_stores_status ON stores(status);

-- 코멘트
COMMENT ON TABLE stores IS '가게 정보';
COMMENT ON COLUMN stores.business_hours IS 'JSON 형식 영업시간';
COMMENT ON COLUMN stores.status IS '가게 상태: active, suspended, closed';


-- 가게 좋아요 테이블
CREATE TABLE store_likes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    store_id BIGINT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, store_id)
);

-- 인덱스
CREATE INDEX idx_store_likes_user_id ON store_likes(user_id);
CREATE INDEX idx_store_likes_store_id ON store_likes(store_id);

-- 코멘트
COMMENT ON TABLE store_likes IS '가게 좋아요';


-- 카테고리 테이블
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    icon VARCHAR(500) NOT NULL, -- 아이콘 URL
    parent_category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL, -- Self-reference
    level INT NOT NULL DEFAULT 1 CHECK (level IN (1, 2)), -- 1: 대분류, 2: 소분류
    display_order INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_categories_parent_id ON categories(parent_category_id);
CREATE INDEX idx_categories_level ON categories(level);

-- 코멘트
COMMENT ON TABLE categories IS '디저트 카테고리';
COMMENT ON COLUMN categories.parent_category_id IS '상위 카테고리 (Self-reference)';
COMMENT ON COLUMN categories.level IS '카테고리 레벨: 1=대분류, 2=소분류';


-- 메뉴 테이블
CREATE TABLE menus (
    id BIGSERIAL PRIMARY KEY,
    store_id BIGINT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    discount_price DECIMAL(10,2),
    image VARCHAR(500),
    allergen_info TEXT, -- JSON 형식 {"milk": true, "egg": true}
    tags TEXT, -- JSON 배열 ["비건", "저당", "글루텐프리"]
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_menus_store_id ON menus(store_id);
CREATE INDEX idx_menus_category_id ON menus(category_id);
CREATE INDEX idx_menus_is_available ON menus(is_available);

-- 코멘트
COMMENT ON TABLE menus IS '메뉴 정보';
COMMENT ON COLUMN menus.allergen_info IS 'JSON 형식 알러지 정보';
COMMENT ON COLUMN menus.tags IS 'JSON 배열 태그';


-- 메뉴 옵션 테이블
CREATE TABLE menu_options (
    id BIGSERIAL PRIMARY KEY,
    menu_id BIGINT NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
    option_name VARCHAR(50) NOT NULL, -- 예: 사이즈
    option_value VARCHAR(50) NOT NULL, -- 예: 레귤러, 라지
    additional_price DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_menu_options_menu_id ON menu_options(menu_id);

-- 코멘트
COMMENT ON TABLE menu_options IS '메뉴 옵션 (사이즈, 토핑 등)';
COMMENT ON COLUMN menu_options.additional_price IS '추가 금액';
