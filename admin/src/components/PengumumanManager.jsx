import React, { useState, useEffect } from 'react';
import { apiService } from '@/apiService';

export default function PengumumanManager() {
  const [pengumuman, setPengumuman] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    judul: '',
    isi: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
    kategori: 'umum',
    published: false,
  });

  useEffect(() => {
    loadPengumuman();
  }, []);

  const loadPengumuman = async () => {
    setLoading(true);
    try {
      const data = await apiService.getPengumuman();
      setPengumuman(data);
    } catch (error) {
      console.error('Error loading pengumuman:', error);
      alert('Error loading pengumuman');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await apiService.updatePengumuman(editingId, formData);
        alert('Pengumuman updated successfully');
      } else {
        await apiService.createPengumuman(formData);
        alert('Pengumuman created successfully');
      }

      setFormData({
        judul: '',
        isi: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        kategori: 'umum',
        published: false,
      });
      setEditingId(null);
      setShowForm(false);
      loadPengumuman();
    } catch (error) {
      console.error('Error saving pengumuman:', error);
      alert('Error saving pengumuman: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus pengumuman ini?')) {
      try {
        await apiService.deletePengumuman(id);
        loadPengumuman();
      } catch (error) {
        console.error('Error deleting pengumuman:', error);
        alert('Error deleting pengumuman');
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      judul: item.judul,
      isi: item.isi,
      tanggal_mulai: item.tanggal_mulai || '',
      tanggal_selesai: item.tanggal_selesai || '',
      kategori: item.kategori,
      published: item.published,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy">Pengumuman</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              judul: '',
              isi: '',
              tanggal_mulai: '',
              tanggal_selesai: '',
              kategori: 'umum',
              published: false,
            });
          }}
          className="bg-navy hover:bg-navy/90 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          {showForm ? 'Cancel' : '+ Tambah Pengumuman'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-warmCream p-6 rounded-lg mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Judul</label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">Isi Pengumuman</label>
            <textarea
              name="isi"
              value={formData.isi}
              onChange={handleInputChange}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Tanggal Mulai</label>
              <input
                type="date"
                name="tanggal_mulai"
                value={formData.tanggal_mulai}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Tanggal Selesai</label>
              <input
                type="date"
                name="tanggal_selesai"
                value={formData.tanggal_selesai}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">Kategori</label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            >
              <option value="ibadah">Ibadah</option>
              <option value="komisi">Komisi</option>
              <option value="umum">Umum</option>
              <option value="khusus">Kegiatan Khusus</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleInputChange}
              className="w-4 h-4 text-navy rounded focus:ring-2 focus:ring-navy"
            />
            <label className="text-sm font-medium text-navy">Publish</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy hover:bg-navy/90 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Pengumuman' : 'Tambah Pengumuman'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {loading && <p className="text-center text-navy">Loading...</p>}
        {pengumuman.map(item => (
          <div key={item.id} className="bg-warmCream p-4 rounded-lg border-l-4 border-navy">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-navy">{item.judul}</h3>
                <p className="text-sm text-terracotta capitalize">{item.kategori}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {item.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.isi}</p>
            <p className="text-xs text-gray-500 mb-3">
              Berlaku: {item.tanggal_mulai} - {item.tanggal_selesai}
            </p>
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
