package id.gkjst.ewarta.di

import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import id.gkjst.ewarta.data.remote.SupabaseService
import id.gkjst.ewarta.data.repository.*
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Singleton
    @Provides
    fun provideSupabaseService(): SupabaseService {
        return SupabaseService()
    }

    @Singleton
    @Provides
    fun provideWartaRepository(supabaseService: SupabaseService): WartaRepository {
        return WartaRepository(supabaseService)
    }

    @Singleton
    @Provides
    fun provideJadwalRepository(supabaseService: SupabaseService): JadwalRepository {
        return JadwalRepository(supabaseService)
    }

    @Singleton
    @Provides
    fun providePengumumanRepository(supabaseService: SupabaseService): PengumumanRepository {
        return PengumumanRepository(supabaseService)
    }

    @Singleton
    @Provides
    fun provideDoaRepository(supabaseService: SupabaseService): DoaRepository {
        return DoaRepository(supabaseService)
    }

    @Singleton
    @Provides
    fun provideKeuanganRepository(supabaseService: SupabaseService): KeuanganRepository {
        return KeuanganRepository(supabaseService)
    }
}
