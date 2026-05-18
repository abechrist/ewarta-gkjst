import React, { useState, useEffect } from 'react';
import { apiService } from '@/apiService';

export default function DoaManager() {
  const [doa, setDoa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    isi: '',
    kategori: 'jemaat',
    periode_mulai: '',
    periode_selesai: '',
  });

  useEffect(() => {
    loadDoa();
  }, []);

  const loadDoa = async () => {
    setLoading(true);
    try {
      const data = await apiService.getDoaPokok();
      setDoa(data);
    } catch (error) {
      console.error('Error loading doa:', error);
      alert('Error loading doa');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await apiService.updateDoaPokok(editingId, formData);
        alert('Doa updated successfully');
      } else {
        await apiService.createDoaPokok(formData);
        alert('Doa created successfully');
      }

      setFormData({
        isi: '',
        kategori: 'jemaat',
        periode_mulai: '',
        periode_selesai: '',
      });
      setEditingId(null);
      setShowForm(false);
      loadDoa();
    } catch (error) {
      console.error('Error saving doa:', error);
      alert('Error saving doa: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus doa ini?')) {
      try {
        await apiService.deleteDoaPokok(id);
        loadDoa();
      } catch (error) {
        console.error('Error deleting doa:', error);
        alert('Error deleting doa');
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      isi: item.isi,
      kategori: item.kategori,
      periode_mulai: item.periode_mulai || '',
      periode_selesai: item.periode_selesai || '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy">Doa Pokok & Bacaan Harian</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              isi: '',
              kategori: 'jemaat',
              periode_mulai: '',
              periode_selesai: '',
            });
          }}
          className="bg-navy hover:bg-navy/90 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          {showForm ? 'Cancel' : '+ Tambah Doa'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-warmCream p-6 rounded-lg mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Isi Doa</label>
            <textarea
              name="isi"
              value={formData.isi}
              onChange={handleInputChange}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">Kategori</label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            >
              <option value="jemaat">Doa Jemaat</option>
              <option value="pemimpin">Doa Pemimpin</option>
              <option value="bacaan">Bacaan Harian</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Periode Mulai</label>
              <input
                type="date"
                name="periode_mulai"
                value={formData.periode_mulai}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Periode Selesai</label>
              <input
                type="date"
                name="periode_selesai"
                value={formData.periode_selesai}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy hover:bg-navy/90 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Doa' : 'Tambah Doa'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {loading && <p className="text-center text-navy">Loading...</p>}
        {doa.map(item => (
          <div key={item.id} className="bg-warmCream p-4 rounded-lg border-l-4 border-navy">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <p className="text-sm text-terracotta font-semibold capitalize mb-2">{item.kategori}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">{item.isi}</p>
            {(item.periode_mulai || item.periode_selesai) && (
              <p className="text-xs text-gray-500 mb-3">
                Periode: {item.periode_mulai} - {item.periode_selesai}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 bg-navy text-white rounded text-sm hover:bg-navy/90 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 bg-softRed text-white rounded text-sm hover:bg-softRed/90 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
