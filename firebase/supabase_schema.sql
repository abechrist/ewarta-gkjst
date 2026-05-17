-- Supabase PostgreSQL Schema untuk eWARTA
-- Created: 2026-05-17

-- 1. Warta (Berita Mingguan)
CREATE TABLE warta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tema VARCHAR(255) NOT NULL,
  ayat VARCHAR(255) NOT NULL,
  renungan TEXT NOT NULL,
  pdf_url VARCHAR(500),
  minggu_liturgi VARCHAR(100),
  warna_liturgi VARCHAR(50),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Jadwal Ibadah
CREATE TABLE jadwal_ibadah (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tanggal DATE NOT NULL,
  waktu TIME NOT NULL,
  bahasa VARCHAR(50) NOT NULL, -- Indonesia, Jawa
  tempat VARCHAR(100) NOT NULL, -- Induk, Nyamat
  wilayah VARCHAR(100) NOT NULL, -- Wilayah I, II, III, IV, Pep. Nyamat
  pengkotbah VARCHAR(255) NOT NULL,
  organis VARCHAR(255) NOT NULL,
  singer TEXT[], -- Array of names
  opr_lcd VARCHAR(255),
  majelis VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Jadwal Sekolah Minggu
CREATE TABLE jadwal_sm (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tanggal DATE NOT NULL,
  mc VARCHAR(255) NOT NULL,
  musik VARCHAR(255) NOT NULL,
  kelas_balita VARCHAR(255),
  kelas_kecil VARCHAR(255),
  kelas_besar VARCHAR(255),
  kelas_remaja VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Pengumuman
CREATE TABLE pengumuman (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul VARCHAR(255) NOT NULL,
  isi TEXT NOT NULL,
  tanggal_mulai DATE NOT NULL,
  tanggal_selesai DATE NOT NULL,
  kategori VARCHAR(50) NOT NULL, -- ibadah, komisi, umum, khusus
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Bacaan Harian (Leksionari)
CREATE TABLE bacaan_harian (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tanggal DATE NOT NULL UNIQUE,
  bacaan_1 VARCHAR(255) NOT NULL,
  mazmur VARCHAR(255) NOT NULL,
  bacaan_2 VARCHAR(255) NOT NULL,
  injil VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. Ulang Tahun Jemaat
CREATE TABLE ulang_tahun (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama VARCHAR(255) NOT NULL,
  tanggal VARCHAR(10) NOT NULL, -- format: dd-MM (tanpa tahun)
  wilayah VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. Pokok Doa
CREATE TABLE doa_pokok (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  isi TEXT NOT NULL,
  kategori VARCHAR(50) NOT NULL, -- bangsa, jemaat, gereja
  periode_mulai DATE NOT NULL,
  periode_selesai DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. Laporan Persembahan
CREATE TABLE persembahan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tanggal DATE NOT NULL,
  kantung_merah DECIMAL(12, 2) DEFAULT 0,
  kantung_kuning DECIMAL(12, 2) DEFAULT 0,
  bulanan DECIMAL(12, 2) DEFAULT 0,
  pembangunan DECIMAL(12, 2) DEFAULT 0,
  gota DECIMAL(12, 2) DEFAULT 0,
  total DECIMAL(12, 2) DEFAULT 0,
  rincian_wilayah JSONB, -- JSON object untuk rincian per wilayah
  created_at TIMESTAMP DEFAULT NOW()
);

-- 9. Warga yang Perlu Didoakan
CREATE TABLE warga_doakan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama VARCHAR(255) NOT NULL,
  wilayah VARCHAR(100),
  keterangan TEXT,
  aktif BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes untuk performa
CREATE INDEX idx_warta_published ON warta(published);
CREATE INDEX idx_warta_tanggal ON warta(created_at DESC);
CREATE INDEX idx_jadwal_ibadah_tanggal ON jadwal_ibadah(tanggal);
CREATE INDEX idx_jadwal_ibadah_wilayah ON jadwal_ibadah(wilayah);
CREATE INDEX idx_pengumuman_published ON pengumuman(published);
CREATE INDEX idx_pengumuman_tanggal ON pengumuman(tanggal_mulai);
CREATE INDEX idx_bacaan_harian_tanggal ON bacaan_harian(tanggal);
CREATE INDEX idx_ulang_tahun_tanggal ON ulang_tahun(tanggal);
CREATE INDEX idx_doa_pokok_periode ON doa_pokok(periode_mulai, periode_selesai);
CREATE INDEX idx_persembahan_tanggal ON persembahan(tanggal DESC);
CREATE INDEX idx_warga_doakan_aktif ON warga_doakan(aktif);

-- Enable RLS (Row Level Security)
ALTER TABLE warta ENABLE ROW LEVEL SECURITY;
ALTER TABLE jadwal_ibadah ENABLE ROW LEVEL SECURITY;
ALTER TABLE jadwal_sm ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengumuman ENABLE ROW LEVEL SECURITY;
ALTER TABLE bacaan_harian ENABLE ROW LEVEL SECURITY;
ALTER TABLE ulang_tahun ENABLE ROW LEVEL SECURITY;
ALTER TABLE doa_pokok ENABLE ROW LEVEL SECURITY;
ALTER TABLE persembahan ENABLE ROW LEVEL SECURITY;
ALTER TABLE warga_doakan ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read, authenticated write
CREATE POLICY "Enable read access for all users" ON warta FOR SELECT USING (true);
CREATE POLICY "Enable write access for authenticated users" ON warta FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON warta FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON warta FOR DELETE USING (auth.role() = 'authenticated');

-- Apply same policies to other tables
CREATE POLICY "Enable read access for all users" ON jadwal_ibadah FOR SELECT USING (true);
CREATE POLICY "Enable write access for authenticated users" ON jadwal_ibadah FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON jadwal_ibadah FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON jadwal_ibadah FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON jadwal_sm FOR SELECT USING (true);
CREATE POLICY "Enable write access for authenticated users" ON jadwal_sm FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON jadwal_sm FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON jadwal_sm FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON pengumuman FOR SELECT USING (true);
CREATE POLICY "Enable write access for authenticated users" ON pengumuman FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON pengumuman FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON pengumuman FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON bacaan_harian FOR SELECT USING (true);
CREATE POLICY "Enable write access for authenticated users" ON bacaan_harian FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON bacaan_harian FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON bacaan_harian FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON ulang_tahun FOR SELECT USING (true);
CREATE POLICY "Enable write access for authenticated users" ON ulang_tahun FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON ulang_tahun FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON ulang_tahun FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON doa_pokok FOR SELECT USING (true);
CREATE POLICY "Enable write access for authenticated users" ON doa_pokok FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON doa_pokok FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON doa_pokok FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON persembahan FOR SELECT USING (true);
CREATE POLICY "Enable write access for authenticated users" ON persembahan FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON persembahan FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON persembahan FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON warga_doakan FOR SELECT USING (true);
CREATE POLICY "Enable write access for authenticated users" ON warga_doakan FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON warga_doakan FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON warga_doakan FOR DELETE USING (auth.role() = 'authenticated');
