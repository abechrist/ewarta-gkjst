# eWARTA - Aplikasi Warta Jemaat GKJ Salatiga Timur

Aplikasi Android native untuk distribusi warta jemaat mingguan dengan fitur interaktif, notifikasi real-time, dan admin panel web.

## Struktur Proyek

```
eWARTA/
├── android/                 # Aplikasi Android (Kotlin + Jetpack Compose)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/id/gkjst/ewarta/
│   │   │   │   ├── data/                # Data layer (models, repositories, Firebase)
│   │   │   │   ├── domain/              # Domain layer (use cases)
│   │   │   │   ├── ui/                  # UI layer (screens, viewmodels, theme)
│   │   │   │   ├── di/                  # Dependency injection (Hilt)
│   │   │   │   ├── utils/               # Utilities (share, notifications)
│   │   │   │   └── MainActivity.kt
│   │   │   └── res/                     # Resources (strings, colors, fonts)
│   │   ├── build.gradle.kts
│   │   └── google-services.json         # Firebase config (download dari console)
│   ├── build.gradle.kts
│   └── settings.gradle.kts
│
├── admin/                   # Admin Panel (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/      # CRUD managers (Warta, Jadwal, Pengumuman, Doa, Keuangan)
│   │   ├── pages/           # Dashboard, LoginPage
│   │   ├── firebase.js      # Firebase config
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.example
│
├── firebase/                # Firestore rules & indexes
│   └── firestore.rules
│
└── docs/                    # Dokumentasi
    └── SETUP.md
```

## Fitur Aplikasi

### Android App (5 Tab Utama)

1. **Beranda** - Warta terbaru, akses cepat ke jadwal/pengumuman/doa
2. **Jadwal** - Jadwal ibadah (filter wilayah/bahasa), Sekolah Minggu, Leksionari
3. **Pengumuman** - Pengumuman aktif dengan kategori (ibadah, komisi, umum, khusus)
4. **Doa & Bacaan** - Pokok doa (checklist), Ulang tahun jemaat, Dukung & doakan
5. **Lainnya** - Laporan keuangan, Info gereja, Kontak penting, Media sosial

### Admin Panel (React Web)

- **Login** - Email/password via Firebase Auth
- **Warta Manager** - Upload PDF, input renungan, publish & kirim notifikasi
- **Jadwal Manager** - CRUD jadwal ibadah per wilayah/bahasa
- **Pengumuman Manager** - CRUD pengumuman dengan periode berlaku
- **Doa Manager** - CRUD pokok doa mingguan
- **Keuangan Manager** - Input laporan persembahan mingguan

## Teknologi

### Android
- **Language**: Kotlin 2.0
- **UI**: Jetpack Compose
- **Architecture**: MVVM + Clean Architecture
- **DI**: Hilt
- **Backend**: Firebase (Firestore, Storage, Auth, Messaging)
- **Networking**: Firebase SDK
- **Async**: Coroutines

### Admin Panel
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Firestore, Storage, Auth, Messaging)
- **Build**: Vite

### Backend
- **Database**: Firestore (NoSQL)
- **Storage**: Firebase Storage (PDF files)
- **Auth**: Firebase Authentication
- **Notifications**: Firebase Cloud Messaging (FCM)
- **Hosting**: Firebase Hosting (admin panel)

## Warna & Desain

**Palet Warna** (Senior-Friendly + Modern):
- Primary: Navy `#1B3A4B`
- Secondary: Terracotta `#E29578`
- Background: Warm Cream `#FDF6EC`
- Text: Near Black `#1A1A1A`
- Surface: Ivory `#FEFDF5`
- Error: Soft Red `#C1121F`

**Typography**: Jetpack Compose Material3 defaults (optimized untuk readability)

## Setup & Development

### Android

1. **Prerequisites**:
   - Android Studio Hedgehog+
   - JDK 17+
   - Android SDK 24+ (minSdk)

2. **Setup**:
   ```bash
   cd android
   # Download google-services.json dari Firebase Console
   # Letakkan di: android/app/google-services.json
   ```

3. **Build & Run**:
   ```bash
   ./gradlew build
   ./gradlew installDebug
   ```

### Admin Panel

1. **Prerequisites**:
   - Node.js 18+
   - npm atau yarn

2. **Setup**:
   ```bash
   cd admin
   npm install
   cp .env.example .env.local
   # Edit .env.local dengan Firebase credentials
   ```

3. **Development**:
   ```bash
   npm run dev
   # Buka http://localhost:3000
   ```

4. **Build & Deploy**:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

## Firebase Setup

1. **Buat Project** di https://console.firebase.google.com
   - Project ID: `ewarta-gkjst`

2. **Enable Services**:
   - Firestore Database (production mode)
   - Firebase Storage
   - Firebase Authentication (Email/Password)
   - Firebase Cloud Messaging

3. **Download Credentials**:
   - Android: `google-services.json` → `android/app/`
   - Web: Copy config ke `admin/.env.local`

4. **Setup Firestore Collections** (sesuai schema di rencana):
   - `warta/`
   - `jadwal_ibadah/`
   - `jadwal_sm/`
   - `pengumuman/`
   - `bacaan_harian/`
   - `ulang_tahun/`
   - `doa_pokok/`
   - `persembahan/`
   - `warga_doakan/`

5. **Setup Security Rules**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

## Fitur Lanjutan (Fase 2-3)

- ✅ Offline cache (Firestore persistence)
- ✅ FCM notifications (trigger saat publish)
- ✅ Share ke WhatsApp
- ✅ Buka Alkitab app dari ayat
- 🔄 Dark mode (polish phase)
- 🔄 Statistik kehadiran
- 🔄 Direktori jemaat (dengan kontrol privasi)
- 🔄 Streaming ibadah (YouTube Live)

## Roadmap

| Fase | Timeline | Fokus |
|------|----------|-------|
| 1 | Minggu 1-6 | MVP: Warta, Jadwal, Admin Panel |
| 2 | Minggu 7-12 | Notifikasi, Doa, Keuangan |
| 3 | Minggu 13-16 | Polish, Offline, Dark Mode, Play Store |
| 4 | Jangka Panjang | iOS, Streaming, Direktori |

## Kontribusi

Tim Multimedia GKJ Salatiga Timur

## Lisensi

Internal use only - GKJ Salatiga Timur
