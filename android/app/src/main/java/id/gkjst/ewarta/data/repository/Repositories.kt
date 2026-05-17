package id.gkjst.ewarta.data.repository

import id.gkjst.ewarta.data.model.*
import id.gkjst.ewarta.data.remote.ApiService
import javax.inject.Inject

class WartaRepository @Inject constructor(
    private val apiService: ApiService
) {
    suspend fun getWartaTerbaru(): Warta? = apiService.getWartaTerbaru()
    suspend fun getAllWarta(): List<Warta> = apiService.getAllWarta()
}

class JadwalRepository @Inject constructor(
    private val apiService: ApiService
) {
    suspend fun getJadwalIbadah(): List<JadwalIbadah> = apiService.getJadwalIbadah()
    suspend fun getJadwalSM(): List<JadwalSM> = apiService.getJadwalSM()
    suspend fun getBacaanHarian(): List<BacaanHarian> = apiService.getBacaanHarian()
}

class PengumumanRepository @Inject constructor(
    private val apiService: ApiService
) {
    suspend fun getPengumuman(): List<Pengumuman> = apiService.getPengumuman()
}

class DoaRepository @Inject constructor(
    private val apiService: ApiService
) {
    suspend fun getDoaPokok(): List<DoaPokok> = apiService.getDoaPokok()
    suspend fun getUlangTahun(): List<UlangTahun> = apiService.getUlangTahun()
    suspend fun getWargaDoakan(): List<WargaDoakan> = apiService.getWargaDoakan()
}

class KeuanganRepository @Inject constructor(
    private val apiService: ApiService
) {
    suspend fun getPersembahan(): List<Persembahan> = apiService.getPersembahan()
}
