package id.gkjst.ewarta.data.remote

import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import id.gkjst.ewarta.data.model.*
import kotlinx.coroutines.tasks.await
import javax.inject.Inject

class FirebaseService @Inject constructor(
    private val firestore: FirebaseFirestore
) {
    suspend fun getWartaTerbaru(): Warta? {
        return try {
            val snapshot = firestore.collection("warta")
                .whereEqualTo("published", true)
                .orderBy("tanggal", Query.Direction.DESCENDING)
                .limit(1)
                .get()
                .await()
            snapshot.documents.firstOrNull()?.toObject(Warta::class.java)
        } catch (e: Exception) {
            null
        }
    }

    suspend fun getAllWarta(): List<Warta> {
        return try {
            val snapshot = firestore.collection("warta")
                .whereEqualTo("published", true)
                .orderBy("tanggal", Query.Direction.DESCENDING)
                .get()
                .await()
            snapshot.toObjects(Warta::class.java)
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getJadwalIbadahMingguIni(): List<JadwalIbadah> {
        return try {
            val snapshot = firestore.collection("jadwal_ibadah")
                .orderBy("tanggal", Query.Direction.ASCENDING)
                .get()
                .await()
            snapshot.toObjects(JadwalIbadah::class.java)
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getJadwalSM(): List<JadwalSM> {
        return try {
            val snapshot = firestore.collection("jadwal_sm")
                .orderBy("tanggal", Query.Direction.ASCENDING)
                .get()
                .await()
            snapshot.toObjects(JadwalSM::class.java)
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getPengumuman(): List<Pengumuman> {
        return try {
            val snapshot = firestore.collection("pengumuman")
                .whereEqualTo("published", true)
                .orderBy("tanggalMulai", Query.Direction.DESCENDING)
                .get()
                .await()
            snapshot.toObjects(Pengumuman::class.java)
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getBacaanHarian(): List<BacaanHarian> {
        return try {
            val snapshot = firestore.collection("bacaan_harian")
                .orderBy("tanggal", Query.Direction.ASCENDING)
                .get()
                .await()
            snapshot.toObjects(BacaanHarian::class.java)
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getUlangTahun(): List<UlangTahun> {
        return try {
            val snapshot = firestore.collection("ulang_tahun")
                .get()
                .await()
            snapshot.toObjects(UlangTahun::class.java)
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getDoaPokok(): List<DoaPokok> {
        return try {
            val snapshot = firestore.collection("doa_pokok")
                .orderBy("periodeMulai", Query.Direction.DESCENDING)
                .get()
                .await()
            snapshot.toObjects(DoaPokok::class.java)
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getPersembahan(): List<Persembahan> {
        return try {
            val snapshot = firestore.collection("persembahan")
                .orderBy("tanggal", Query.Direction.DESCENDING)
                .get()
                .await()
            snapshot.toObjects(Persembahan::class.java)
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getWargaDoakan(): List<WargaDoakan> {
        return try {
            val snapshot = firestore.collection("warga_doakan")
                .whereEqualTo("aktif", true)
                .get()
                .await()
            snapshot.toObjects(WargaDoakan::class.java)
        } catch (e: Exception) {
            emptyList()
        }
    }
}
