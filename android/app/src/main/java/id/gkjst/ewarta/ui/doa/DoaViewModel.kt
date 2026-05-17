package id.gkjst.ewarta.ui.doa

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import id.gkjst.ewarta.data.model.BacaanHarian
import id.gkjst.ewarta.data.model.DoaPokok
import id.gkjst.ewarta.data.model.UlangTahun
import id.gkjst.ewarta.data.model.WargaDoakan
import id.gkjst.ewarta.data.repository.DoaRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class DoaViewModel @Inject constructor(
    private val doaRepository: DoaRepository
) : ViewModel() {

    private val _doaPokok = MutableStateFlow<List<DoaPokok>>(emptyList())
    val doaPokok: StateFlow<List<DoaPokok>> = _doaPokok

    private val _ulangTahun = MutableStateFlow<List<UlangTahun>>(emptyList())
    val ulangTahun: StateFlow<List<UlangTahun>> = _ulangTahun

    private val _wargaDoakan = MutableStateFlow<List<WargaDoakan>>(emptyList())
    val wargaDoakan: StateFlow<List<WargaDoakan>> = _wargaDoakan

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error

    private val _checkedDoaIds = MutableStateFlow<Set<String>>(emptySet())
    val checkedDoaIds: StateFlow<Set<String>> = _checkedDoaIds

    init {
        loadAllData()
    }

    fun loadAllData() {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                val doa = doaRepository.getDoaPokok()
                val ulang = doaRepository.getUlangTahun()
                val warga = doaRepository.getWargaDoakan()

                _doaPokok.value = doa
                _ulangTahun.value = ulang
                _wargaDoakan.value = warga
            } catch (e: Exception) {
                _error.value = e.message ?: "Terjadi kesalahan"
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun toggleDoaChecked(doaId: String) {
        val current = _checkedDoaIds.value.toMutableSet()
        if (current.contains(doaId)) {
            current.remove(doaId)
        } else {
            current.add(doaId)
        }
        _checkedDoaIds.value = current
    }
}
