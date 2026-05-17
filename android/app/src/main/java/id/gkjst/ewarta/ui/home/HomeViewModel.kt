package id.gkjst.ewarta.ui.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import id.gkjst.ewarta.data.model.Warta
import id.gkjst.ewarta.data.repository.WartaRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val wartaRepository: WartaRepository
) : ViewModel() {

    private val _wartaTerbaru = MutableStateFlow<Warta?>(null)
    val wartaTerbaru: StateFlow<Warta?> = _wartaTerbaru

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error

    init {
        loadWartaTerbaru()
    }

    fun loadWartaTerbaru() {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                val warta = wartaRepository.getWartaTerbaru()
                _wartaTerbaru.value = warta
            } catch (e: Exception) {
                _error.value = e.message ?: "Terjadi kesalahan"
            } finally {
                _isLoading.value = false
            }
        }
    }
}
