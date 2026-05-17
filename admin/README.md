# eWARTA Admin Panel

Admin panel untuk mengelola konten aplikasi eWARTA GKJ Salatiga Timur.

## Setup

1. Copy `.env.example` ke `.env.local` dan isi dengan kredensial Firebase Anda:
```bash
cp .env.example .env.local
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka browser ke `http://localhost:3000`

## Fitur

- **Warta & Renungan**: Upload PDF dan input teks renungan mingguan
- **Jadwal Ibadah**: Kelola jadwal ibadah per wilayah dan bahasa
- **Pengumuman**: Buat pengumuman dengan kategori dan periode berlaku
- **Pokok Doa**: Kelola pokok doa mingguan
- **Laporan Persembahan**: Input laporan keuangan mingguan

## Teknologi

- React + Vite
- Tailwind CSS
- Firebase (Firestore, Storage, Auth, Messaging)

## Deployment

Deploy ke Firebase Hosting:
```bash
npm run build
firebase deploy --only hosting
```
