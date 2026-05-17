package id.gkjst.ewarta.ui.warta

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
class WartaViewModel @Inject constructor(
    private val wartaRepository: WartaRepository
) : ViewModel() {

    private val _allWarta = MutableStateFlow<List<Warta>>(emptyList())
    val allWarta: StateFlow<List<Warta>> = _allWarta

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error

    init {
        loadAllWarta()
    }

    fun loadAllWarta() {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                val warta = wartaRepository.getAllWarta()
                _allWarta.value = warta
            } catch (e: Exception) {
                _error.value = e.message ?: "Terjadi kesalahan"
            } finally {
                _isLoading.value = false
            }
        }
    }
}
