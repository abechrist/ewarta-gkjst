package id.gkjst.ewarta.ui.info

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import id.gkjst.ewarta.ui.theme.Navy
import id.gkjst.ewarta.ui.theme.Terracotta
import id.gkjst.ewarta.ui.theme.WarmCream

@Composable
fun LainnyaScreen(navController: NavHostController) {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Keuangan", "Info Gereja")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(WarmCream)
    ) {
        HeaderLainnya()

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

        when (selectedTab) {
            0 -> KeuanganTab()
            1 -> InfoGerejTab()
        }
    }
}

@Composable
fun HeaderLainnya() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(Navy)
            .padding(16.dp)
    ) {
        Text(
            text = "Lainnya",
            style = MaterialTheme.typography.displaySmall,
            color = androidx.compose.ui.graphics.Color.White,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun KeuanganTab() {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(
                text = "Laporan Persembahan Mingguan",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = Navy,
                modifier = Modifier.padding(bottom = 8.dp)
            )
        }

        item {
            PersembahanCard(
                kategori = "Kantung Merah",
                jumlah = "Rp 2.500.000",
                persentase = 35
            )
        }

        item {
            PersembahanCard(
                kategori = "Kantung Kuning",
                jumlah = "Rp 1.800.000",
                persentase = 25
            )
        }

        item {
            PersembahanCard(
                kategori = "Bulanan",
                jumlah = "Rp 2.200.000",
                persentase = 30
            )
        }

        item {
            PersembahanCard(
                kategori = "Pembangunan",
                jumlah = "Rp 500.000",
                persentase = 7
            )
        }

        item {
            PersembahanCard(
                kategori = "GOTA",
                jumlah = "Rp 200.000",
                persentase = 3
            )
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(8.dp),
                colors = CardDefaults.cardColors(containerColor = Terracotta),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp)
                ) {
                    Text(
                        text = "Total Persembahan",
                        style = MaterialTheme.typography.labelMedium,
                        color = androidx.compose.ui.graphics.Color.White
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Rp 7.200.000",
                        style = MaterialTheme.typography.displaySmall,
                        fontWeight = FontWeight.Bold,
                        color = androidx.compose.ui.graphics.Color.White
                    )
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = "Rincian per Wilayah",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Navy
            )
        }

        item {
            WilayahCard(wilayah = "Wilayah I", jumlah = "Rp 1.800.000")
        }

        item {
            WilayahCard(wilayah = "Wilayah II", jumlah = "Rp 1.600.000")
        }

        item {
            WilayahCard(wilayah = "Wilayah III", jumlah = "Rp 1.900.000")
        }

        item {
            WilayahCard(wilayah = "Wilayah IV", jumlah = "Rp 1.500.000")
        }

        item {
            WilayahCard(wilayah = "Pep. Nyamat", jumlah = "Rp 400.000")
        }
    }
}

@Composable
fun PersembahanCard(
    kategori: String,
    jumlah: String,
    persentase: Int
) {
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
                Text(
                    text = kategori,
                    style = MaterialTheme.typography.labelMedium,
                    fontWeight = FontWeight.Bold,
                    color = Navy
                )
                Text(
                    text = "$persentase%",
                    style = MaterialTheme.typography.labelSmall,
                    color = Terracotta,
                    fontWeight = FontWeight.Bold
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            LinearProgressIndicator(
                progress = persentase / 100f,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(8.dp),
                color = Terracotta,
                trackColor = WarmCream
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = jumlah,
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = FontWeight.SemiBold,
                color = MaterialTheme.colorScheme.onSurface
            )
        }
    }
}

@Composable
fun WilayahCard(wilayah: String, jumlah: String) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(8.dp),
        colors = CardDefaults.cardColors(containerColor = androidx.compose.ui.graphics.Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = wilayah,
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold,
                color = Navy
            )
            Text(
                text = jumlah,
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.SemiBold,
                color = Terracotta
            )
        }
    }
}

