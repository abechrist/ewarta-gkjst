package id.gkjst.ewarta.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import id.gkjst.ewarta.ui.home.HomeScreen
import id.gkjst.ewarta.ui.jadwal.JadwalScreen
import id.gkjst.ewarta.ui.pengumuman.PengumumanScreen
import id.gkjst.ewarta.ui.doa.DoaScreen
import id.gkjst.ewarta.ui.warta.WartaScreen
import id.gkjst.ewarta.ui.info.LainnyaScreen

@Composable
fun NavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = NavItem.Home.route
    ) {
        composable(NavItem.Home.route) {
            HomeScreen(navController)
        }
        composable(NavItem.Jadwal.route) {
            JadwalScreen(navController)
        }
        composable(NavItem.Pengumuman.route) {
            PengumumanScreen(navController)
        }
        composable(NavItem.Doa.route) {
            DoaScreen(navController)
        }
        composable(NavItem.Warta.route) {
            WartaScreen(navController)
        }
        composable(NavItem.Lainnya.route) {
            LainnyaScreen(navController)
        }
    }
}
