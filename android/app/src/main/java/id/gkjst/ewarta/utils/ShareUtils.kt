package id.gkjst.ewarta.utils

import android.content.Context
import android.content.Intent
import android.net.Uri

object ShareUtils {
    fun shareToWhatsApp(context: Context, text: String) {
        try {
            val intent = Intent().apply {
                action = Intent.ACTION_SEND
                putExtra(Intent.EXTRA_TEXT, text)
                type = "text/plain"
                setPackage("com.whatsapp")
            }
            context.startActivity(intent)
        } catch (e: Exception) {
            val intent = Intent().apply {
                action = Intent.ACTION_SEND
                putExtra(Intent.EXTRA_TEXT, text)
                type = "text/plain"
            }
            context.startActivity(Intent.createChooser(intent, "Bagikan ke"))
        }
    }

    fun shareText(context: Context, text: String, title: String = "Bagikan") {
        val intent = Intent().apply {
            action = Intent.ACTION_SEND
            putExtra(Intent.EXTRA_TEXT, text)
            type = "text/plain"
        }
        context.startActivity(Intent.createChooser(intent, title))
    }

    fun openBibleApp(context: Context, verse: String) {
        try {
            val intent = Intent().apply {
                action = Intent.ACTION_VIEW
                data = Uri.parse("bible://$verse")
            }
            context.startActivity(intent)
        } catch (e: Exception) {
            val searchIntent = Intent().apply {
                action = Intent.ACTION_VIEW
                data = Uri.parse("https://www.bible.com/search?q=$verse")
            }
            context.startActivity(searchIntent)
        }
    }
}
