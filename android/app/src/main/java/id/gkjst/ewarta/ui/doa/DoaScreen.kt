package id.gkjst.ewarta.ui.doa

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.RadioButtonUnchecked
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import id.gkjst.ewarta.data.model.DoaPokok
import id.gkjst.ewarta.data.model.UlangTahun
import id.gkjst.ewarta.data.model.WargaDoakan
import id.gkjst.ewarta.ui.theme.Navy
import id.gkjst.ewarta.ui.theme.Terracotta
import id.gkjst.ewarta.ui.theme.WarmCream
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun DoaScreen(
    navController: NavHostController,
    viewModel: DoaViewModel = hiltViewModel()
) {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Pokok Doa", "Ulang Tahun", "Dukung & Doakan")

    val doaPokok = viewModel.doaPokok.collectAsState().value
    val ulangTahun = viewModel.ulangTahun.collectAsState().value
    val wargaDoakan = viewModel.wargaDoakan.collectAsState().value
    val isLoading = viewModel.isLoading.collectAsState().value
    val error = viewModel.error.collectAsState().value
    val checkedDoaIds = viewModel.checkedDoaIds.collectAsState().value

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(WarmCream)
    ) {
        HeaderDoa()

        TabRow(
            selectedTabIndex = selectedTab,
            modifier = Modifier.fillMaxWidth(),
            containerColor = Navy,
            contentColor = androidx.compose.ui.graphics.Color.White
        ) {
            tabs.forEachIndexed { index, title ->
                Tab(
                    selected = selectedTab == index,
                    onClick = { selectedTab = index },
                    text = {
                        Text(
                            title,
                            style = MaterialTheme.typography.labelMedium,
                            fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal
                        )
                    }
                )
            }
        }

        when {
            isLoading -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(color = Navy)
                }
            }
            error != null -> {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Error: $error",
                        color = MaterialTheme.colorScheme.error,
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
            else -> {
                when (selectedTab) {
                    0 -> DoaPokokTab(doaPokok, checkedDoaIds, viewModel)
                    1 -> UlangTahunTab(ulangTahun)
                    2 -> DukungDoakanTab(wargaDoakan)
                }
            }
        }
    }
}

@Composable
fun HeaderDoa() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(Navy)
            .padding(16.dp)
    ) {
        Text(
            text = "Doa & Bacaan",
            style = MaterialTheme.typography.displaySmall,
            color = androidx.compose.ui.graphics.Color.White,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun DoaPokokTab(
    doaPokok: List<DoaPokok>,
    checkedIds: Set<String>,
    viewModel: DoaViewModel
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        if (doaPokok.isEmpty()) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(32.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Tidak ada pokok doa",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        } else {
            items(doaPokok) { doa ->
                DoaPokokCard(
                    doa = doa,
                    isChecked = checkedIds.contains(doa.id),
                    onCheckChange = { viewModel.toggleDoaChecked(doa.id) }
                )
            }
        }
    }
}

@Composable
fun DoaPokokCard(
    doa: DoaPokok,
    isChecked: Boolean,
    onCheckChange: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(8.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isChecked) Terracotta.copy(alpha = 0.1f) else androidx.compose.ui.graphics.Color.White
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.Top
        ) {
            IconButton(
                onClick = onCheckChange,
                modifier = Modifier.size(24.dp)
            ) {
                Icon(
                    imageVector = if (isChecked) Icons.Default.CheckCircle else Icons.Default.RadioButtonUnchecked,
                    contentDescription = null,
                    tint = if (isChecked) Terracotta else Navy,
                    modifier = Modifier.size(24.dp)
                )
            }

            Column(
                modifier = Modifier.weight(1f)
            ) {
                Text(
                    text = doa.kategori.capitalize(),
                    style = MaterialTheme.typography.labelSmall,
                    color = Terracotta,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = doa.isi,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }
    }
}

@Composable
fun UlangTahunTab(ulangTahun: List<UlangTahun>) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        if (ulangTahun.isEmpty()) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(32.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Tidak ada ulang tahun minggu ini",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        } else {
            items(ulangTahun) { ut ->
                UlangTahunCard(ut)
            }
        }
    }
}

@Composable
fun UlangTahunCard(ulangTahun: UlangTahun) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(8.dp),
        colors = CardDefaults.cardColors(containerColor = androidx.compose.ui.graphics.Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier.padding(12.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = ulangTahun.nama,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = Navy
                    )
                    Text(
                        text = ulangTahun.wilayah,
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
                Surface(
                    color = Terracotta,
                    shape = RoundedCornerShape(4.dp)
                ) {
                    Text(
                        text = "🎂 ${ulangTahun.tanggal}",
                        style = MaterialTheme.typography.labelMedium,
                        color = androidx.compose.ui.graphics.Color.White,
                        modifier = Modifier.padding(8.dp, 4.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun DukungDoakanTab(wargaDoakan: List<WargaDoakan>) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        if (wargaDoakan.isEmpty()) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(32.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Tidak ada warga yang perlu didoakan",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        } else {
            items(wargaDoakan) { warga ->
                WargaDoakanCard(warga)
            }
        }
    }
}

@Composable
fun WargaDoakanCard(warga: WargaDoakan) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(8.dp),
        colors = CardDefaults.cardColors(containerColor = androidx.compose.ui.graphics.Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier.padding(12.dp)
        ) {
            Text(
                text = warga.nama,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Navy
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = warga.wilayah,
                style = MaterialTheme.typography.labelSmall,
                color = Terracotta
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = warga.keterangan,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurface
            )
        }
    }
}

fun String.capitalize(): String {
    return this.replaceFirstChar { if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString() }
}
