# Rencana Pengembangan Aplikasi Warta Jemaat
# GKJ Salatiga Timur — *e-TAAT Mobile*

> **Dokumen Perencanaan v1.0**
> Tanggal: 10 Mei 2026
> Status: Draft untuk Diskusi Tim Multimedia

---

## Daftar Isi

1. [Latar Belakang](#1-latar-belakang)
2. [Visi & Tujuan Aplikasi](#2-visi--tujuan-aplikasi)
3. [Pengguna & Pemangku Kepentingan](#3-pengguna--pemangku-kepentingan)
4. [Keputusan Arsitektur](#4-keputusan-arsitektur)
5. [Fitur Aplikasi](#5-fitur-aplikasi)
6. [Struktur Database](#6-struktur-database-firestore)
7. [Alur Kerja Tim Multimedia](#7-alur-kerja-tim-multimedia)
8. [Roadmap Pengembangan](#8-roadmap-pengembangan)
9. [Struktur Project Android](#9-struktur-project-android)
10. [Teknologi & Library](#10-teknologi--library)
11. [Anggaran & Biaya Operasional](#11-anggaran--biaya-operasional)
12. [Risiko & Mitigasi](#12-risiko--mitigasi)
13. [Pertanyaan Terbuka untuk Diskusi Tim](#13-pertanyaan-terbuka-untuk-diskusi-tim)

---

## 1. Latar Belakang

GKJ Salatiga Timur saat ini menerbitkan warta jemaat mingguan bernama **e-TAAT** dalam format PDF. Warta ini berisi:

- Renungan & khotbah mingguan
- Jadwal pelayanan ibadah (pengkotbah, organis, singer, majelis per wilayah)
- Jadwal Sekolah Minggu
- Pengumuman kegiatan komisi
- Bacaan Harian Leksionari
- Menara Doa (pokok-pokok doa)
- Daftar ulang tahun jemaat
- Daftar warga yang perlu didukung doa
- Laporan persembahan & keuangan
- Informasi kontak gereja

Distribusi saat ini dilakukan melalui **WhatsApp** dalam bentuk file PDF. Meskipun efektif, pendekatan ini memiliki beberapa keterbatasan:

- Jemaat perlu scroll dan zoom PDF untuk membaca informasi tertentu
- Tidak ada notifikasi aktif untuk pengumuman mendadak
- Tidak ada fitur interaktif (reminder ibadah, bookmark doa, dll)
- Arsip warta lama sulit dicari kembali
- Tidak ada data kehadiran atau engagement yang bisa diukur

### Solusi yang Diusulkan

Membangun **aplikasi Android native** yang menjadi *pelengkap* warta PDF — bukan menggantikannya — sehingga jemaat mendapat pengalaman yang lebih kaya, sementara tim multimedia tetap bekerja dengan workflow yang familiar.

---

## 2. Visi & Tujuan Aplikasi

### Visi
> *Menghadirkan informasi jemaat GKJ Salatiga Timur secara digital, interaktif, dan mudah diakses oleh seluruh warga jemaat kapan pun dan di mana pun.*

### Tujuan Utama
- Menjadi **versi digital interaktif** dari warta jemaat e-TAAT
- Memudahkan jemaat mengakses jadwal, renungan, dan pengumuman tanpa membuka PDF
- Mengirim **notifikasi** untuk pengumuman penting dan pengingat ibadah
- Menjadi **arsip digital** seluruh edisi warta jemaat

### Yang Bukan Tujuan Aplikasi Ini
- Menggantikan PDF e-TAAT sepenuhnya
- Menjadi platform media sosial jemaat
- Mengelola database keanggotaan secara penuh (itu scope yang berbeda)

---

## 3. Pengguna & Pemangku Kepentingan

### Pengguna Akhir (Jemaat)
- **Profil**: Warga jemaat GKJ Salatiga Timur dari berbagai usia
- **Perangkat**: Mayoritas Android (estimasi 95%+ berdasarkan demografi Indonesia)
- **Kebutuhan utama**: Akses mudah ke jadwal ibadah, renungan, dan pengumuman

### Admin (Tim Multimedia)
- **Profil**: Anggota tim multimedia gereja yang familiar dengan teknologi web
- **Tanggung jawab**: Upload warta PDF mingguan + input data terstruktur melalui admin panel
- **Estimasi waktu kerja**: 15–20 menit per minggu

### Pemangku Kepentingan Lain
| Peran | Kepentingan |
|---|---|
| Pendeta (Pdt. S.B. Wismono) | Renungan & informasi pastoral tersampaikan dengan baik |
| Majelis | Jadwal pelayanan akurat dan mudah diakses |
| Komisi-komisi | Pengumuman kegiatan menjangkau lebih banyak jemaat |
| Bendahara | Laporan keuangan transparan dan mudah dibaca |

---

## 4. Keputusan Arsitektur

Berikut adalah keputusan-keputusan teknis utama yang telah disepakati:

| Aspek | Keputusan | Alasan |
|---|---|---|
| **Platform** | Android Native | Mayoritas jemaat pakai Android |
| **Bahasa** | Kotlin | Standar modern Android, dikuasai developer |
| **UI Framework** | Jetpack Compose | Produktif untuk developer solo, standar terkini |
| **Arsitektur App** | MVVM + Clean Architecture | Maintainable, testable, skalabel |
| **Backend** | Firebase | Gratis untuk skala gereja, real-time, mudah |
| **Database** | Firestore (NoSQL) | Fleksibel, real-time sync, offline support |
| **File Storage** | Firebase Storage | Untuk PDF warta tiap edisi |
| **Notifikasi** | Firebase Cloud Messaging (FCM) | Terintegrasi Firebase, gratis |
| **Auth Admin** | Firebase Authentication | Login aman untuk tim multimedia |
| **Admin Panel** | Web app sederhana | Bisa diakses tim dari browser manapun |
| **iOS** | Fase berikutnya (bukan prioritas sekarang) | Fokus Android dulu, launch lebih cepat |

### Mengapa Firebase?

Firebase dipilih karena:
- **Gratis** untuk skala komunitas gereja (Spark Plan mencakup 1GB storage, 50K read/hari)
- **Tidak perlu server sendiri** — tidak ada biaya hosting bulanan
- **Real-time** — konten yang diupload admin langsung muncul di app jemaat
- **Offline support** — Firestore bisa cache data sehingga app tetap bisa dibuka tanpa internet
- **FCM gratis** — push notification tanpa batas

---

## 5. Fitur Aplikasi

### Prioritas Fitur (berdasarkan hasil diskusi)

| Prioritas | Modul | Keterangan |
|---|---|---|
| 🥇 1 | Warta & Renungan Mingguan | Inti dari aplikasi |
| 🥈 2 | Jadwal Ibadah & Pelayanan | Informasi praktis harian |
| 🥉 3 | Notifikasi & Pengumuman | Keterjangkauan informasi |
| 4 | Laporan Keuangan & Persembahan | Transparansi gereja |

---

### 5.1 Modul Warta & Renungan

**Halaman Beranda**
- Kartu edisi warta terbaru (tema, tanggal, ayat)
- Ringkasan renungan minggu ini
- Shortcut cepat ke jadwal & pengumuman

**Halaman Warta Lengkap**
- PDF viewer untuk membaca warta edisi lengkap
- Tombol unduh PDF
- Tombol bagikan ke WhatsApp

**Halaman Renungan**
- Teks renungan terformat (bukan dari PDF)
- Ayat bacaan yang bisa di-tap untuk membuka aplikasi Alkitab
- Tombol bagikan renungan

**Arsip Warta**
- Daftar semua edisi sebelumnya
- Filter berdasarkan bulan/tahun
- Pencarian berdasarkan tema

---

### 5.2 Modul Jadwal Ibadah & Pelayanan

**Jadwal Ibadah Mingguan**
- Tabel jadwal minggu ini dan minggu depan
- Filter berdasarkan wilayah (Wilayah I, II, III, IV, Pep. Nyamat)
- Filter berdasarkan bahasa (Indonesia / Jawa)
- Informasi: waktu, tempat, pengkotbah, organis, majelis

**Jadwal Sekolah Minggu**
- Tabel jadwal pelayan Sekolah Minggu
- Informasi per kelas (Balita, Kecil, Besar, Remaja)

**Bacaan Harian Leksionari**
- Tampilan per tanggal
- Empat kolom: Bacaan I, Mazmur, Bacaan II, Injil
- Reminder harian (jam bisa diatur pengguna)

---

### 5.3 Modul Notifikasi & Pengumuman

**Push Notification**
- Pengumuman mendadak dari admin
- Reminder ibadah minggu (Sabtu malam / Minggu pagi)
- Notifikasi ulang tahun jemaat (opsional, bisa dimatikan)

**Halaman Pengumuman**
- Daftar semua pengumuman aktif
- Kategori: Ibadah, Komisi, Umum, Kegiatan Khusus
- Tanggal berlaku pengumuman

**Kegiatan Komisi**
- Jadwal latihan koor (Adiyuswa, Ekklesia)
- Kegiatan Komisi Diakonia, Perkunjungan, Beasiswa
- Rapat-rapat majelis

---

### 5.4 Modul Komunitas & Doa

**Menara Doa**
- Pokok-pokok doa mingguan
- Fitur "sudah didoakan" (checklist pribadi)
- Reminder doa kesepakatan jam 21.00 WIB

**Ulang Tahun Jemaat**
- Daftar ulang tahun minggu ini
- Notifikasi otomatis pada hari H
- Ayat ucapan selamat

**Dukung & Doakan**
- Daftar warga yang membutuhkan dukungan doa
- Update kondisi terbaru

---

### 5.5 Modul Keuangan & Persembahan

**Laporan Persembahan Mingguan**
- Ringkasan persembahan per kategori (Kantung Merah, Kuning, Bulanan, dll)
- Total persembahan
- Rincian per wilayah

**Laporan Keuangan Periodik**
- Laporan triwulan (Januari–Maret, dst)
- Grafik penerimaan vs pengeluaran
- Rincian bidang pengeluaran

---

### 5.6 Informasi Gereja (Statis)

- Visi & Misi GKJ Salatiga Timur
- Informasi kontak (pendeta, majelis, kantor)
- Nomor rekening persembahan
- Nomor telepon per wilayah
- Tautan media sosial (YouTube, Instagram, Facebook)

---

## 6. Struktur Database Firestore

```
📁 warta/
  └── {edisiId}/
        - tanggal: Timestamp
        - tema: String
        - ayat: String              // "Yohanes 14:15-21"
        - renungan: String          // teks renungan lengkap
        - pdf_url: String           // URL Firebase Storage
        - minggu_liturgi: String    // "Minggu Paskah VI"
        - warna_liturgi: String     // "Putih"
        - published: Boolean
        - created_at: Timestamp

📁 jadwal_ibadah/
  └── {id}/
        - tanggal: Timestamp
        - waktu: String             // "07.00", "09.00"
        - bahasa: String            // "Indonesia", "Jawa"
        - tempat: String            // "Induk", "Nyamat"
        - wilayah: String           // "Wilayah I", "Wilayah II", dst
        - pengkotbah: String
        - organis: String
        - singer: List<String>
        - opr_lcd: String
        - majelis: String

📁 jadwal_sm/                       // Sekolah Minggu
  └── {id}/
        - tanggal: Timestamp
        - mc: String
        - musik: String
        - kelas_balita: String
        - kelas_kecil: String
        - kelas_besar: String
        - kelas_remaja: String

📁 pengumuman/
  └── {id}/
        - judul: String
        - isi: String
        - tanggal_mulai: Timestamp
        - tanggal_selesai: Timestamp
        - kategori: String          // "ibadah", "komisi", "umum", "khusus"
        - published: Boolean

📁 bacaan_harian/
  └── {id}/
        - tanggal: Timestamp
        - bacaan_1: String          // "Kejadian 9:8-17"
        - mazmur: String
        - bacaan_2: String
        - injil: String

📁 ulang_tahun/
  └── {id}/
        - nama: String
        - tanggal: String           // format "dd-MM" (tanpa tahun)
        - wilayah: String

📁 doa_pokok/
  └── {id}/
        - isi: String
        - kategori: String          // "bangsa", "jemaat", "gereja"
        - periode_mulai: Timestamp
        - periode_selesai: Timestamp

📁 persembahan/
  └── {edisiId}/
        - tanggal: Timestamp
        - kantung_merah: Number
        - kantung_kuning: Number
        - bulanan: Number
        - pembangunan: Number
        - gota: Number
        - total: Number
        - rincian_wilayah: Map

📁 warga_doakan/
  └── {id}/
        - nama: String
        - wilayah: String
        - keterangan: String
        - aktif: Boolean
```

---

## 7. Alur Kerja Tim Multimedia

### Workflow Mingguan (Estimasi: 15–20 menit)

```
Sabtu Malam / Minggu Pagi
         │
         ▼
1. Buka Admin Panel (browser)
         │
         ▼
2. Upload PDF warta edisi baru
   → File tersimpan di Firebase Storage
         │
         ▼
3. Isi form data terstruktur:
   - Tema & ayat minggu ini
   - Teks renungan
   - Jadwal pelayan (pengkotbah, organis, dll per sesi)
   - Jadwal Sekolah Minggu
   - Pengumuman aktif
   - Ulang tahun jemaat minggu ini
         │
         ▼
4. Klik "Publish"
   → Data tersimpan ke Firestore
   → FCM kirim push notification ke jemaat
         │
         ▼
5. Selesai ✅
   Jemaat langsung menerima notifikasi
   dan bisa membaca warta di aplikasi
```

### Pembagian Tugas Tim yang Disarankan

| Tugas | Dikerjakan Oleh |
|---|---|
| Upload PDF warta | Penanggung jawab warta PDF (sudah ada) |
| Input jadwal pelayan | Koordinator jadwal / sekretariat |
| Input pengumuman | Sekretaris majelis |
| Input laporan persembahan | Bendahara / Tim keuangan |
| Publish & kirim notifikasi | Admin aplikasi (1 orang ditunjuk) |

---

## 8. Roadmap Pengembangan

### 🟢 Fase 1 — MVP / Versi Dasar (Minggu 1–6)

**Target**: Aplikasi bisa diunduh dan dipakai jemaat untuk membaca warta dan jadwal.

| Minggu | Fokus |
|---|---|
| 1–2 | Setup project Android + Firebase, konfigurasi Firestore schema, Firebase Auth, navigasi dasar |
| 3–4 | Halaman Beranda, PDF Viewer, Halaman Renungan, Arsip Warta |
| 5–6 | Jadwal Ibadah, Jadwal SM, Admin Panel dasar, Upload PDF dari admin |

**Deliverable Fase 1**:
- [ ] Aplikasi bisa diinstal di Android
- [ ] Jemaat bisa membaca warta PDF
- [ ] Jemaat bisa membaca renungan dalam format teks
- [ ] Jemaat bisa melihat jadwal ibadah minggu ini
- [ ] Admin bisa upload PDF dan input data dari browser

---

### 🟡 Fase 2 — Komunitas & Notifikasi (Minggu 7–12)

**Target**: Jemaat lebih terhubung melalui notifikasi dan fitur komunitas.

| Minggu | Fokus |
|---|---|
| 7–8 | Push Notification (FCM), pengumuman, reminder ibadah |
| 9–10 | Bacaan Harian Leksionari, Menara Doa, reminder doa jam 21.00 |
| 11–12 | Ulang Tahun Jemaat (notifikasi otomatis), Dukung & Doakan |

**Deliverable Fase 2**:
- [ ] Jemaat menerima notifikasi pengumuman baru
- [ ] Reminder ibadah Sabtu malam otomatis
- [ ] Bacaan harian bisa diakses per tanggal
- [ ] Pokok doa mingguan bisa dibaca dan ditandai
- [ ] Notifikasi ulang tahun jemaat

---

### 🔵 Fase 3 — Poles & Optimasi (Minggu 13–16)

**Target**: Pengalaman pengguna lebih halus dan aplikasi siap dirilis ke Play Store.

| Minggu | Fokus |
|---|---|
| 13 | Mode Offline (cache Firestore), loading state yang baik |
| 14 | Laporan persembahan dengan grafik, informasi gereja |
| 15 | Fitur berbagi renungan/warta ke WhatsApp |
| 16 | Dark mode, onboarding screen, testing & bug fix |

**Deliverable Fase 3**:
- [ ] Aplikasi tetap bisa dibuka tanpa internet (data ter-cache)
- [ ] Laporan keuangan tampil dengan grafik sederhana
- [ ] Renungan bisa dibagikan ke WhatsApp
- [ ] Dark mode tersedia
- [ ] Siap submit ke Google Play Store

---

### 🟣 Fase 4 — Pengembangan Lanjutan (Opsional, Jangka Panjang)

Fitur-fitur ini bisa dikerjakan setelah aplikasi stabil dan ada masukan dari jemaat:

- **PDF Parsing Otomatis** — sistem ekstrak jadwal & nama dari PDF secara otomatis
- **Versi iOS** — port aplikasi ke iOS menggunakan Kotlin Multiplatform atau Flutter
- **Statistik Kehadiran** — rekap kehadiran ibadah per wilayah
- **Direktori Jemaat** — informasi kontak warga (dengan kontrol privasi)
- **Streaming Ibadah** — integrasi YouTube Live untuk jemaat yang tidak bisa hadir

---

## 9. Struktur Project Android

```
app/
├── src/main/
│   ├── java/id/gkjst/etaat/
│   │   │
│   │   ├── data/
│   │   │   ├── model/
│   │   │   │   ├── Warta.kt
│   │   │   │   ├── JadwalIbadah.kt
│   │   │   │   ├── Pengumuman.kt
│   │   │   │   ├── BacaanHarian.kt
│   │   │   │   ├── UlangTahun.kt
│   │   │   │   └── Persembahan.kt
│   │   │   │
│   │   │   ├── repository/
│   │   │   │   ├── WartaRepository.kt
│   │   │   │   ├── JadwalRepository.kt
│   │   │   │   ├── PengumumanRepository.kt
│   │   │   │   └── DoaRepository.kt
│   │   │   │
│   │   │   └── remote/
│   │   │       └── FirebaseService.kt
│   │   │
│   │   ├── domain/
│   │   │   └── usecase/
│   │   │       ├── GetWartaTerbaruUseCase.kt
│   │   │       ├── GetJadwalMingguIniUseCase.kt
│   │   │       └── GetBacaanHarianUseCase.kt
│   │   │
│   │   ├── ui/
│   │   │   ├── home/
│   │   │   │   ├── HomeScreen.kt
│   │   │   │   └── HomeViewModel.kt
│   │   │   │
│   │   │   ├── warta/
│   │   │   │   ├── WartaScreen.kt
│   │   │   │   ├── WartaViewModel.kt
│   │   │   │   ├── PdfViewerScreen.kt
│   │   │   │   └── ArsipWartaScreen.kt
│   │   │   │
│   │   │   ├── jadwal/
│   │   │   │   ├── JadwalScreen.kt
│   │   │   │   ├── JadwalViewModel.kt
│   │   │   │   └── JadwalSMScreen.kt
│   │   │   │
│   │   │   ├── pengumuman/
│   │   │   │   ├── PengumumanScreen.kt
│   │   │   │   └── PengumumanViewModel.kt
│   │   │   │
│   │   │   ├── doa/
│   │   │   │   ├── DoaScreen.kt
│   │   │   │   ├── BacaanHarianScreen.kt
│   │   │   │   └── DoaViewModel.kt
│   │   │   │
│   │   │   ├── keuangan/
│   │   │   │   ├── KeuanganScreen.kt
│   │   │   │   └── KeuanganViewModel.kt
│   │   │   │
│   │   │   └── info/
│   │   │       └── InfoScreen.kt
│   │   │
│   │   ├── utils/
│   │   │   ├── DateUtils.kt
│   │   │   ├── NotificationUtils.kt
│   │   │   └── Extensions.kt
│   │   │
│   │   ├── di/
│   │   │   └── AppModule.kt        // Hilt dependency injection
│   │   │
│   │   └── MainActivity.kt
│   │
│   └── res/
│       ├── drawable/               // ikon, gambar
│       ├── values/
│       │   ├── colors.xml          // warna brand GKJ ST
│       │   ├── strings.xml
│       │   └── themes.xml
│       └── font/                   // font kustom
│
├── google-services.json            // konfigurasi Firebase
└── build.gradle.kts
```

---

## 10. Teknologi & Library

### Core

```kotlin
// Android & Kotlin
minSdk = 24 (Android 7.0, mencakup 95%+ perangkat aktif)
targetSdk = 35
kotlinVersion = "2.0.0"

// Jetpack Compose
implementation("androidx.compose.bom:2024.12.01")
implementation("androidx.compose.ui:ui")
implementation("androidx.compose.material3:material3")
implementation("androidx.navigation:navigation-compose:2.8.0")
```

### Firebase

```kotlin
implementation(platform("com.google.firebase:firebase-bom:33.0.0"))
implementation("com.google.firebase:firebase-firestore-ktx")
implementation("com.google.firebase:firebase-storage-ktx")
implementation("com.google.firebase:firebase-messaging-ktx")
implementation("com.google.firebase:firebase-auth-ktx")
```

### PDF & Media

```kotlin
// PDF Viewer
implementation("com.github.barteksc:android-pdf-viewer:3.2.0-beta.1")

// Image Loading
implementation("io.coil-kt:coil-compose:2.6.0")
```

### Arsitektur & DI

```kotlin
// ViewModel
implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.0")

// Dependency Injection
implementation("com.google.dagger:hilt-android:2.51")
kapt("com.google.dagger:hilt-compiler:2.51")

// Coroutines
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.0")
```

### Grafik (Fase 3)

```kotlin
// Chart untuk laporan keuangan
implementation("com.patrykandpatrick.vico:compose-m3:1.15.0")
```

---

## 11. Anggaran & Biaya Operasional

### Biaya Pengembangan
Pengembangan dilakukan oleh relawan internal gereja — **tidak ada biaya pengembangan**.

### Biaya Operasional Bulanan (Estimasi)

| Layanan | Paket | Biaya |
|---|---|---|
| Firebase (Firestore + Storage + FCM) | Spark Plan (Free) | **Rp 0** |
| Google Play Store (sekali bayar) | Developer Account | **~Rp 375.000** (sekali) |
| Domain (opsional, untuk admin panel) | Shared hosting | **~Rp 150.000/tahun** |

> **Catatan**: Firebase Spark Plan (gratis) mencakup:
> - Firestore: 1 GB storage, 50.000 reads/hari, 20.000 writes/hari
> - Storage: 5 GB
> - FCM (push notification): **tidak terbatas**
>
> Untuk skala jemaat GKJ Salatiga Timur, batas ini sangat mencukupi dan kemungkinan tidak akan pernah terlampaui.

**Total biaya operasional bulanan: Rp 0** (selain biaya internet yang sudah ada)

---

## 12. Risiko & Mitigasi

| Risiko | Kemungkinan | Dampak | Mitigasi |
|---|---|---|---|
| Tim multimedia tidak konsisten update konten | Sedang | Tinggi | Buat workflow sesederhana mungkin; tunjuk 1 PIC tetap |
| Jemaat lansia kesulitan menginstal app | Tinggi | Sedang | Buat panduan instalasi bergambar; minta PA wilayah bantu |
| Format PDF warta berubah (merusak tampilan) | Rendah | Rendah | PDF hanya sebagai viewer; data terstruktur diinput manual |
| Firebase melebihi batas free tier | Sangat Rendah | Sedang | Monitor usage; upgrade ke Blaze plan (~$25/bulan) jika perlu |
| Developer (relawan) tidak tersedia | Sedang | Tinggi | Dokumentasi kode yang baik; libatkan 1–2 anggota tim IT gereja |
| Keamanan data jemaat | Rendah | Tinggi | Tidak menyimpan data sensitif; auth Firebase untuk admin |

---

## 13. Pertanyaan Terbuka untuk Diskusi Tim

Berikut adalah hal-hal yang perlu didiskusikan dan disepakati bersama tim multimedia sebelum pengembangan dimulai:

### Konten & Kebijakan
1. **Siapa PIC (Person In Charge) aplikasi?** Perlu ada 1 orang yang bertanggung jawab atas konten dan operasional aplikasi secara keseluruhan.
2. **Berapa lama arsip warta disimpan?** Apakah semua edisi sejak aplikasi diluncurkan, atau hanya 1 tahun terakhir?
3. **Apakah laporan keuangan lengkap ditampilkan?** Atau hanya ringkasan persembahan mingguan?
4. **Bagaimana dengan foto kegiatan gereja?** Apakah akan ada galeri foto kegiatan di masa depan?

### Teknis & Operasional
5. **Nama aplikasi di Play Store?** Misalnya: *e-TAAT GKJ Salatiga Timur* atau nama lain?
6. **Apakah perlu login untuk jemaat?** Atau aplikasi bisa diakses bebas tanpa akun?
7. **Siapa yang memegang akun Firebase dan Play Store?** Disarankan atas nama gereja, bukan personal.
8. **Bagaimana jika terjadi kesalahan data?** Siapa yang berwenang mengoreksi dan dalam waktu berapa lama?

### Desain & Identitas
9. **Warna dan identitas visual aplikasi?** Sesuaikan dengan warna brand GKJ ST yang sudah ada?
10. **Apakah ada aset desain** (logo, foto gereja, ikon) yang bisa digunakan?

---

## Lampiran

### A. Daftar Kontak Penting GKJ Salatiga Timur

| Peran | Nama | Kontak |
|---|---|---|
| Pendeta | Pdt. S.B. Wismono | 085868346269 |
| Ketua Majelis | Pnt. Sri Hartono | 081225704915 |
| Kantor Gereja | — | 085643175871 |

### B. Informasi Teknis Gereja

- **Alamat**: Jl. Tanggulayu No. 7, RT 02 RW VII Nanggulan, Kutowinangun Kidul, Kec. Tingkir, Kota Salatiga 50742
- **Email**: gkjst.salatigatimur@gmail.com
- **YouTube**: GKJ Salatiga Timur
- **Instagram**: @gkjsalatigatimur
- **Facebook**: GKJ Salatiga Timur

### C. Referensi Aplikasi Sejenis

Untuk inspirasi desain dan fitur, tim bisa melihat:
- Aplikasi warta gereja lain di Play Store (cari: "warta jemaat gereja")
- YouVersion Bible App — referensi UX bacaan harian & notifikasi
- Alkitab.SABDA.org — referensi tampilan konten Alkitab di Android

---

*Dokumen ini bersifat living document dan akan diperbarui seiring berjalannya diskusi dan pengembangan.*

**Versi**: 1.0 | **Terakhir diperbarui**: 10 Mei 2026