# Setup Guide - eWARTA

## Langkah 1: Firebase Project Setup

### 1.1 Buat Firebase Project
1. Buka https://console.firebase.google.com
2. Klik "Create Project"
3. Nama project: `ewarta-gkjst`
4. Disable Google Analytics (opsional)
5. Klik "Create"

### 1.2 Setup Firestore Database
1. Di Firebase Console, klik "Firestore Database"
2. Klik "Create Database"
3. Pilih region: `asia-southeast1` (Singapore)
4. Pilih "Start in production mode"
5. Klik "Create"

### 1.3 Setup Firebase Storage
1. Klik "Storage"
2. Klik "Get Started"
3. Pilih region: `asia-southeast1`
4. Klik "Done"

### 1.4 Setup Firebase Authentication
1. Klik "Authentication"
2. Klik "Get Started"
3. Pilih "Email/Password"
4. Enable "Email/Password"
5. Klik "Save"

### 1.5 Setup Firebase Cloud Messaging
1. Klik "Cloud Messaging"
2. Copy "Server API Key" (untuk admin panel)
3. Copy "Sender ID" (untuk Android app)

### 1.6 Download Credentials

**Untuk Android:**
1. Klik "Project Settings" (gear icon)
2. Klik tab "Your apps"
3. Klik "Add app" → "Android"
4. Package name: `id.gkjst.ewarta`
5. Download `google-services.json`
6. Letakkan di: `android/app/google-services.json`

**Untuk Admin Panel (Web):**
1. Di "Project Settings", copy config JSON
2. Buat file `admin/.env.local`:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=ewarta-gkjst.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ewarta-gkjst
VITE_FIREBASE_STORAGE_BUCKET=ewarta-gkjst.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key
VITE_FIREBASE_SERVER_KEY=your_server_key
```

## Langkah 2: Setup Firestore Security Rules

1. Di Firebase Console, buka "Firestore Database"
2. Klik tab "Rules"
3. Replace dengan:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read, authenticated write
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. Klik "Publish"

## Langkah 3: Setup Firebase Storage Rules

1. Di Firebase Console, buka "Storage"
2. Klik tab "Rules"
3. Replace dengan:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. Klik "Publish"

## Langkah 4: Buat Admin User

1. Di Firebase Console, buka "Authentication"
2. Klik tab "Users"
3. Klik "Add user"
4. Email: `admin@gkjst.com`
5. Password: (set password yang aman)
6. Klik "Add user"

## Langkah 5: Setup Android App

### 5.1 Build & Run
```bash
cd android
./gradlew build
./gradlew installDebug
```

### 5.2 Test di Emulator/Device
- Buka aplikasi eWARTA
- Verifikasi bisa load data dari Firestore
- Test semua 5 tab

## Langkah 6: Setup Admin Panel

### 6.1 Install & Run
```bash
cd admin
npm install
npm run dev
```

### 6.2 Login & Test
- Buka http://localhost:3000
- Login dengan `admin@gkjst.com`
- Test CRUD untuk setiap manager:
  - Tambah warta baru
  - Publish & kirim notifikasi
  - Tambah jadwal ibadah
  - Tambah pengumuman
  - Tambah pokok doa
  - Tambah laporan keuangan

## Langkah 7: Deploy Admin Panel ke Firebase Hosting

### 7.1 Setup Firebase CLI
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

### 7.2 Build & Deploy
```bash
cd admin
npm run build
firebase deploy --only hosting
```

Admin panel akan tersedia di: `https://ewarta-gkjst.web.app`

## Langkah 8: Persiapan Play Store

### 8.1 Generate Signed APK
```bash
cd android
./gradlew bundleRelease
```

### 8.2 Upload ke Play Store
1. Buka https://play.google.com/console
2. Buat aplikasi baru
3. Upload bundle
4. Isi store listing (deskripsi, screenshot, dll)
5. Submit untuk review

## Troubleshooting

### Android App tidak bisa connect ke Firebase
- Verifikasi `google-services.json` sudah di `android/app/`
- Rebuild project: `./gradlew clean build`

### Admin Panel login gagal
- Verifikasi `.env.local` sudah benar
- Pastikan user sudah dibuat di Firebase Authentication
- Check browser console untuk error details

### Notifikasi tidak terima
- Verifikasi FCM enabled di Firebase Console
- Check "Cloud Messaging" untuk Server API Key
- Pastikan app sudah subscribe ke topic `/topics/all`

## Next Steps

1. **Minggu 1**: Setup Firebase, build Android MVP, deploy admin panel
2. **Minggu 2-3**: Test dengan tim multimedia, collect feedback
3. **Minggu 4-6**: Polish UI, add offline support, prepare Play Store
4. **Minggu 7+**: Launch ke Play Store, monitor usage, iterate

---

**Kontak Support**: Hubungi tim IT GKJ Salatiga Timur
