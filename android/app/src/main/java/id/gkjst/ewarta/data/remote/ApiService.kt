package id.gkjst.ewarta.data.remote

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.delete
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.put
import io.ktor.client.request.setBody
import io.ktor.serialization.kotlinx.json.json
import id.gkjst.ewarta.data.model.*
import kotlinx.serialization.json.Json
import javax.inject.Inject

class ApiService @Inject constructor() {
    private val baseUrl = "https://ewarta-backend.railway.app"
    
    private val client = HttpClient {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
            })
        }
    }

    suspend fun getWartaTerbaru(): Warta? {
        return try {
            val warta = client.get("$baseUrl/api/warta").body<List<Warta>>()
            warta.firstOrNull()
        } catch (e: Exception) {
            null
        }
    }

    suspend fun getAllWarta(): List<Warta> {
        return try {
            client.get("$baseUrl/api/warta").body()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getJadwalIbadah(): List<JadwalIbadah> {
        return try {
            client.get("$baseUrl/api/jadwal-ibadah").body()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getJadwalSM(): List<JadwalSM> {
        return try {
            client.get("$baseUrl/api/jadwal-sm").body()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getPengumuman(): List<Pengumuman> {
        return try {
            client.get("$baseUrl/api/pengumuman").body()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getBacaanHarian(): List<BacaanHarian> {
        return try {
            client.get("$baseUrl/api/bacaan-harian").body()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getUlangTahun(): List<UlangTahun> {
        return try {
            client.get("$baseUrl/api/ulang-tahun").body()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getDoaPokok(): List<DoaPokok> {
        return try {
            client.get("$baseUrl/api/doa-pokok").body()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getPersembahan(): List<Persembahan> {
        return try {
            client.get("$baseUrl/api/persembahan").body()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getWargaDoakan(): List<WargaDoakan> {
        return try {
            client.get("$baseUrl/api/warga-doakan").body()
        } catch (e: Exception) {
            emptyList()
        }
    }
}
