package id.gkjst.ewarta.data.remote

import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.postgrest.Postgrest
import io.github.jan.supabase.storage.Storage

object SupabaseConfig {
    private const val SUPABASE_URL = "https://ewarta-gkjst.supabase.co"
    private const val SUPABASE_ANON_KEY = "your_anon_key_here"

    val client: SupabaseClient = createSupabaseClient(
        supabaseUrl = SUPABASE_URL,
        supabaseKey = SUPABASE_ANON_KEY
    ) {
        install(Postgrest)
        install(Storage)
    }
}
