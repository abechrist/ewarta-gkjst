package id.gkjst.ewarta.ui.jadwal

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import id.gkjst.ewarta.data.model.BacaanHarian
import id.gkjst.ewarta.data.model.JadwalIbadah
import id.gkjst.ewarta.data.model.JadwalSM
import id.gkjst.ewarta.ui.theme.Navy
import id.gkjst.ewarta.ui.theme.Terracotta
import id.gkjst.ewarta.ui.theme.WarmCream
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun JadwalScreen(
    navController: NavHostController,
    viewModel: JadwalViewModel = hiltViewModel()
) {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Ibadah", "Sekolah Minggu", "Leksionari")

    val jadwalIbadah = viewModel.jadwalIbadah.collectAsState().value
    val jadwalSM = viewModel.jadwalSM.collectAsState().value
    val bacaanHarian = viewModel.bacaanHarian.collectAsState().value
    val isLoading = viewModel.isLoading.collectAsState().value
    val error = viewModel.error.collectAsState().value

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(WarmCream)
    ) {
        HeaderJadwal()

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
                    modifier = Modifier
                        .fillMaxSize(),
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
                    0 -> JadwalIbadahTab(jadwalIbadah, viewModel)
                    1 -> JadwalSMTab(jadwalSM)
                    2 -> LeksionariTab(bacaanHarian)
                }
            }
        }
    }
}

@Composable
fun HeaderJadwal() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(Navy)
            .padding(16.dp)
    ) {
        Text(
            text = "Jadwal",
            style = MaterialTheme.typography.displaySmall,
            color = androidx.compose.ui.graphics.Color.White,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun JadwalIbadahTab(
    jadwal: List<JadwalIbadah>,
    viewModel: JadwalViewModel
) {
    val selectedWilayah = viewModel.selectedWilayah.collectAsState().value
    val selectedBahasa = viewModel.selectedBahasa.collectAsState().value

    val wilayahList = jadwal.map { it.wilayah }.distinct()
    val bahasaList = jadwal.map { it.bahasa }.distinct()

    val filteredJadwal = jadwal.filter { j ->
        (selectedWilayah == null || j.wilayah == selectedWilayah) &&
        (selectedBahasa == null || j.bahasa == selectedBahasa)
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            FilterRow(
                wilayahList = wilayahList,
                bahasaList = bahasaList,
                selectedWilayah = selectedWilayah,
                selectedBahasa = selectedBahasa,
                onWilayahSelected = { viewModel.setWilayahFilter(it) },
                onBahasaSelected = { viewModel.setBahasaFilter(it) }
            )
        }

        items(filteredJadwal) { jadwal ->
            JadwalIbadahCard(jadwal)
        }
    }
}

@Composable
fun FilterRow(
    wilayahList: List<String>,
    bahasaList: List<String>,
    selectedWilayah: String?,
    selectedBahasa: String?,
    onWilayahSelected: (String?) -> Unit,
    onBahasaSelected: (String?) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(androidx.compose.ui.graphics.Color.White, RoundedCornerShape(8.dp))
            .padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = "Filter",
            style = MaterialTheme.typography.labelMedium,
            fontWeight = FontWeight.Bold,
            color = Navy
        )

        FilterChipRow(
            label = "Wilayah",
            options = wilayahList,
            selected = selectedWilayah,
            onSelected = onWilayahSelected
        )

        FilterChipRow(
            label = "Bahasa",
            options = bahasaList,
            selected = selectedBahasa,
            onSelected = onBahasaSelected
        )
    }
}

@Composable
fun FilterChipRow(
    label: String,
    options: List<String>,
    selected: String?,
    onSelected: (String?) -> Unit
) {
    Column {
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurface
        )
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState()),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            FilterChip(
                selected = selected == null,
                onClick = { onSelected(null) },
                label = { Text("Semua") }
            )
            options.forEach { option ->
                FilterChip(
                    selected = selected == option,
                    onClick = { onSelected(option) },
                    label = { Text(option) }
                )
            }
        }
    }
}

@Composable
fun JadwalIbadahCard(jadwal: JadwalIbadah) {
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
                        text = "${jadwal.waktu} - ${jadwal.tempat}",
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.Bold,
                        color = Navy
                    )
                    Text(
                        text = jadwal.wilayah,
                        style = MaterialTheme.typography.labelSmall,
                        color = Terracotta
                    )
                }
                Text(
                    text = jadwal.bahasa,
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            JadwalDetailRow("Pengkotbah", jadwal.pengkotbah)
            JadwalDetailRow("Organis", jadwal.organis)
            if (jadwal.singer.isNotEmpty()) {
                JadwalDetailRow("Singer", jadwal.singer.joinToString(", "))
            }
            JadwalDetailRow("Majelis", jadwal.majelis)
        }
    }
}

@Composable
fun JadwalDetailRow(label: String, value: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)
    ) {
        Text(
            text = "$label:",
            style = MaterialTheme.typography.bodySmall,
            fontWeight = FontWeight.SemiBold,
            color = MaterialTheme.colorScheme.onSurface,
            modifier = Modifier.width(80.dp)
        )
        Text(
            text = value,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}

@Composable
fun JadwalSMTab(jadwal: List<JadwalSM>) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(jadwal) { sm ->
            JadwalSMCard(sm)
        }
    }
}

@Composable
fun JadwalSMCard(sm: JadwalSM) {
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
                text = formatDate(sm.tanggal),
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold,
                color = Navy
            )
            Spacer(modifier = Modifier.height(8.dp))
            JadwalDetailRow("MC", sm.mc)
            JadwalDetailRow("Musik", sm.musik)
            JadwalDetailRow("Balita", sm.kelasBalita)
            JadwalDetailRow("Kecil", sm.kelasKecil)
            JadwalDetailRow("Besar", sm.kelasBesar)
            JadwalDetailRow("Remaja", sm.kelasRemaja)
        }
    }
}

@Composable
fun LeksionariTab(bacaan: List<BacaanHarian>) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(bacaan) { b ->
            BacaanHarianCard(b)
        }
    }
}

@Composable
fun BacaanHarianCard(bacaan: BacaanHarian) {
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
                text = formatDate(bacaan.tanggal),
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold,
                color = Navy
            )
            Spacer(modifier = Modifier.height(8.dp))
            JadwalDetailRow("Bacaan I", bacaan.bacaan1)
            JadwalDetailRow("Mazmur", bacaan.mazmur)
            JadwalDetailRow("Bacaan II", bacaan.bacaan2)
            JadwalDetailRow("Injil", bacaan.injil)
        }
    }
}

fun formatDate(timestamp: com.google.firebase.Timestamp?): String {
    return if (timestamp != null) {
        val sdf = SimpleDateFormat("EEEE, dd MMM yyyy", Locale("id", "ID"))
        sdf.format(timestamp.toDate())
    } else {
        ""
    }
}
