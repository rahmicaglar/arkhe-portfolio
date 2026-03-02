-- ============================================================
-- ARKHE — Supabase/PostgreSQL Veritabanı Şeması
-- Supabase Dashboard > SQL Editor'da çalıştır
-- ============================================================

-- === ADMIN KULLANICI TABLOSU ===
CREATE TABLE IF NOT EXISTS admins (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- === KATEGORİLER TABLOSU ===
CREATE TABLE IF NOT EXISTS categories (
  id    SERIAL PRIMARY KEY,
  name  TEXT UNIQUE NOT NULL,
  slug  TEXT UNIQUE NOT NULL
);

-- === ETİKETLER TABLOSU ===
CREATE TABLE IF NOT EXISTS tags (
  id    SERIAL PRIMARY KEY,
  name  TEXT UNIQUE NOT NULL,
  slug  TEXT UNIQUE NOT NULL
);

-- === BLOG YAZILARI TABLOSU ===
CREATE TABLE IF NOT EXISTS posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  excerpt      TEXT,
  content      TEXT NOT NULL,
  cover_image  TEXT,
  category_id  INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  published    BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- === POST-TAG İLİŞKİ TABLOSU (many-to-many) ===
CREATE TABLE IF NOT EXISTS post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id  INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- === OTOMATIK updated_at TETİKLEYİCİ ===
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS posts_updated_at ON posts;
CREATE TRIGGER posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SEED DATA — Örnek kategoriler ve etiketler
-- ============================================================

INSERT INTO categories (name, slug) VALUES
  ('Backend', 'backend'),
  ('Frontend', 'frontend'),
  ('Güvenlik', 'guvenlik'),
  ('Sistem Tasarımı', 'sistem-tasarimi'),
  ('DevOps', 'devops')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tags (name, slug) VALUES
  ('TypeScript', 'typescript'),
  ('Node.js', 'nodejs'),
  ('JWT', 'jwt'),
  ('Authentication', 'authentication'),
  ('Security', 'security'),
  ('React', 'react'),
  ('Next.js', 'nextjs'),
  ('PostgreSQL', 'postgresql'),
  ('Docker', 'docker'),
  ('API', 'api')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- MOCK DATA — Teknik blog yazısı
-- ============================================================

INSERT INTO posts (title, slug, excerpt, content, published) VALUES (
  'JWT ile Güvenli Kullanıcı Yönetimi: Stateless Auth''un Gücü',
  'jwt-ile-guvenli-kullanici-yonetimi',
  'JSON Web Token (JWT) tabanlı kimlik doğrulama sistemlerinin derinlemesine incelenmesi. Stateless mimarinin avantajları, güvenlik riskleri ve production''da en iyi pratikler.',
  E'# JWT ile Güvenli Kullanıcı Yönetimi: Stateless Auth''un Gücü\n\nModern web uygulamalarında kimlik doğrulama (authentication) sistemi, güvenliğin bel kemiğidir. Bu yazıda **JSON Web Token (JWT)** tabanlı stateless authentication''ın derinliklerine ineceğiz.\n\n## JWT Nedir?\n\nJWT (JSON Web Token), iki taraf arasında güvenli bilgi aktarımı için kullanılan açık bir standarttır (RFC 7519). Üç parçadan oluşur:\n\n```\nheader.payload.signature\n```\n\n- **Header**: Algoritma ve token türü\n- **Payload**: Claims (iddialar) — kullanıcı verisi\n- **Signature**: Doğrulama imzası\n\n## Neden Stateless?\n\nGeleneksel **session-based** auth''da sunucu her kullanıcı için bir session kaydı tutar. Bu yaklaşımın sorunları:\n\n- Ölçekleme zorluğu (yatay ölçeklemede session paylaşımı)\n- Redis gibi harici depolama gereksinimi\n- Durum yönetimi karmaşıklığı\n\n**JWT ile stateless yaklaşımda** ise:\n\n```typescript\n// Token doğrulama — veritabanı sorgusu YOK\nimport jwt from ''jsonwebtoken'';\n\nfunction verifyToken(token: string): JwtPayload | null {\n  try {\n    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;\n  } catch {\n    return null; // Süresi dolmuş veya geçersiz\n  }\n}\n```\n\nSunucu sadece imzayı doğrular. Veritabanı gerekmez!\n\n## Güvenli Token Saklama\n\n> ⚠️ **localStorage KULLANMA!** XSS saldırılarına karşı savunmasız.\n\nEn güvenli yöntem: **HTTP-only Cookie**\n\n```typescript\n// Next.js API Route — token''ı http-only cookie''ye set et\nresponse.cookies.set(''auth_token'', token, {\n  httpOnly: true,   // JavaScript erişemez — XSS koruması\n  secure: true,     // Sadece HTTPS\n  sameSite: ''strict'', // CSRF koruması\n  maxAge: 60 * 60 * 24 * 7, // 7 gün\n});\n```\n\n## Payload''a Ne Koymalı?\n\n```typescript\ninterface JwtPayload {\n  sub: string;    // Kullanıcı ID\n  email: string;  // E-posta\n  role: ''user'' | ''admin''; // Yetki seviyesi\n  iat: number;    // Oluşturma zamanı\n  exp: number;    // Süre sonu\n}\n```\n\n⚡ **Altın kural**: Payload''a hassas bilgi (şifre, kredi kartı) ASLA koyma. JWT decode edilebilir, sadece imza doğrulanır.\n\n## Token Yenileme Stratejisi\n\nProduction''da iki token stratejisi kullan:\n\n1. **Access Token**: Kısa ömürlü (15 dk), her istekte kullanılır\n2. **Refresh Token**: Uzun ömürlü (7-30 gün), yeni access token almak için\n\n```typescript\n// Refresh flow\nasync function refreshAccessToken(refreshToken: string) {\n  const payload = verifyToken(refreshToken);\n  if (!payload) throw new Error(''Invalid refresh token'');\n  \n  // Yeni access token üret\n  return signToken({ \n    sub: payload.sub, \n    email: payload.email,\n    role: payload.role \n  }, ''15m'');\n}\n```\n\n## Middleware ile Koruma\n\nNext.js''de tüm korumalı route''ları tek yerden yönet:\n\n```typescript\n// middleware.ts\nimport { NextResponse } from ''next/server'';\nimport type { NextRequest } from ''next/server'';\n\nexport function middleware(request: NextRequest) {\n  const token = request.cookies.get(''auth_token'')?.value;\n  \n  if (!token) {\n    return NextResponse.redirect(new URL(''/login'', request.url));\n  }\n  \n  // Token doğrulama burada (edge runtime''da)\n  return NextResponse.next();\n}\n\nexport const config = {\n  matcher: [''/admin/:path*'', ''/dashboard/:path*''],\n};\n```\n\n## Sonuç\n\nJWT tabanlı stateless auth, doğru uygulandığında güçlü ve ölçeklenebilir bir güvenlik katmanı sağlar. Temel kurallar:\n\n1. ✅ HTTP-only cookie kullan\n2. ✅ Kısa access token + uzun refresh token\n3. ✅ Payload''ı minimal tut\n4. ✅ HTTPS zorunlu kıl\n5. ❌ localStorage''ı unutkun\n\nKod temiz, sistem güvenli, mimari sağlam. İşte arkhe felsefesi bu.',
  true
);

-- Mock yazıya etiket ekle (JWT ve Security etiketleri)
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.slug = 'jwt-ile-guvenli-kullanici-yonetimi'
  AND t.slug IN ('jwt', 'authentication', 'security', 'nodejs', 'typescript');

-- ============================================================
-- ADMIN KULLANICI (şifre: Arkhe2026!)
-- bcrypt hash — cost factor 12
-- ŞİFREYİ BURADAN DEĞİŞTİR!
-- ============================================================
-- Aşağıdaki hash "Arkhe2026!" şifresine aittir.
-- Değiştirmek için: https://bcrypt-generator.com
INSERT INTO admins (email, password_hash) VALUES (
  'admin@arkhe.dev',
  '$2a$12$LKS0D9gfFc3PKCiTf1zGreJW51EqNHxcPaJXkY2j3hMSoFEa3P.8i'
) ON CONFLICT (email) DO NOTHING;
