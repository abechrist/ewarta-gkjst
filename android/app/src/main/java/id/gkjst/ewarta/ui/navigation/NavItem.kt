package id.gkjst.ewarta.ui.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material.icons.filled.Article
import androidx.compose.ui.graphics.vector.ImageVector

sealed class NavItem(
    val route: String,
    val label: String,
    val icon: ImageVector
) {
    object Home : NavItem("home", "Beranda", Icons.Default.Home)
    object Jadwal : NavItem("jadwal", "Jadwal", Icons.Default.Schedule)
    object Pengumuman : NavItem("pengumuman", "Pengumuman", Icons.Default.Notifications)
    object Doa : NavItem("doa", "Doa & Bacaan", Icons.Default.Info)
    object Warta : NavItem("warta", "Warta", Icons.Default.Article)
    object Lainnya : NavItem("lainnya", "Lainnya", Icons.Default.MoreVert)
}

val navItems = listOf(
    NavItem.Home,
    NavItem.Jadwal,
    NavItem.Pengumuman,
    NavItem.Doa,
    NavItem.Lainnya
)
