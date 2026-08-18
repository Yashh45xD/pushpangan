-- ====================================================================
-- E-COMMERCE DATABASE SCHEMA FOR "PUSHPANGAN" (PostgreSQL / Supabase)
-- ====================================================================
-- Description: Production-ready, fully normalized, scalable PostgreSQL schema
-- Designed for Supabase, Web, and Mobile App integration.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Automatically update updated_at timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ====================================================================
-- 1. USERS TABLE
-- ====================================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'customer', 'supplier')),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- 2. CATEGORIES TABLE
-- ====================================================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 3. PRODUCTS TABLE
-- ====================================================================
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) UNIQUE NOT NULL,
    botanical_name VARCHAR(200),
    short_description TEXT,
    long_description TEXT,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    discount_price NUMERIC(10,2) CHECK (discount_price >= 0 AND discount_price <= price),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    unit VARCHAR(50) NOT NULL DEFAULT 'piece' CHECK (unit IN ('kg', 'bunch', 'piece', 'bouquet', 'garland', 'pack', 'stem')),
    image TEXT NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT false,
    availability BOOLEAN NOT NULL DEFAULT true,
    sku VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- 4. PRODUCT IMAGES TABLE
-- ====================================================================
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 5. INVENTORY TABLE
-- ====================================================================
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity >= 0),
    supplier_name VARCHAR(150),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_inventory_updated_at
BEFORE UPDATE ON inventory
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- 6. CART TABLE
-- ====================================================================
CREATE TABLE cart (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_cart_updated_at
BEFORE UPDATE ON cart
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- 7. CART ITEMS TABLE
-- ====================================================================
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (cart_id, product_id)
);

CREATE TRIGGER set_cart_items_updated_at
BEFORE UPDATE ON cart_items
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- 8. ORDERS TABLE
-- ====================================================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    discount_amount NUMERIC(10,2) DEFAULT 0 CHECK (discount_amount >= 0),
    delivery_fee NUMERIC(10,2) DEFAULT 0 CHECK (delivery_fee >= 0),
    final_amount NUMERIC(10,2) NOT NULL CHECK (final_amount >= 0),
    shipping_address TEXT NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_state VARCHAR(100) NOT NULL,
    shipping_pincode VARCHAR(20) NOT NULL,
    shipping_phone VARCHAR(20) NOT NULL,
    order_status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
    payment_status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    delivery_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- 9. ORDER ITEMS TABLE
-- ====================================================================
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(200) NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
    quantity INT NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0)
);

-- ====================================================================
-- 10. PAYMENTS TABLE
-- ====================================================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('upi', 'razorpay', 'cod', 'card', 'netbanking')),
    transaction_id VARCHAR(150),
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    payment_status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'success', 'failed', 'refunded')),
    payment_response JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 11. REVIEWS TABLE
-- ====================================================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    verified_purchase BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (product_id, user_id)
);

CREATE TRIGGER set_reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- 12. WISHLIST TABLE
-- ====================================================================
CREATE TABLE wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, product_id)
);

-- ====================================================================
-- 13. COUPONS TABLE
-- ====================================================================
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value NUMERIC(10,2) NOT NULL CHECK (discount_value > 0),
    min_order_amount NUMERIC(10,2) DEFAULT 0,
    max_discount_amount NUMERIC(10,2),
    valid_from TIMESTAMPTZ NOT NULL,
    valid_until TIMESTAMPTZ NOT NULL,
    usage_limit INT,
    used_count INT DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 14. CONTACT MESSAGES TABLE
-- ====================================================================
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 15. NOTIFICATIONS TABLE
-- ====================================================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('order', 'reminder', 'promo', 'system')),
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 16. FOLLOW-UP REMINDERS TABLE
-- ====================================================================
CREATE TABLE followup_reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reminder_type VARCHAR(50) NOT NULL CHECK (reminder_type IN (
        'birthday',
        'anniversary',
        'festival',
        'wedding',
        'corporate_event',
        'ganesh_festival'
    )),
    event_name VARCHAR(150) NOT NULL,
    event_date DATE NOT NULL,
    notify_days_before INT NOT NULL DEFAULT 3 CHECK (notify_days_before >= 1),
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_followup_reminders_updated_at
BEFORE UPDATE ON followup_reminders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- 17. BANNER TABLE
-- ====================================================================
CREATE TABLE banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(255),
    image_url TEXT NOT NULL,
    target_link VARCHAR(255),
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 18. ADMIN TABLE
-- ====================================================================
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    permissions JSONB NOT NULL DEFAULT '{"all": true}',
    department VARCHAR(100) DEFAULT 'Operations',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- INDEXES FOR OPTIMAL PERFORMANCE