@Composable
fun InfoGerejTab() {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(
                text = "GKJ Salatiga Timur",
                style = MaterialTheme.typography.displaySmall,
                fontWeight = FontWeight.Bold,
                color = Navy
            )
        }

        item {
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
                        text = "Visi & Misi",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = Navy,
                        modifier = Modifier.padding(bottom = 8.dp)
                    )
                    Text(
                        text = "Visi: Menjadi gereja yang hidup, berkembang, dan melayani dengan penuh kasih sayang kepada semua orang.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurface,
                        modifier = Modifier.padding(bottom = 8.dp)
                    )
                    Text(
                        text = "Misi: Memberitakan Injil Yesus Kristus, membina jemaat dalam iman, dan melayani masyarakat dengan tulus ikhlas.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        }

        item {
            InfoContactCard(
                icon = Icons.Default.LocationOn,
                label = "Alamat",
                value = "Jl. Tanggulayu No. 7, RT 02 RW VII\nNanggulan, Kutowinangun Kidul\nKec. Tingkir, Kota Salatiga 50742"
            )
        }

        item {
            InfoContactCard(
                icon = Icons.Default.Phone,
                label = "Kantor Gereja",
                value = "085643175871"
            )
        }

        item {
            InfoContactCard(
                icon = Icons.Default.Email,
                label = "Email",
                value = "gkjst.salatigatimur@gmail.com"
            )
        }

        item {
            Text(
                text = "Kontak Penting",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Navy,
                modifier = Modifier.padding(top = 8.dp, bottom = 8.dp)
            )
        }

        item {
            ContactPersonCard(
                nama = "Pdt. S.B. Wismono",
                peran = "Pendeta",
                kontak = "085868346269"
            )
        }

        item {
            ContactPersonCard(
                nama = "Pnt. Sri Hartono",
                peran = "Ketua Majelis",
                kontak = "081225704915"
            )
        }

        item {
            Text(
                text = "Rekening Persembahan",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Navy,
                modifier = Modifier.padding(top = 8.dp, bottom = 8.dp)
            )
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(8.dp),
                colors = CardDefaults.cardColors(containerColor = Terracotta.copy(alpha = 0.1f)),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(
                    modifier = Modifier.padding(12.dp)
                ) {
                    Text(
                        text = "Bank BCA",
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.Bold,
                        color = Navy
                    )
                    Text(
                        text = "No. Rekening: 1234567890",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = "Atas Nama: GKJ Salatiga Timur",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        }

        item {
            Text(
                text = "Media Sosial",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Navy,
                modifier = Modifier.padding(top = 8.dp, bottom = 8.dp)
            )
        }

        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(androidx.compose.foundation.rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                SocialMediaButton("YouTube", "GKJ Salatiga Timur")
                SocialMediaButton("Instagram", "@gkjsalatigatimur")
                SocialMediaButton("Facebook", "GKJ Salatiga Timur")
            }
        }

        item {
            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}

@Composable
fun InfoContactCard(
    icon: androidx.compose.material.icons.Icons,
    label: String,
    value: String
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(8.dp),
        colors = CardDefaults.cardColors(containerColor = androidx.compose.ui.graphics.Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.Top
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = Terracotta,
                modifier = Modifier.size(24.dp)
            )
            Column {
                Text(
                    text = label,
                    style = MaterialTheme.typography.labelMedium,
                    fontWeight = FontWeight.Bold,
                    color = Navy
                )
                Text(
                    text = value,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }
    }
}

@Composable
fun ContactPersonCard(
    nama: String,
    peran: String,
    kontak: String
) {
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
                text = nama,
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold,
                color = Navy
            )
            Text(
                text = peran,
                style = MaterialTheme.typography.labelSmall,
                color = Terracotta
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = kontak,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurface
            )
        }
    }
}

@Composable
fun SocialMediaButton(platform: String, handle: String) {
    Button(
        onClick = {},
        shape = RoundedCornerShape(8.dp),
        colors = ButtonDefaults.buttonColors(containerColor = Navy)
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.padding(8.dp)
        ) {
            Text(
                text = platform,
                style = MaterialTheme.typography.labelSmall,
                color = androidx.compose.ui.graphics.Color.White,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = handle,
                style = MaterialTheme.typography.labelSmall,
                color = androidx.compose.ui.graphics.Color.White
            )
        }
    }
}
