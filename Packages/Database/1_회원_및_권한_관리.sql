-- ============================================
-- 1. 회원 및 권한 관리
-- ============================================

-- 회원 테이블
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- bcrypt 해시
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20), -- 하이픈 포함 (010-1234-5678)
    birth_date DATE,
    profile_icon VARCHAR(500), -- 이미지 URL, end-user는 null
    role VARCHAR(20) NOT NULL CHECK (role IN ('end_user', 'owner', 'master')),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'dormant', 'suspended', 'withdrawn')),
    marketing_agreed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    withdrawn_at TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_status ON users(status);

-- 코멘트
COMMENT ON TABLE users IS '회원 정보';
COMMENT ON COLUMN users.id IS '회원 ID (PK)';
COMMENT ON COLUMN users.email IS '이메일 (로그인 ID)';
COMMENT ON COLUMN users.password IS 'bcrypt 해시 비밀번호';
COMMENT ON COLUMN users.role IS '회원 역할: end_user, owner, master';
COMMENT ON COLUMN users.status IS '회원 상태: active, dormant, suspended, withdrawn';


-- 배송 주소 테이블
CREATE TABLE shipping_addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address_name VARCHAR(50) NOT NULL, -- 예: 집, 회사
    recipient_name VARCHAR(50) NOT NULL,
    recipient_phone VARCHAR(20) NOT NULL,
    address VARCHAR(200) NOT NULL, -- 기본 주소
    address_detail VARCHAR(100) NOT NULL, -- 상세 주소
    postal_code VARCHAR(10) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_shipping_addresses_user_id ON shipping_addresses(user_id);
CREATE INDEX idx_shipping_addresses_user_default ON shipping_addresses(user_id, is_default);

-- 코멘트
COMMENT ON TABLE shipping_addresses IS '배송 주소';
COMMENT ON COLUMN shipping_addresses.is_default IS '기본 배송지 여부';


-- 마스터 프로필 테이블
CREATE TABLE master_profiles (
    user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    permission_level VARCHAR(20) NOT NULL CHECK (permission_level IN ('super_admin', 'content_admin', 'cs_admin')),
    department VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 코멘트
COMMENT ON TABLE master_profiles IS '마스터 계정 프로필';
COMMENT ON COLUMN master_profiles.permission_level IS '권한 레벨: super_admin, content_admin, cs_admin';


-- 점주 프로필 테이블
CREATE TABLE owner_profiles (
    user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    business_number VARCHAR(20) NOT NULL UNIQUE, -- 사업자등록번호
    business_name VARCHAR(100) NOT NULL,
    representative_name VARCHAR(50) NOT NULL, -- 대표자명
    business_address VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_owner_profiles_business_number ON owner_profiles(business_number);

-- 코멘트
COMMENT ON TABLE owner_profiles IS '점주 계정 프로필';
COMMENT ON COLUMN owner_profiles.business_number IS '사업자등록번호';


-- 회원 등급 테이블
CREATE TABLE user_grades (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    grade_level INT NOT NULL DEFAULT 5 CHECK (grade_level BETWEEN 1 AND 5), -- 1~5등급, 점주는 1등급 고정
    total_orders INT DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_user_grades_user_id ON user_grades(user_id);

-- 코멘트
COMMENT ON TABLE user_grades IS '회원 등급 정보';
COMMENT ON COLUMN user_grades.grade_level IS '회원 등급 (1~5), 점주는 1등급 고정';
