require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Upload middleware
const upload = multer({ storage: multer.memoryStorage() });

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// ===== WARTA ENDPOINTS =====
app.get('/api/warta', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM warta WHERE published = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/warta/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM warta WHERE id = $1',
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/warta', async (req, res) => {
  try {
    const { tema, ayat, renungan, pdf_url, minggu_liturgi, warna_liturgi, published } = req.body;
    const result = await pool.query(
      'INSERT INTO warta (tema, ayat, renungan, pdf_url, minggu_liturgi, warna_liturgi, published, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *',
      [tema, ayat, renungan, pdf_url, minggu_liturgi, warna_liturgi, published]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/warta/:id', async (req, res) => {
  try {
    const { tema, ayat, renungan, pdf_url, minggu_liturgi, warna_liturgi, published } = req.body;
    const result = await pool.query(
      'UPDATE warta SET tema = $1, ayat = $2, renungan = $3, pdf_url = $4, minggu_liturgi = $5, warna_liturgi = $6, published = $7, updated_at = NOW() WHERE id = $8 RETURNING *',
      [tema, ayat, renungan, pdf_url, minggu_liturgi, warna_liturgi, published, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/warta/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM warta WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== JADWAL IBADAH ENDPOINTS =====
app.get('/api/jadwal-ibadah', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM jadwal_ibadah ORDER BY tanggal ASC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/jadwal-ibadah', async (req, res) => {
  try {
    const { tanggal, waktu, bahasa, tempat, wilayah, pengkotbah, organis, singer, opr_lcd, majelis } = req.body;
    const result = await pool.query(
      'INSERT INTO jadwal_ibadah (tanggal, waktu, bahasa, tempat, wilayah, pengkotbah, organis, singer, opr_lcd, majelis, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) RETURNING *',
      [tanggal, waktu, bahasa, tempat, wilayah, pengkotbah, organis, singer, opr_lcd, majelis]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/jadwal-ibadah/:id', async (req, res) => {
  try {
    const { tanggal, waktu, bahasa, tempat, wilayah, pengkotbah, organis, singer, opr_lcd, majelis } = req.body;
    const result = await pool.query(
      'UPDATE jadwal_ibadah SET tanggal = $1, waktu = $2, bahasa = $3, tempat = $4, wilayah = $5, pengkotbah = $6, organis = $7, singer = $8, opr_lcd = $9, majelis = $10 WHERE id = $11 RETURNING *',
      [tanggal, waktu, bahasa, tempat, wilayah, pengkotbah, organis, singer, opr_lcd, majelis, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/jadwal-ibadah/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM jadwal_ibadah WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== JADWAL SM ENDPOINTS =====
app.get('/api/jadwal-sm', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM jadwal_sm ORDER BY tanggal ASC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/jadwal-sm', async (req, res) => {
  try {
    const { tanggal, mc, musik, kelas_balita, kelas_kecil, kelas_besar, kelas_remaja } = req.body;
    const result = await pool.query(
      'INSERT INTO jadwal_sm (tanggal, mc, musik, kelas_balita, kelas_kecil, kelas_besar, kelas_remaja, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *',
      [tanggal, mc, musik, kelas_balita, kelas_kecil, kelas_besar, kelas_remaja]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== PENGUMUMAN ENDPOINTS =====
app.get('/api/pengumuman', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM pengumuman WHERE published = true ORDER BY tanggal_mulai DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/pengumuman', async (req, res) => {
  try {
    const { judul, isi, tanggal_mulai, tanggal_selesai, kategori, published } = req.body;
    const result = await pool.query(
      'INSERT INTO pengumuman (judul, isi, tanggal_mulai, tanggal_selesai, kategori, published, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [judul, isi, tanggal_mulai, tanggal_selesai, kategori, published]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/pengumuman/:id', async (req, res) => {
  try {
    const { judul, isi, tanggal_mulai, tanggal_selesai, kategori, published } = req.body;
    const result = await pool.query(
      'UPDATE pengumuman SET judul = $1, isi = $2, tanggal_mulai = $3, tanggal_selesai = $4, kategori = $5, published = $6 WHERE id = $7 RETURNING *',
      [judul, isi, tanggal_mulai, tanggal_selesai, kategori, published, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/pengumuman/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM pengumuman WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== BACAAN HARIAN ENDPOINTS =====
app.get('/api/bacaan-harian', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM bacaan_harian ORDER BY tanggal ASC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bacaan-harian', async (req, res) => {
  try {
    const { tanggal, bacaan_1, mazmur, bacaan_2, injil } = req.body;
    const result = await pool.query(
      'INSERT INTO bacaan_harian (tanggal, bacaan_1, mazmur, bacaan_2, injil, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [tanggal, bacaan_1, mazmur, bacaan_2, injil]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ULANG TAHUN ENDPOINTS =====
app.get('/api/ulang-tahun', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM ulang_tahun'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ulang-tahun', async (req, res) => {
  try {
    const { nama, tanggal, wilayah } = req.body;
    const result = await pool.query(
      'INSERT INTO ulang_tahun (nama, tanggal, wilayah, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [nama, tanggal, wilayah]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== DOA POKOK ENDPOINTS =====
app.get('/api/doa-pokok', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM doa_pokok ORDER BY periode_mulai DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/doa-pokok', async (req, res) => {
  try {
    const { isi, kategori, periode_mulai, periode_selesai } = req.body;
    const result = await pool.query(
      'INSERT INTO doa_pokok (isi, kategori, periode_mulai, periode_selesai, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [isi, kategori, periode_mulai, periode_selesai]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/doa-pokok/:id', async (req, res) => {
  try {
    const { isi, kategori, periode_mulai, periode_selesai } = req.body;
    const result = await pool.query(
      'UPDATE doa_pokok SET isi = $1, kategori = $2, periode_mulai = $3, periode_selesai = $4 WHERE id = $5 RETURNING *',
      [isi, kategori, periode_mulai, periode_selesai, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/doa-pokok/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM doa_pokok WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== PERSEMBAHAN ENDPOINTS =====
app.get('/api/persembahan', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM persembahan ORDER BY tanggal DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/persembahan', async (req, res) => {
  try {
    const { tanggal, kantung_merah, kantung_kuning, bulanan, pembangunan, gota, total, rincian_wilayah } = req.body;
    const result = await pool.query(
      'INSERT INTO persembahan (tanggal, kantung_merah, kantung_kuning, bulanan, pembangunan, gota, total, rincian_wilayah, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *',
      [tanggal, kantung_merah, kantung_kuning, bulanan, pembangunan, gota, total, JSON.stringify(rincian_wilayah)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/persembahan/:id', async (req, res) => {
  try {
    const { tanggal, kantung_merah, kantung_kuning, bulanan, pembangunan, gota, total, rincian_wilayah } = req.body;
    const result = await pool.query(
      'UPDATE persembahan SET tanggal = $1, kantung_merah = $2, kantung_kuning = $3, bulanan = $4, pembangunan = $5, gota = $6, total = $7, rincian_wilayah = $8 WHERE id = $9 RETURNING *',
      [tanggal, kantung_merah, kantung_kuning, bulanan, pembangunan, gota, total, JSON.stringify(rincian_wilayah), req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/persembahan/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM persembahan WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== WARGA DOAKAN ENDPOINTS =====
app.get('/api/warga-doakan', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM warga_doakan WHERE aktif = true'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/warga-doakan', async (req, res) => {
  try {
    const { nama, wilayah, keterangan, aktif } = req.body;
    const result = await pool.query(
      'INSERT INTO warga_doakan (nama, wilayah, keterangan, aktif, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [nama, wilayah, keterangan, aktif]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/warga-doakan/:id', async (req, res) => {
  try {
    const { nama, wilayah, keterangan, aktif } = req.body;
    const result = await pool.query(
      'UPDATE warga_doakan SET nama = $1, wilayah = $2, keterangan = $3, aktif = $4 WHERE id = $5 RETURNING *',
      [nama, wilayah, keterangan, aktif, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/warga-doakan/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM warga_doakan WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