-- ====================================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_cart_items_cart ON cart_items(cart_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_wishlist_user ON wishlist(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_reminders_user_date ON followup_reminders(user_id, event_date);

-- ====================================================================
-- SEED DATA (Categories & 25 Flower Products)
-- ====================================================================

-- Insert Categories
INSERT INTO categories (id, name, slug, description, image_url) VALUES
('11111111-1111-1111-1111-111111111111', 'Festival Flowers & Garlands', 'festival-flowers-garlands', 'Fresh dawn-plucked marigolds, lotus, and sacred blooms for Bappa & deity poojas.', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784737738/a02ef13e-4e9f-4fce-a726-91614f72baf4.png'),
('22222222-2222-2222-2222-222222222222', 'Roses & Classic Blooms', 'roses-classic-blooms', 'Premium fragrant long-stem roses in vivid colors for gifting & expressions.', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png'),
('33333333-3333-3333-3333-333333333333', 'Exotic & Luxury Flowers', 'exotic-luxury-flowers', 'Lilies, Orchids, Tulips, and Hydrangeas for luxury decor and grand events.', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png'),
('44444444-4444-4444-4444-444444444444', 'Loose Petals & Fillers', 'loose-petals-fillers', 'Aromatic loose rose petals, eucalyptus leaves, and baby''s breath for rangolis.', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png');

-- Insert 25 Products
INSERT INTO products 
(id, category_id, name, slug, botanical_name, short_description, long_description, price, discount_price, stock_quantity, unit, image, featured, availability, sku) 
VALUES

-- 1. Orange Marigold
('a0010000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 
 'Orange Marigold', 'orange-marigold', 'Tagetes erecta', 
 'Vibrant dawn-picked orange marigolds for garlands and mandap decor.', 
 'Hand-picked before sunrise from growers in Pune. Essential for Ganesh Chaturthi, Diwali, and traditional Maharashtrian weddings.', 
 120.00, 100.00, 500, 'kg', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png', true, true, 'FLW-MRG-ORG-01'),

-- 2. Yellow Marigold
('a0010000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 
 'Yellow Marigold', 'yellow-marigold', 'Tagetes erecta', 
 'Bright sunshine yellow marigold blooms for torans and altar offerings.', 
 'Fresh, thick-petaled yellow marigolds that remain fresh for hours. Direct from farm to mandap.', 
 110.00, 90.00, 450, 'kg', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png', true, true, 'FLW-MRG-YEL-02'),

-- 3. White Marigold
('a0010000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 
 'White Marigold', 'white-marigold', 'Tagetes erecta', 
 'Rare vanilla white marigolds adding elegant contrast to floral arrangements.', 
 'Soft white marigolds harvested daily. Ideal for boutique garlands, contrast torans, and temple altars.', 
 150.00, 130.00, 200, 'kg', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png', false, true, 'FLW-MRG-WHT-03'),

-- 4. French Marigold
('a0010000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 
 'French Marigold', 'french-marigold', 'Tagetes patula', 
 'Compact, multi-hued orange-red velvet marigolds.', 
 'Aromatic French marigolds featuring dual-tone red and bronze petals. Perfect for intricate flower carpet rangolis.', 
 140.00, 120.00, 300, 'kg', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png', false, true, 'FLW-MRG-FRN-04'),

-- 5. Red Rose
('a0010000-0000-0000-0000-000000000005', '22222222-2222-2222-2222-222222222222', 
 'Red Rose', 'red-rose', 'Rosa rubiginosa', 
 'Deep crimson red roses with long sturdy stems.', 
 'Classic Dutch red roses plucked at perfect bud stage for maximum vase life. Ideal for bouquets and romance.', 
 25.00, 20.00, 600, 'stem', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png', true, true, 'FLW-ROS-RED-05'),

-- 6. White Rose
('a0010000-0000-0000-0000-000000000006', '22222222-2222-2222-2222-222222222222', 
 'White Rose', 'white-rose', 'Rosa alba', 
 'Pure ivory white roses symbolising purity and grace.', 
 'Pristine white stem roses ideal for bridal bouquets, sympathy offerings, and serene stage decorations.', 
 25.00, 22.00, 400, 'stem', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png', false, true, 'FLW-ROS-WHT-06'),

-- 7. Pink Rose
('a0010000-0000-0000-0000-000000000007', '22222222-2222-2222-2222-222222222222', 
 'Pink Rose', 'pink-rose', 'Rosa chinensis', 
 'Blush pink soft roses for birthdays and congratulations.', 
 'Delicate pink roses boasting sweet natural fragrance. Perfect for table arrangements and gifting.', 
 25.00, 20.00, 450, 'stem', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png', false, true, 'FLW-ROS-PNK-07'),

-- 8. Yellow Rose
('a0010000-0000-0000-0000-000000000008', '22222222-2222-2222-2222-222222222222', 
 'Yellow Rose', 'yellow-rose', 'Rosa foetida', 
 'Radiant golden yellow roses symbolizing friendship & joy.', 
 'Cheerful yellow roses grown in polyhouses near Polyhouse Talegaon. Brightens up any space instantly.', 
 25.00, 20.00, 350, 'stem', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png', false, true, 'FLW-ROS-YEL-08'),

-- 9. Sunflower
('a0010000-0000-0000-0000-000000000009', '33333333-3333-3333-3333-333333333333', 
 'Sunflower', 'sunflower', 'Helianthus annuus', 
 'Large golden yellow sunflowers with dark central discs.', 
 'Farm-fresh sunflowers bringing warmth and positivity. Great centerpiece stem for vase arrangements.', 
 45.00, 40.00, 250, 'stem', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png', true, true, 'FLW-SNF-YEL-09'),

-- 10. Gerbera
('a0010000-0000-0000-0000-000000000010', '33333333-3333-3333-3333-333333333333', 
 'Gerbera', 'gerbera', 'Gerbera jamesonii', 
 'Vibrant multi-color gerbera daisies for event backdrops.', 
 'Long-lasting premium gerberas available in red, pink, orange, and yellow. Highly preferred for corporate stages.', 
 18.00, 15.00, 700, 'stem', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png', false, true, 'FLW-GRB-MXD-10'),

-- 11. White Daisy
('a0010000-0000-0000-0000-000000000011', '33333333-3333-3333-3333-333333333333', 
 'White Daisy', 'white-daisy', 'Bellis perennis', 
 'Cute white petal daisies with bright yellow centers.', 
 'Charming white daisies adding a rustic wildflower charm to hand-tied bouquets and wreaths.', 
 120.00, 100.00, 300, 'bunch', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png', false, true, 'FLW-DSY-WHT-11'),

-- 12. Baby's Breath
('a0010000-0000-0000-0000-000000000012', '44444444-4444-4444-4444-444444444444', 
 'Baby''s Breath', 'babys-breath', 'Gypsophila paniculata', 
 'Cloud-like tiny white delicate filler blooms.', 
 'Essential flower filler for bouquets, wedding arches, hair accessories, and elegant table runners.', 
 180.00, 160.00, 200, 'bunch', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png', true, true, 'FLW-GYP-WHT-12'),

-- 13. Jasmine (Mogra)
('a0010000-0000-0000-0000-000000000013', '11111111-1111-1111-1111-111111111111', 
 'Jasmine (Mogra)', 'jasmine-mogra', 'Jasminum officinale', 
 'Intensely fragrant white Mogra buds for gajras & pooja.', 
 'Freshly plucked sunrise Mogra buds. Fills the atmosphere with mesmerizing traditional fragrance.', 
 450.00, 400.00, 150, 'kg', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png', true, true, 'FLW-JSM-MOG-13'),

-- 14. Lotus
('a0010000-0000-0000-0000-000000000014', '11111111-1111-1111-1111-111111111111', 
 'Pink Sacred Lotus', 'pink-sacred-lotus', 'Nelumbo nucifera', 
 'Sacred pink lotus stems for Goddess Laxmi & Ganpati sthapana.', 
 'Fresh pond-plucked pink lotus with long stem. Symbol of spiritual purity and abundance for grand poojas.', 
 40.00, 35.00, 180, 'piece', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png', true, true, 'FLW-LTS-PNK-14'),

-- 15. Lily
('a0010000-0000-0000-0000-000000000015', '33333333-3333-3333-3333-333333333333', 
 'Asiatic White Lily', 'asiatic-white-lily', 'Lilium candidum', 
 'Majestic multi-bloom lily stems with heavenly aroma.', 
 'Premium Oriental/Asiatic white lily stems featuring 3-5 openable buds per stem. Long vase life of up to 10 days.', 
 90.00, 80.00, 220, 'stem', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png', true, true, 'FLW-LLY-WHT-15'),

-- 16. Carnation
('a0010000-0000-0000-0000-000000000016', '22222222-2222-2222-2222-222222222222', 
 'Pink Carnation', 'pink-carnation', 'Dianthus caryophyllus', 
 'Ruffled pink carnation blooms that stay fresh over a week.', 
 'Durable, beautiful pink carnations. Resistant to wilting and excellent for long-lasting table centerpieces.', 
 22.00, 18.00, 500, 'stem', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png', false, true, 'FLW-CRN-PNK-16'),

-- 17. Orchid
('a0010000-0000-0000-0000-000000000017', '33333333-3333-3333-3333-333333333333', 
 'Purple Dendrobium Orchid', 'purple-dendrobium-orchid', 'Dendrobium hybrid', 
 'Exotic purple exotic orchid sticks for luxury arrangements.', 
 'Exquisite purple Thai orchids with velvety texture. Perfect for hotel decor, VIP bouquets, and modern floral art.', 
 35.00, 30.00, 300, 'stem', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png', true, true, 'FLW-ORC-PRP-17'),

-- 18. Rajnigandha (Tuberose)
('a0010000-0000-0000-0000-000000000018', '11111111-1111-1111-1111-111111111111', 
 'Rajnigandha (Tuberose)', 'rajnigandha-tuberose', 'Polianthes tuberosa', 
 'Fragrant white tuberose spikes for wedding garlands & vases.', 
 'Heavily scented white flower spikes. Highly popular for Maharashtrian wedding decor and venue entrances.', 
 280.00, 250.00, 250, 'kg', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png', true, true, 'FLW-RJN-WHT-18'),

-- 19. Chrysanthemum (Sevanti)
('a0010000-0000-0000-0000-000000000019', '11111111-1111-1111-1111-111111111111', 
 'Yellow Sevanti (Chrysanthemum)', 'yellow-sevanti-chrysanthemum', 'Chrysanthemum morifolium', 
 'Dense yellow Sevanti blooms for festive floral carpets.', 
 'Fresh yellow Chrysanthemum blooms plucked at peak freshness. Stays vibrant for traditional home poojas.', 
 130.00, 110.00, 400, 'kg', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png', false, true, 'FLW-CHR-YEL-19'),

-- 20. Aster
('a0010000-0000-0000-0000-000000000020', '33333333-3333-3333-3333-333333333333', 
 'Purple Aster', 'purple-aster', 'Aster amellus', 
 'Star-shaped purple daisy-like filler blooms.', 
 'Add rich violet tones to your bouquets with fresh purple Aster bunches direct from grower farms.', 
 90.00, 75.00, 280, 'bunch', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png', false, true, 'FLW-AST-PRP-20'),

-- 21. Hydrangea
('a0010000-0000-0000-0000-000000000021', '33333333-3333-3333-3333-333333333333', 
 'Blue Hydrangea Bloom', 'blue-hydrangea-bloom', 'Hydrangea macrophylla', 
 'Voluminous soft blue spherical flower head.', 
 'Luxurious blue hydrangea stem with plush petaled globe head. Ideal centerpiece flower for high-end events.', 
 180.00, 150.00, 120, 'stem', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png', true, true, 'FLW-HDR-BLU-21'),

-- 22. Tulip
('a0010000-0000-0000-0000-000000000022', '33333333-3333-3333-3333-333333333333', 
 'Dutch Red Tulip', 'dutch-red-tulip', 'Tulipa', 
 'Sleek cup-shaped Dutch red tulips.', 
 'Imported quality red tulips kept in cold chain storage. Premium choice for romantic and corporate gift boxes.', 
 120.00, 100.00, 150, 'stem', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png', true, true, 'FLW-TLP-RED-22'),

-- 23. Lavender
('a0010000-0000-0000-0000-000000000023', '44444444-4444-4444-4444-444444444444', 
 'French Lavender Bunch', 'french-lavender-bunch', 'Lavandula angustifolia', 
 'Fragrant purple lavender stems with calming scent.', 
 'Aromatic fresh lavender stems suitable for vase display, room fragrance, and aromatherapy drying.', 
 220.00, 190.00, 180, 'bunch', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png', false, true, 'FLW-LVD-PRP-23'),

-- 24. Eucalyptus Leaves
('a0010000-0000-0000-0000-000000000024', '44444444-4444-4444-4444-444444444444', 
 'Fresh Eucalyptus Foliage', 'fresh-eucalyptus-foliage', 'Eucalyptus globulus', 
 'Silver-green aromatic greenery filler stems.', 
 'Fresh silver-dollar eucalyptus branches providing structural height and natural herbal aroma to floral arrangements.', 
 110.00, 90.00, 300, 'bunch', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png', false, true, 'FLW-EUC-GRN-24'),

-- 25. Rose Petals
('a0010000-0000-0000-0000-000000000025', '44444444-4444-4444-4444-444444444444', 
 'Rose Petals Shower Pack', 'rose-petals-shower-pack', 'Rosa hybrid', 
 'Fresh fragrant red & pink rose petals for shower & rangoli.', 
 'Dawn-plucked fresh rose petals packed carefully. Essential for welcoming Bappa, bridal pathways, and scented rangolis.', 
 400.00, 350.00, 350, 'kg', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png', true, true, 'FLW-PET-RED-25');

-- Sample User & Admin
INSERT INTO users (id, full_name, email, phone, password_hash, role, address, city, state, pincode) VALUES
('u0010000-0000-0000-0000-000000000001', 'Pushpangan Admin', 'admin@pushpangan.in', '+91 73043 30409', '$2a$12$eImiTXuWVxfM37uY4JANjOQ.g.uCgTfK7V5i5E/2q6c2X1g4VwNKO', 'admin', 'Wholesale Flower Market', 'Pune', 'Maharashtra', '411002'),
('u0020000-0000-0000-0000-000000000002', 'Aarav Sharma', 'aarav@example.com', '+91 98765 43210', '$2a$12$eImiTXuWVxfM37uY4JANjOQ.g.uCgTfK7V5i5E/2q6c2X1g4VwNKO', 'customer', 'Flat 402, Sunshine Heights, FC Road', 'Pune', 'Maharashtra', '411004');

INSERT INTO admins (id, user_id, permissions, department) VALUES
('d0010000-0000-0000-0000-000000000001', 'u0010000-0000-0000-0000-000000000001', '{"all": true, "inventory": true, "orders": true}', 'Management');

-- Sample Follow-up Reminders (Ganesh Festival, Birthday, Wedding)
INSERT INTO followup_reminders (user_id, reminder_type, event_name, event_date, notify_days_before, notes) VALUES
('u0020000-0000-0000-0000-000000000002', 'ganesh_festival', 'Ganesh Chaturthi Bappa Sthapana 2026', '2026-09-14', 5, 'Pre-book 10-day marigold garlands, lotus stems, and 21 red hibiscus set.'),
('u0020000-0000-0000-0000-000000000002', 'birthday', 'Wife''s Birthday Floral Surprise', '2026-10-20', 3, 'Order Asiatic White Lilies and Dutch Red Roses bouquet.');

-- Sample Coupon
INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, valid_from, valid_until, usage_limit, is_active) VALUES
('BAPPA100', 'fixed', 100.00, 500.00, NOW(), '2026-12-31 23:59:59+00', 1000, true),
('PUSHP20', 'percentage', 20.00, 1000.00, NOW(), '2026-12-31 23:59:59+00', 500, true);

-- Sample Banner
INSERT INTO banners (title, subtitle, image_url, target_link, display_order, is_active) VALUES
('Ganesh Chaturthi Grand Special', 'Pre-book dawn-plucked fresh blooms for Bappa', 'https://res.cloudinary.com/r1o7fosa/image/upload/v1784737738/a02ef13e-4e9f-4fce-a726-91614f72baf4.png', '/shop', 1, true);
