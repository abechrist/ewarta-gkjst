package id.gkjst.ewarta.data.repository

import id.gkjst.ewarta.data.model.*
import id.gkjst.ewarta.data.remote.SupabaseService
import javax.inject.Inject

class WartaRepository @Inject constructor(
    private val supabaseService: SupabaseService
) {
    suspend fun getWartaTerbaru(): Warta? = supabaseService.getWartaTerbaru()
    suspend fun getAllWarta(): List<Warta> = supabaseService.getAllWarta()
}

class JadwalRepository @Inject constructor(
    private val supabaseService: SupabaseService
) {
    suspend fun getJadwalIbadah(): List<JadwalIbadah> = supabaseService.getJadwalIbadah()
    suspend fun getJadwalSM(): List<JadwalSM> = supabaseService.getJadwalSM()
    suspend fun getBacaanHarian(): List<BacaanHarian> = supabaseService.getBacaanHarian()
}

class PengumumanRepository @Inject constructor(
    private val supabaseService: SupabaseService
) {
    suspend fun getPengumuman(): List<Pengumuman> = supabaseService.getPengumuman()
}

class DoaRepository @Inject constructor(
    private val supabaseService: SupabaseService
) {
    suspend fun getDoaPokok(): List<DoaPokok> = supabaseService.getDoaPokok()
    suspend fun getUlangTahun(): List<UlangTahun> = supabaseService.getUlangTahun()
    suspend fun getWargaDoakan(): List<WargaDoakan> = supabaseService.getWargaDoakan()
}

class KeuanganRepository @Inject constructor(
    private val supabaseService: SupabaseService
) {
    suspend fun getPersembahan(): List<Persembahan> = supabaseService.getPersembahan()
}
