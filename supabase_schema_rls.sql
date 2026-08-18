-- ====================================================================
-- PUSHPANGAN SUPABASE BACKEND SCHEMA, RLS POLICIES & TRIGGERS
-- ====================================================================
-- Execute this script in the Supabase SQL Editor.

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE followup_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- ====================================================================
-- RLS POLICIES
-- ====================================================================

-- 1. Products & Categories & Banners: Public Read, Admin Write
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Admin Write Products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Admin Write Categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Public Read Banners" ON banners FOR SELECT USING (true);
CREATE POLICY "Admin Write Banners" ON banners FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- 2. Users: Read/Update own profile, Admin read all
CREATE POLICY "Users read own profile" ON users FOR SELECT USING (
  auth.uid() = id OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert self" ON users FOR INSERT WITH CHECK (true);

-- 3. Cart & Cart Items: Users manage their own cart
CREATE POLICY "Users manage own cart" ON cart FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own cart items" ON cart_items FOR ALL USING (
  EXISTS (SELECT 1 FROM cart WHERE id = cart_items.cart_id AND user_id = auth.uid())
);

-- 4. Orders & Order Items: Users view own orders, Admin manages all
CREATE POLICY "Users view own orders" ON orders FOR SELECT USING (
  auth.uid() = user_id OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Anyone create order" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin update orders" ON orders FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Users view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE id = order_items.order_id AND (user_id = auth.uid() OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')))
);
CREATE POLICY "Anyone insert order items" ON order_items FOR INSERT WITH CHECK (true);

-- 5. Payments: User view own payment, Public insert
CREATE POLICY "Users view own payment" ON payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE id = payments.order_id AND (user_id = auth.uid() OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')))
);
CREATE POLICY "Anyone insert payment" ON payments FOR INSERT WITH CHECK (true);

-- 6. Wishlist & Reminders: User manages own
CREATE POLICY "Users manage own wishlist" ON wishlist FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own reminders" ON followup_reminders FOR ALL USING (auth.uid() = user_id);

-- 7. Reviews: Public read, Authenticated write
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users write reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own review" ON reviews FOR UPDATE USING (auth.uid() = user_id);

-- 8. Contact Messages: Public insert, Admin read
CREATE POLICY "Public insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read contact messages" ON contact_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- 9. Coupons & Admin table: Public read active coupons, Admin manage
CREATE POLICY "Public read active coupons" ON coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Admin manage coupons" ON coupons FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- ====================================================================
-- SUPABASE AUTH AUTO-SYNC TRIGGER
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email, role, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Customer'),
    NEW.email,
    'customer',
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================================================
-- STORAGE BUCKETS SETUP
-- ====================================================================
INSERT INTO storage.buckets (id, name, public) VALUES 
('product-images', 'product-images', true),
('category-images', 'category-images', true),
('banner-images', 'banner-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access Storage Product Images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Authenticated Upload Storage Product Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
