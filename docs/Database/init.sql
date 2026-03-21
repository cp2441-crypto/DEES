-- 확장을 위해 UUID 자동 생성을 위한 pgcrypto 활성화 (PostgreSQL 13 미만일 경우)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 1. Users 도메인
-- ==========================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(20) NOT NULL CHECK (role IN ('SUPER_MASTER', 'MASTER', 'OWNER', 'END_USER')),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(50),
    profile_icon_url VARCHAR(255),
    preferred_region VARCHAR(100),
    tier VARCHAR(20), -- Phase 2: 초콜릿, 마카롱, 타르트, 갸또
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'SLEEP', 'DELETED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);
COMMENT ON COLUMN users.tier IS 'P2: 활동량 기반 유저 등급';

CREATE TABLE owner_details (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    biz_reg_no VARCHAR(20),
    rep_name VARCHAR(50),
    bank_code VARCHAR(10), -- Phase 3
    account_no VARCHAR(50) -- Phase 3
);
COMMENT ON COLUMN owner_details.bank_code IS 'P3: 정산용 은행 코드';

-- ==========================================
-- 2. Stores 도메인
-- ==========================================
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact VARCHAR(50),
    open_hours VARCHAR(255),
    intro TEXT,
    sns_link VARCHAR(255),
    location_pin_url VARCHAR(255),
    rep_image_url VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'TEMP_CLOSED', 'PERM_CLOSED')),
    delivery_fee INTEGER, -- Phase 3
    free_delivery_min INTEGER, -- Phase 3
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE store_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE store_categories (
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    category_code VARCHAR(10) NOT NULL,
    is_main BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (store_id, category_code)
);

-- ==========================================
-- 3. Products 도메인
-- ==========================================
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    short_description VARCHAR(255),
    image_url VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'ON_SALE' CHECK (status IN ('ON_SALE', 'SOLD_OUT', 'HIDDEN')),
    stock_quantity INTEGER, -- Phase 3
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);
COMMENT ON COLUMN products.stock_quantity IS 'P3: 커머스 전환 시 재고 연동용';

CREATE TABLE tags (
    code VARCHAR(20) PRIMARY KEY, -- ex) TAG-VGN, ALG-EGG
    type VARCHAR(20) NOT NULL CHECK (type IN ('HEALTH', 'ALLERGY')),
    name VARCHAR(50) NOT NULL
);

CREATE TABLE product_tags (
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    tag_code VARCHAR(20) NOT NULL REFERENCES tags(code) ON DELETE CASCADE,
    PRIMARY KEY (product_id, tag_code)
);

-- ==========================================
-- 4. Contents 도메인 (큐레이션)
-- ==========================================
CREATE TABLE curation_contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type_code VARCHAR(10) NOT NULL, -- BRS, FCT, WTE, ETW, WDI
    master_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    rep_image_url VARCHAR(255),
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- ==========================================
-- 5. Campaigns 도메인 (배너, 팝업)
-- ==========================================
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(20) NOT NULL CHECK (type IN ('BANNER_TOP', 'BANNER_MID', 'POPUP')),
    title VARCHAR(255) NOT NULL,
    target_url VARCHAR(255),
    image_url VARCHAR(255) NOT NULL,
    is_ad_label_required BOOLEAN DEFAULT FALSE,
    start_at TIMESTAMP WITH TIME ZONE,
    end_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) NOT NULL DEFAULT 'RESERVED' CHECK (status IN ('RESERVED', 'IN_REVIEW', 'ACTIVE', 'PAUSED', 'ENDED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);