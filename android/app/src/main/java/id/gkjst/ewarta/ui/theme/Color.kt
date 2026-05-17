package id.gkjst.ewarta.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val Navy = Color(0xFF1B3A4B)
val Terracotta = Color(0xFFE29578)
val WarmCream = Color(0xFFFDF6EC)
val NearBlack = Color(0xFF1A1A1A)
val Ivory = Color(0xFFFEFDF5)
val SoftRed = Color(0xFFC1121F)
val LightGray = Color(0xFFF5F5F5)
val DarkGray = Color(0xFF757575)

private val LightColorScheme = lightColorScheme(
    primary = Navy,
    secondary = Terracotta,
    tertiary = Terracotta,
    background = WarmCream,
    surface = Ivory,
    onPrimary = Color.White,
    onSecondary = Color.White,
    onBackground = NearBlack,
    onSurface = NearBlack,
    error = SoftRed,
    onError = Color.White
)

private val DarkColorScheme = darkColorScheme(
    primary = Navy,
    secondary = Terracotta,
    tertiary = Terracotta,
    background = Color(0xFF0F1419),
    surface = Color(0xFF1A1F26),
    onPrimary = Color.White,
    onSecondary = Color.White,
    onBackground = Color.White,
    onSurface = Color.White,
    error = SoftRed,
    onError = Color.White
)

@Composable
fun eWARTATheme(
    darkTheme: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
