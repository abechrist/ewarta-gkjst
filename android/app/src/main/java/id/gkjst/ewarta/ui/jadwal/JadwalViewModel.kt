package id.gkjst.ewarta.ui.jadwal

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import id.gkjst.ewarta.data.model.BacaanHarian
import id.gkjst.ewarta.data.model.JadwalIbadah
import id.gkjst.ewarta.data.model.JadwalSM
import id.gkjst.ewarta.data.repository.JadwalRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class JadwalViewModel @Inject constructor(
    private val jadwalRepository: JadwalRepository
) : ViewModel() {

    private val _jadwalIbadah = MutableStateFlow<List<JadwalIbadah>>(emptyList())
    val jadwalIbadah: StateFlow<List<JadwalIbadah>> = _jadwalIbadah

    private val _jadwalSM = MutableStateFlow<List<JadwalSM>>(emptyList())
    val jadwalSM: StateFlow<List<JadwalSM>> = _jadwalSM

    private val _bacaanHarian = MutableStateFlow<List<BacaanHarian>>(emptyList())
    val bacaanHarian: StateFlow<List<BacaanHarian>> = _bacaanHarian

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error

    private val _selectedWilayah = MutableStateFlow<String?>(null)
    val selectedWilayah: StateFlow<String?> = _selectedWilayah

    private val _selectedBahasa = MutableStateFlow<String?>(null)
    val selectedBahasa: StateFlow<String?> = _selectedBahasa

    init {
        loadAllJadwal()
    }

    fun loadAllJadwal() {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                val ibadah = jadwalRepository.getJadwalIbadah()
                val sm = jadwalRepository.getJadwalSM()
                val bacaan = jadwalRepository.getBacaanHarian()

                _jadwalIbadah.value = ibadah
                _jadwalSM.value = sm
                _bacaanHarian.value = bacaan
            } catch (e: Exception) {
                _error.value = e.message ?: "Terjadi kesalahan"
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun setWilayahFilter(wilayah: String?) {
        _selectedWilayah.value = wilayah
    }

    fun setBahasaFilter(bahasa: String?) {
        _selectedBahasa.value = bahasa
    }
}
