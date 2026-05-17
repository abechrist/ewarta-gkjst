import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const supabaseService = {
  async getWartaTerbaru() {
    const { data, error } = await supabase
      .from('warta')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    if (error) throw error
    return data
  },

  async getAllWarta() {
    const { data, error } = await supabase
      .from('warta')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createWarta(warta) {
    const { data, error } = await supabase
      .from('warta')
      .insert([warta])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updateWarta(id, warta) {
    const { data, error } = await supabase
      .from('warta')
      .update(warta)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteWarta(id) {
    const { error } = await supabase
      .from('warta')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async uploadPDF(file) {
    const fileName = `${Date.now()}_${file.name}`
    const { data, error } = await supabase.storage
      .from('warta-pdf')
      .upload(fileName, file)
    
    if (error) throw error
    
    const { data: publicUrl } = supabase.storage
      .from('warta-pdf')
      .getPublicUrl(fileName)
    
    return publicUrl.publicUrl
  },

  async getJadwalIbadah() {
    const { data, error } = await supabase
      .from('jadwal_ibadah')
      .select('*')
      .order('tanggal', { ascending: true })
    
    if (error) throw error
    return data
  },

  async createJadwalIbadah(jadwal) {
    const { data, error } = await supabase
      .from('jadwal_ibadah')
      .insert([jadwal])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updateJadwalIbadah(id, jadwal) {
    const { data, error } = await supabase
      .from('jadwal_ibadah')
      .update(jadwal)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteJadwalIbadah(id) {
    const { error } = await supabase
      .from('jadwal_ibadah')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async getPengumuman() {
    const { data, error } = await supabase
      .from('pengumuman')
      .select('*')
      .eq('published', true)
      .order('tanggal_mulai', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createPengumuman(pengumuman) {
    const { data, error } = await supabase
      .from('pengumuman')
      .insert([pengumuman])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updatePengumuman(id, pengumuman) {
    const { data, error } = await supabase
      .from('pengumuman')
      .update(pengumuman)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deletePengumuman(id) {
    const { error } = await supabase
      .from('pengumuman')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async getDoaPokok() {
    const { data, error } = await supabase
      .from('doa_pokok')
      .select('*')
      .order('periode_mulai', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createDoaPokok(doa) {
    const { data, error } = await supabase
      .from('doa_pokok')
      .insert([doa])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updateDoaPokok(id, doa) {
    const { data, error } = await supabase
      .from('doa_pokok')
      .update(doa)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteDoaPokok(id) {
    const { error } = await supabase
      .from('doa_pokok')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async getPersembahan() {
    const { data, error } = await supabase
      .from('persembahan')
      .select('*')
      .order('tanggal', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createPersembahan(persembahan) {
    const { data, error } = await supabase
      .from('persembahan')
      .insert([persembahan])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updatePersembahan(id, persembahan) {
    const { data, error } = await supabase
      .from('persembahan')
      .update(persembahan)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deletePersembahan(id) {
    const { error } = await supabase
      .from('persembahan')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
