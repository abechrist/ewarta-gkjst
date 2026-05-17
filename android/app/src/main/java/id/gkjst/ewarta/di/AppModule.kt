package id.gkjst.ewarta.di

import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import id.gkjst.ewarta.data.remote.ApiService
import id.gkjst.ewarta.data.repository.*
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Singleton
    @Provides
    fun provideApiService(): ApiService {
        return ApiService()
    }

    @Singleton
    @Provides
    fun provideWartaRepository(apiService: ApiService): WartaRepository {
        return WartaRepository(apiService)
    }

    @Singleton
    @Provides
    fun provideJadwalRepository(apiService: ApiService): JadwalRepository {
        return JadwalRepository(apiService)
    }

    @Singleton
    @Provides
    fun providePengumumanRepository(apiService: ApiService): PengumumanRepository {
        return PengumumanRepository(apiService)
    }

    @Singleton
    @Provides
    fun provideDoaRepository(apiService: ApiService): DoaRepository {
        return DoaRepository(apiService)
    }

    @Singleton
    @Provides
    fun provideKeuanganRepository(apiService: ApiService): KeuanganRepository {
        return KeuanganRepository(apiService)
    }
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
