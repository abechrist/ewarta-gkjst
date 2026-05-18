const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ewarta-backend.railway.app'

export const apiService = {
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!response.ok) throw new Error('Login failed')
    return response.json()
  },

  async logout() {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    if (!response.ok) throw new Error('Logout failed')
    localStorage.removeItem('token')
    return response.json()
  },

  async getWarta() {
    const response = await fetch(`${API_BASE_URL}/api/warta`)
    if (!response.ok) throw new Error('Failed to fetch warta')
    return response.json()
  },

  async createWarta(warta) {
    const response = await fetch(`${API_BASE_URL}/api/warta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(warta)
    })
    if (!response.ok) throw new Error('Failed to create warta')
    return response.json()
  },

  async updateWarta(id, warta) {
    const response = await fetch(`${API_BASE_URL}/api/warta/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(warta)
    })
    if (!response.ok) throw new Error('Failed to update warta')
    return response.json()
  },

  async deleteWarta(id) {
    const response = await fetch(`${API_BASE_URL}/api/warta/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete warta')
    return response.json()
  },

  async getJadwalIbadah() {
    const response = await fetch(`${API_BASE_URL}/api/jadwal-ibadah`)
    if (!response.ok) throw new Error('Failed to fetch jadwal')
    return response.json()
  },

  async createJadwalIbadah(jadwal) {
    const response = await fetch(`${API_BASE_URL}/api/jadwal-ibadah`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jadwal)
    })
    if (!response.ok) throw new Error('Failed to create jadwal')
    return response.json()
  },

  async updateJadwalIbadah(id, jadwal) {
    const response = await fetch(`${API_BASE_URL}/api/jadwal-ibadah/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jadwal)
    })
    if (!response.ok) throw new Error('Failed to update jadwal')
    return response.json()
  },

  async deleteJadwalIbadah(id) {
    const response = await fetch(`${API_BASE_URL}/api/jadwal-ibadah/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete jadwal')
    return response.json()
  },

  async getPengumuman() {
    const response = await fetch(`${API_BASE_URL}/api/pengumuman`)
    if (!response.ok) throw new Error('Failed to fetch pengumuman')
    return response.json()
  },

  async createPengumuman(pengumuman) {
    const response = await fetch(`${API_BASE_URL}/api/pengumuman`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pengumuman)
    })
    if (!response.ok) throw new Error('Failed to create pengumuman')
    return response.json()
  },

  async updatePengumuman(id, pengumuman) {
    const response = await fetch(`${API_BASE_URL}/api/pengumuman/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pengumuman)
    })
    if (!response.ok) throw new Error('Failed to update pengumuman')
    return response.json()
  },

  async deletePengumuman(id) {
    const response = await fetch(`${API_BASE_URL}/api/pengumuman/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete pengumuman')
    return response.json()
  },

  async getDoaPokok() {
    const response = await fetch(`${API_BASE_URL}/api/doa-pokok`)
    if (!response.ok) throw new Error('Failed to fetch doa')
    return response.json()
  },

  async createDoaPokok(doa) {
    const response = await fetch(`${API_BASE_URL}/api/doa-pokok`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doa)
    })
    if (!response.ok) throw new Error('Failed to create doa')
    return response.json()
  },

  async updateDoaPokok(id, doa) {
    const response = await fetch(`${API_BASE_URL}/api/doa-pokok/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doa)
    })
    if (!response.ok) throw new Error('Failed to update doa')
    return response.json()
  },

  async deleteDoaPokok(id) {
    const response = await fetch(`${API_BASE_URL}/api/doa-pokok/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete doa')
    return response.json()
  },

  async getPersembahan() {
    const response = await fetch(`${API_BASE_URL}/api/persembahan`)
    if (!response.ok) throw new Error('Failed to fetch persembahan')
    return response.json()
  },

  async createPersembahan(persembahan) {
    const response = await fetch(`${API_BASE_URL}/api/persembahan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(persembahan)
    })
    if (!response.ok) throw new Error('Failed to create persembahan')
    return response.json()
  },

  async updatePersembahan(id, persembahan) {
    const response = await fetch(`${API_BASE_URL}/api/persembahan/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(persembahan)
    })
    if (!response.ok) throw new Error('Failed to update persembahan')
    return response.json()
  },

  async deletePersembahan(id) {
    const response = await fetch(`${API_BASE_URL}/api/persembahan/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete persembahan')
    return response.json()
  }
}
