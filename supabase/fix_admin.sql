-- Admin şifresini güncelle (Arkhe2026! — bcrypt ile doğru hash)
-- Supabase SQL Editor'da çalıştır

UPDATE admins
SET password_hash = '$2a$12$CDd5uERixGrm7SSE678c6OxqTnxMjKlitgpKm6W/0VsMekSFCi41u'
WHERE email = 'admin@arkhe.dev';

-- Eğer satır yoksa (ilk kez ekliyorsan):
INSERT INTO admins (email, password_hash)
VALUES (
  'admin@arkhe.dev',
  '$2a$12$CDd5uERixGrm7SSE678c6OxqTnxMjKlitgpKm6W/0VsMekSFCi41u'
)
ON CONFLICT (email) DO UPDATE
SET password_hash = EXCLUDED.password_hash;
