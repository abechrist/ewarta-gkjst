package id.gkjst.ewarta.ui.pengumuman

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import id.gkjst.ewarta.data.model.Pengumuman
import id.gkjst.ewarta.data.repository.PengumumanRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class PengumumanViewModel @Inject constructor(
    private val pengumumanRepository: PengumumanRepository
) : ViewModel() {

    private val _pengumuman = MutableStateFlow<List<Pengumuman>>(emptyList())
    val pengumuman: StateFlow<List<Pengumuman>> = _pengumuman

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error

    private val _selectedKategori = MutableStateFlow<String?>(null)
    val selectedKategori: StateFlow<String?> = _selectedKategori

    init {
        loadPengumuman()
    }

    fun loadPengumuman() {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                val data = pengumumanRepository.getPengumuman()
                _pengumuman.value = data
            } catch (e: Exception) {
                _error.value = e.message ?: "Terjadi kesalahan"
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun setKategoriFilter(kategori: String?) {
        _selectedKategori.value = kategori
    }
}
