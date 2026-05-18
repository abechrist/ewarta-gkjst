# Setup Neon + Express + Vercel + OneSignal untuk eWARTA

## 1. Setup Neon Database

### 1.1 Buat Project di Neon
1. Buka https://neon.tech
2. Login dengan akun Anda
3. Klik "Create a new project"
4. Nama: `ewarta-gkjst`
5. Region: `ap-southeast-1` (Singapore)
6. Klik "Create project"

### 1.2 Setup Database Schema
1. Di Neon dashboard, buka "SQL Editor"
2. Copy-paste isi file: `firebase/supabase_schema.sql`
3. Klik "Execute"
4. Tunggu sampai selesai

### 1.3 Get Connection String
1. Di Neon dashboard, buka "Connection string"
2. Copy full connection string (PostgreSQL)
3. Format: `postgresql://user:password@host/dbname`

## 2. Deploy Express Backend ke Railway

### 2.1 Setup Railway Project
1. Buka https://railway.app
2. Login atau buat akun
3. Klik "New Project"
4. Pilih "Deploy from GitHub"
5. Connect GitHub account
6. Select repository: `ewarta-gkjst`

### 2.2 Configure Railway
1. Pilih root directory: `backend`
2. Add environment variable:
   - Key: `DATABASE_URL`
   - Value: (dari Neon connection string)
3. Klik "Deploy"

Railway akan auto-deploy. Backend URL: `https://ewarta-backend.railway.app`

## 3. Deploy Admin Panel ke Vercel

### 3.1 Setup Vercel Project
1. Buka https://vercel.com/abechrist-2687
2. Klik "Add New..." → "Project"
3. Import repository: `ewarta-gkjst`
4. Framework: `Vite`
5. Root Directory: `admin`

### 3.2 Add Environment Variables
- `VITE_API_URL`: `https://ewarta-backend.railway.app`
- `VITE_ONESIGNAL_APP_ID`: (dari OneSignal)

### 3.3 Deploy
Klik "Deploy"

Admin panel: `https://ewarta-gkjst.vercel.app`

## 4. Setup OneSignal

### 4.1 Buat OneSignal App
1. Buka https://onesignal.com
2. Klik "Create an app"
3. Nama: `eWARTA GKJ Salatiga Timur`
4. Pilih "Android"
5. Klik "Create"

### 4.2 Get App ID
1. Di OneSignal dashboard, buka "Settings" → "Keys & IDs"
2. Copy `App ID`
3. Gunakan di `.env.local` admin panel

## 5. Update Android App

Edit `android/app/src/main/java/id/gkjst/ewarta/MainActivity.kt`:

```kotlin
import com.onesignal.OneSignal

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        OneSignal.initWithContext(this)
        OneSignal.setAppId("your_onesignal_app_id")
        
        setContent {
            eWARTATheme {
                MainApp()
            }
        }
    }
}
```

## 6. Test End-to-End

### Test Admin Panel
1. Buka https://ewarta-gkjst.vercel.app
2. Login dengan email Supabase Auth
3. Tambah warta baru
4. Klik "Publish"
5. Verifikasi data muncul di database Neon

### Test Android App
1. Build & run Android app
2. Verifikasi bisa load data dari Express backend
3. Verifikasi menerima push notification dari OneSignal

## Biaya Operasional (Bulanan)

| Layanan | Paket | Biaya |
|---------|-------|-------|
| Neon | Free (0.5GB) | **Rp 0** |
| Railway | Free ($5 credit) | **Rp 0** |
| Vercel | Hobby | **Rp 0** |
| OneSignal | Free | **Rp 0** |
| **Total** | | **Rp 0/bulan** |

---

**Checklist Setup:**
- [ ] Neon database dibuat + schema dijalankan
- [ ] Express backend deployed ke Railway
- [ ] Admin panel deployed ke Vercel
- [ ] OneSignal app dibuat
- [ ] Android app updated dengan OneSignal
- [ ] Test end-to-end berhasil
