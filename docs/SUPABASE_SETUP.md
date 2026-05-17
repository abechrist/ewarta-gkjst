# Setup Supabase + Vercel + OneSignal untuk eWARTA

## 1. Setup Supabase Project

### 1.1 Buat Project di Supabase
1. Buka https://supabase.com
2. Login dengan akun `abechrist`
3. Pilih organization `gkj-salatiga-timur`
4. Klik "New Project"
5. Nama: `ewarta-gkjst`
6. Database Password: `GKJSalatigaTimur123!`
7. Region: `ap-southeast-1` (Singapore)
8. Klik "Create new project"

### 1.2 Setup Database Schema
1. Di Supabase dashboard, buka "SQL Editor"
2. Klik "New Query"
3. Copy-paste isi file: `firebase/supabase_schema.sql`
4. Klik "Run"
5. Tunggu sampai selesai

### 1.3 Setup Storage Bucket
1. Buka "Storage" di sidebar
2. Klik "Create a new bucket"
3. Nama: `warta-pdf`
4. Pilih "Public"
5. Klik "Create bucket"

### 1.4 Setup Authentication
1. Buka "Authentication" → "Providers"
2. Pastikan "Email" sudah enabled
3. Buka "Users"
4. Klik "Invite user"
5. Email: `admin@gkjst.com`
6. Password: (set password yang aman)
7. Klik "Send invite"

### 1.5 Get Credentials
1. Buka "Settings" → "API"
2. Copy `Project URL` → `VITE_SUPABASE_URL`
3. Copy `anon public` key → `VITE_SUPABASE_ANON_KEY`
4. Simpan untuk langkah berikutnya

## 2. Setup Admin Panel di Vercel

### 2.1 Push ke GitHub
```bash
cd C:\Users\Abechrist\Documents\eWARTA
git remote add origin https://github.com/abechrist/ewarta-gkjst.git
git branch -M main
git push -u origin main
```

### 2.2 Deploy ke Vercel
1. Buka https://vercel.com/abechrist-2687
2. Klik "Add New..." → "Project"
3. Import repository: `ewarta-gkjst`
4. Framework: `Vite`
5. Root Directory: `admin`
6. Environment Variables:
   - `VITE_SUPABASE_URL`: (dari langkah 1.5)
   - `VITE_SUPABASE_ANON_KEY`: (dari langkah 1.5)
7. Klik "Deploy"

Admin panel akan tersedia di: `https://ewarta-gkjst.vercel.app`

## 3. Setup OneSignal untuk Push Notifications

### 3.1 Buat OneSignal App
1. Buka https://onesignal.com
2. Login atau buat akun
3. Klik "Create an app"
4. Nama: `eWARTA GKJ Salatiga Timur`
5. Pilih "Android"
6. Klik "Create"

### 3.2 Setup Android Push
1. Di OneSignal dashboard, buka "Settings" → "Keys & IDs"
2. Copy `App ID` → `VITE_ONESIGNAL_APP_ID`
3. Buka "Credentials" → "Android"
4. Masukkan Firebase Server Key (dari Firebase Console)
5. Klik "Save"

### 3.3 Update Android App
1. Edit `android/app/src/main/java/id/gkjst/ewarta/MainActivity.kt`:
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

## 4. Update Admin Panel untuk OneSignal

Edit `admin/src/components/WartaManager.jsx` - tambahkan fungsi send notification:

```javascript
async function sendNotification(title, body) {
  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${import.meta.env.VITE_ONESIGNAL_REST_API_KEY}`
      },
      body: JSON.stringify({
        app_id: import.meta.env.VITE_ONESIGNAL_APP_ID,
        included_segments: ['All'],
        headings: { en: title },
        contents: { en: body }
      })
    });
    
    if (response.ok) {
      alert('Notifikasi terkirim!');
    }
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}
```

## 5. Update .env.local Admin Panel

```
VITE_SUPABASE_URL=https://ewarta-gkjst.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_ONESIGNAL_APP_ID=your_onesignal_app_id
VITE_ONESIGNAL_REST_API_KEY=your_onesignal_rest_api_key
```

## 6. Update Android App Credentials

Edit `android/app/src/main/java/id/gkjst/ewarta/data/remote/SupabaseConfig.kt`:

```kotlin
object SupabaseConfig {
    private const val SUPABASE_URL = "https://ewarta-gkjst.supabase.co"
    private const val SUPABASE_ANON_KEY = "your_anon_key_here"
    
    // ... rest of code
}
```

## 7. Test End-to-End

### Test Admin Panel
1. Buka https://ewarta-gkjst.vercel.app
2. Login dengan `admin@gkjst.com`
3. Tambah warta baru
4. Klik "Publish & Kirim Notifikasi"
5. Verifikasi notifikasi terkirim di OneSignal dashboard

### Test Android App
1. Build & run Android app
2. Verifikasi bisa load data dari Supabase
3. Verifikasi menerima push notification dari OneSignal

## 8. Troubleshooting

**Admin panel tidak bisa login**
- Verifikasi `.env.local` sudah benar
- Check Supabase Auth users sudah dibuat
- Lihat browser console untuk error

**Android app tidak connect ke Supabase**
- Verifikasi `SupabaseConfig.kt` credentials benar
- Check Supabase RLS policies (harus allow public read)
- Rebuild project: `./gradlew clean build`

**Notifikasi tidak terima**
- Verifikasi OneSignal app ID benar
- Check OneSignal dashboard untuk delivery status
- Pastikan app subscribe ke OneSignal

---

**Next Steps:**
1. Setup Supabase project (langkah 1)
2. Deploy admin panel ke Vercel (langkah 2)
3. Setup OneSignal (langkah 3)
4. Update credentials di Android app + Admin panel
5. Test end-to-end
6. Mulai input data warta minggu pertama
