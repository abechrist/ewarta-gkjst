package id.gkjst.ewarta.data.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import java.time.LocalDate
import java.time.LocalDateTime

@Serializable
data class Warta(
    val id: String = "",
    val tema: String = "",
    val ayat: String = "",
    val renungan: String = "",
    @SerialName("pdf_url")
    val pdfUrl: String = "",
    @SerialName("minggu_liturgi")
    val mingguLiturgi: String = "",
    @SerialName("warna_liturgi")
    val warnaLiturgi: String = "",
    val published: Boolean = false,
    @SerialName("created_at")
    val createdAt: String = "",
    @SerialName("updated_at")
    val updatedAt: String = ""
)

@Serializable
data class JadwalIbadah(
    val id: String = "",
    val tanggal: String = "",
    val waktu: String = "",
    val bahasa: String = "",
    val tempat: String = "",
    val wilayah: String = "",
    val pengkotbah: String = "",
    val organis: String = "",
    val singer: List<String> = emptyList(),
    @SerialName("opr_lcd")
    val oprLcd: String = "",
    val majelis: String = ""
)

@Serializable
data class JadwalSM(
    val id: String = "",
    val tanggal: String = "",
    val mc: String = "",
    val musik: String = "",
    @SerialName("kelas_balita")
    val kelasBalita: String = "",
    @SerialName("kelas_kecil")
    val kelasKecil: String = "",
    @SerialName("kelas_besar")
    val kelasBesar: String = "",
    @SerialName("kelas_remaja")
    val kelasRemaja: String = ""
)

@Serializable
data class Pengumuman(
    val id: String = "",
    val judul: String = "",
    val isi: String = "",
    @SerialName("tanggal_mulai")
    val tanggalMulai: String = "",
    @SerialName("tanggal_selesai")
    val tanggalSelesai: String = "",
    val kategori: String = "",
    val published: Boolean = false,
    @SerialName("created_at")
    val createdAt: String = ""
)

@Serializable
data class BacaanHarian(
    val id: String = "",
    val tanggal: String = "",
    @SerialName("bacaan_1")
    val bacaan1: String = "",
    val mazmur: String = "",
    @SerialName("bacaan_2")
    val bacaan2: String = "",
    val injil: String = ""
)

@Serializable
data class UlangTahun(
    val id: String = "",
    val nama: String = "",
    val tanggal: String = "",
    val wilayah: String = ""
)

@Serializable
data class DoaPokok(
    val id: String = "",
    val isi: String = "",
    val kategori: String = "",
    @SerialName("periode_mulai")
    val periodeMulai: String = "",
    @SerialName("periode_selesai")
    val periodeSelesai: String = ""
)

@Serializable
data class Persembahan(
    val id: String = "",
    val tanggal: String = "",
    @SerialName("kantung_merah")
    val kantungMerah: Double = 0.0,
    @SerialName("kantung_kuning")
    val kantungKuning: Double = 0.0,
    val bulanan: Double = 0.0,
    val pembangunan: Double = 0.0,
    val gota: Double = 0.0,
    val total: Double = 0.0,
    @SerialName("rincian_wilayah")
    val rincianWilayah: Map<String, Double> = emptyMap()
)

@Serializable
data class WargaDoakan(
    val id: String = "",
    val nama: String = "",
    val wilayah: String = "",
    val keterangan: String = "",
    val aktif: Boolean = true
)
