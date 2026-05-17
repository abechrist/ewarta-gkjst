package id.gkjst.ewarta.data.remote

import io.github.jan.supabase.client
import id.gkjst.ewarta.data.model.*
import javax.inject.Inject

class SupabaseService @Inject constructor() {

    suspend fun getWartaTerbaru(): Warta? {
        return try {
            val response = SupabaseConfig.client
                .from("warta")
                .select() {
                    filter {
                        eq("published", true)
                    }
                    order("created_at", ascending = false)
                    limit(1)
                }
                .decodeSingle<Warta>()
            response
        } catch (e: Exception) {
            null
        }
    }

    suspend fun getAllWarta(): List<Warta> {
        return try {
            SupabaseConfig.client
                .from("warta")
                .select() {
                    filter {
                        eq("published", true)
                    }
                    order("created_at", ascending = false)
                }
                .decodeList<Warta>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getJadwalIbadah(): List<JadwalIbadah> {
        return try {
            SupabaseConfig.client
                .from("jadwal_ibadah")
                .select() {
                    order("tanggal", ascending = true)
                }
                .decodeList<JadwalIbadah>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getJadwalSM(): List<JadwalSM> {
        return try {
            SupabaseConfig.client
                .from("jadwal_sm")
                .select() {
                    order("tanggal", ascending = true)
                }
                .decodeList<JadwalSM>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getPengumuman(): List<Pengumuman> {
        return try {
            SupabaseConfig.client
                .from("pengumuman")
                .select() {
                    filter {
                        eq("published", true)
                    }
                    order("tanggal_mulai", ascending = false)
                }
                .decodeList<Pengumuman>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getBacaanHarian(): List<BacaanHarian> {
        return try {
            SupabaseConfig.client
                .from("bacaan_harian")
                .select() {
                    order("tanggal", ascending = true)
                }
                .decodeList<BacaanHarian>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getUlangTahun(): List<UlangTahun> {
        return try {
            SupabaseConfig.client
                .from("ulang_tahun")
                .select()
                .decodeList<UlangTahun>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getDoaPokok(): List<DoaPokok> {
        return try {
            SupabaseConfig.client
                .from("doa_pokok")
                .select() {
                    order("periode_mulai", ascending = false)
                }
                .decodeList<DoaPokok>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getPersembahan(): List<Persembahan> {
        return try {
            SupabaseConfig.client
                .from("persembahan")
                .select() {
                    order("tanggal", ascending = false)
                }
                .decodeList<Persembahan>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getWargaDoakan(): List<WargaDoakan> {
        return try {
            SupabaseConfig.client
                .from("warga_doakan")
                .select() {
                    filter {
                        eq("aktif", true)
                    }
                }
                .decodeList<WargaDoakan>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun uploadPDF(fileName: String, fileBytes: ByteArray): String? {
        return try {
            SupabaseConfig.client.storage
                .from("warta-pdf")
                .upload("$fileName-${System.currentTimeMillis()}.pdf", fileBytes)
            
            SupabaseConfig.client.storage
                .from("warta-pdf")
                .getPublicUrl("$fileName-${System.currentTimeMillis()}.pdf")
        } catch (e: Exception) {
            null
        }
    }
}
