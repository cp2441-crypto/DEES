-- ============================================
-- 6. 주문 및 결제
-- ============================================

-- 주문 테이블
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    store_id BIGINT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    
    -- 주문자 정보
    orderer_name VARCHAR(50) NOT NULL,
    orderer_phone VARCHAR(20) NOT NULL,
    orderer_email VARCHAR(100) NOT NULL,
    
    -- 배송 정보
    shipping_address_id BIGINT NOT NULL REFERENCES shipping_addresses(id) ON DELETE RESTRICT,
    recipient_name VARCHAR(50) NOT NULL,
    recipient_phone VARCHAR(20) NOT NULL,
    shipping_address VARCHAR(200) NOT NULL,
    shipping_address_detail VARCHAR(100) NOT NULL,
    shipping_memo TEXT,
    
    -- 금액 정보
    total_amount DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    shipping_fee DECIMAL(10,2) DEFAULT 0,
    final_amount DECIMAL(10,2) NOT NULL,
    
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'preparing', 'shipping', 'delivered', 'cancelled', 'refunded')),
    
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_store_id ON orders(store_id);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- 코멘트
COMMENT ON TABLE orders IS '주문 정보';
COMMENT ON COLUMN orders.order_number IS '주문번호 (유니크)';
COMMENT ON COLUMN orders.status IS '주문 상태: pending, paid, preparing, shipping, delivered, cancelled, refunded';


-- 주문 상품 테이블
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_id BIGINT NOT NULL REFERENCES menus(id) ON DELETE RESTRICT,
    menu_name VARCHAR(100) NOT NULL, -- 스냅샷
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    options TEXT, -- JSON 형식
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_menu_id ON order_items(menu_id);

-- 코멘트
COMMENT ON TABLE order_items IS '주문 상품 내역';
COMMENT ON COLUMN order_items.menu_name IS '메뉴명 스냅샷 (주문 당시)';
COMMENT ON COLUMN order_items.options IS 'JSON 형식 선택 옵션';


-- 결제 테이블
CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('card', 'transfer', 'toss')),
    payment_amount DECIMAL(10,2) NOT NULL,
    payment_key VARCHAR(200), -- PG사 결제 키
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled', 'refunded')),
    paid_at TIMESTAMP,
    refunded_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_payment_key ON payments(payment_key);
CREATE INDEX idx_payments_status ON payments(status);

-- 코멘트
COMMENT ON TABLE payments IS '결제 정보';
COMMENT ON COLUMN payments.payment_method IS '결제 수단: card, transfer, toss';
COMMENT ON COLUMN payments.payment_key IS 'PG사 결제 키 (TossPayments 등)';
COMMENT ON COLUMN payments.status IS '결제 상태: pending, completed, failed, cancelled, refunded';
