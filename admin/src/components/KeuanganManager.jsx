import React, { useState, useEffect } from 'react';
import { apiService } from '@/apiService';

export default function KeuanganManager() {
  const [keuangan, setKeuangan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    tanggal: '',
    kantung_merah: 0,
    kantung_kuning: 0,
    bulanan: 0,
    pembangunan: 0,
    gota: 0,
    total: 0,
    rincian_wilayah: {},
  });

  useEffect(() => {
    loadKeuangan();
  }, []);

  const loadKeuangan = async () => {
    setLoading(true);
    try {
      const data = await apiService.getPersembahan();
      setKeuangan(data);
    } catch (error) {
      console.error('Error loading keuangan:', error);
      alert('Error loading keuangan');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: name === 'tanggal' ? value : parseFloat(value) || 0
    };
    
    if (['kantung_merah', 'kantung_kuning', 'bulanan', 'pembangunan', 'gota'].includes(name)) {
      newFormData.total = 
        newFormData.kantung_merah + 
        newFormData.kantung_kuning + 
        newFormData.bulanan + 
        newFormData.pembangunan + 
        newFormData.gota;
    }
    
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await apiService.updatePersembahan(editingId, formData);
        alert('Persembahan updated successfully');
      } else {
        await apiService.createPersembahan(formData);
        alert('Persembahan created successfully');
      }

      setFormData({
        tanggal: '',
        kantung_merah: 0,
        kantung_kuning: 0,
        bulanan: 0,
        pembangunan: 0,
        gota: 0,
        total: 0,
        rincian_wilayah: {},
      });
      setEditingId(null);
      setShowForm(false);
      loadKeuangan();
    } catch (error) {
      console.error('Error saving keuangan:', error);
      alert('Error saving keuangan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus data persembahan ini?')) {
      try {
        await apiService.deletePersembahan(id);
        loadKeuangan();
      } catch (error) {
        console.error('Error deleting keuangan:', error);
        alert('Error deleting keuangan');
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      tanggal: item.tanggal || '',
      kantung_merah: item.kantung_merah || 0,
      kantung_kuning: item.kantung_kuning || 0,
      bulanan: item.bulanan || 0,
      pembangunan: item.pembangunan || 0,
      gota: item.gota || 0,
      total: item.total || 0,
      rincian_wilayah: item.rincian_wilayah || {},
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy">Keuangan & Persembahan</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              tanggal: '',
              kantung_merah: 0,
              kantung_kuning: 0,
              bulanan: 0,
              pembangunan: 0,
              gota: 0,
              total: 0,
              rincian_wilayah: {},
            });
          }}
          className="bg-navy hover:bg-navy/90 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          {showForm ? 'Cancel' : '+ Tambah Persembahan'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-warmCream p-6 rounded-lg mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Kantung Merah</label>
              <input
                type="number"
                name="kantung_merah"
                value={formData.kantung_merah}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Kantung Kuning</label>
              <input
                type="number"
                name="kantung_kuning"
                value={formData.kantung_kuning}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Bulanan</label>
              <input
                type="number"
                name="bulanan"
                value={formData.bulanan}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Pembangunan</label>
              <input
                type="number"
                name="pembangunan"
                value={formData.pembangunan}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2">GOTA</label>
              <input
                type="number"
                name="gota"
                value={formData.gota}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
          </div>

          <div className="bg-navy/10 p-4 rounded-lg">
            <p className="text-sm font-semibold text-navy">
              Total: {formatCurrency(formData.total)}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy hover:bg-navy/90 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Persembahan' : 'Tambah Persembahan'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {loading && <p className="text-center text-navy">Loading...</p>}
        {keuangan.map(item => (
          <div key={item.id} className="bg-warmCream p-4 rounded-lg border-l-4 border-navy">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{item.tanggal}</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Merah</p>
                    <p className="font-semibold text-navy">{formatCurrency(item.kantung_merah)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Kuning</p>
                    <p className="font-semibold text-navy">{formatCurrency(item.kantung_kuning)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Bulanan</p>
                    <p className="font-semibold text-navy">{formatCurrency(item.bulanan)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Pembangunan</p>
                    <p className="font-semibold text-navy">{formatCurrency(item.pembangunan)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">GOTA</p>
                    <p className="font-semibold text-navy">{formatCurrency(item.gota)}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Total</p>
                <p className="text-lg font-bold text-navy">{formatCurrency(item.total)}</p>
              </div>
            </div>
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
