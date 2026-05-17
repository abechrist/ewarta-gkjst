import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase';

export default function KeuanganManager() {
  const [keuangan, setKeuangan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    tanggal: '',
    kantungMerah: 0,
    kantungKuning: 0,
    bulanan: 0,
    pembangunan: 0,
    gota: 0,
  });

  useEffect(() => {
    loadKeuangan();
  }, []);

  const loadKeuangan = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'persembahan'));
      setKeuangan(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error loading keuangan:', error);
      alert('Error loading keuangan');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tanggal' ? value : parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const total = 
        formData.kantungMerah + 
        formData.kantungKuning + 
        formData.bulanan + 
        formData.pembangunan + 
        formData.gota;

      const keuanganData = {
        ...formData,
        tanggal: Timestamp.fromDate(new Date(formData.tanggal)),
        total: total,
        rincianWilayah: {},
      };

      if (editingId) {
        await updateDoc(doc(db, 'persembahan', editingId), keuanganData);
        alert('Keuangan updated successfully');
      } else {
        await addDoc(collection(db, 'persembahan'), keuanganData);
        alert('Keuangan created successfully');
      }

      setFormData({
        tanggal: '',
        kantungMerah: 0,
        kantungKuning: 0,
        bulanan: 0,
        pembangunan: 0,
        gota: 0,
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
    if (confirm('Hapus laporan keuangan ini?')) {
      try {
        await deleteDoc(doc(db, 'persembahan', id));
        loadKeuangan();
      } catch (error) {
        console.error('Error deleting keuangan:', error);
        alert('Error deleting keuangan');
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      tanggal: item.tanggal?.toDate?.().toISOString().split('T')[0] || '',
      kantungMerah: item.kantungMerah || 0,
      kantungKuning: item.kantungKuning || 0,
      bulanan: item.bulanan || 0,
      pembangunan: item.pembangunan || 0,
      gota: item.gota || 0,
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
        <h2 className="text-2xl font-bold text-navy">Laporan Persembahan</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              tanggal: '',
              kantungMerah: 0,
              kantungKuning: 0,
              bulanan: 0,
              pembangunan: 0,
              gota: 0,
            });
          }}
          className="bg-navy hover:bg-navy/90 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          {showForm ? 'Cancel' : '+ Tambah Laporan'}
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
              <label className="block text-sm font-medium text-navy mb-2">Kantung Merah (Rp)</label>
              <input
                type="number"
                name="kantungMerah"
                value={formData.kantungMerah}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Kantung Kuning (Rp)</label>
              <input
                type="number"
                name="kantungKuning"
                value={formData.kantungKuning}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Bulanan (Rp)</label>
              <input
                type="number"
                name="bulanan"
                value={formData.bulanan}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Pembangunan (Rp)</label>
              <input
                type="number"
                name="pembangunan"
                value={formData.pembangunan}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">GOTA (Rp)</label>
            <input
              type="number"
              name="gota"
              value={formData.gota}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy hover:bg-navy/90 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Laporan' : 'Tambah Laporan'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {loading && <p className="text-center text-navy">Loading...</p>}
        {keuangan.map(item => {
          const total = (item.kantungMerah || 0) + (item.kantungKuning || 0) + (item.bulanan || 0) + (item.pembangunan || 0) + (item.gota || 0);
          return (
            <div key={item.id} className="bg-warmCream p-4 rounded-lg border-l-4 border-terracotta">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-navy">
                  {item.tanggal?.toDate?.().toLocaleDateString('id-ID')}
                </h3>
                <span className="text-lg font-bold text-terracotta">
                  {formatCurrency(total)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm mb-3">
                <div>
                  <p className="text-gray-600">Kantung Merah</p>
                  <p className="font-semibold text-navy">{formatCurrency(item.kantungMerah || 0)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Kantung Kuning</p>
                  <p className="font-semibold text-navy">{formatCurrency(item.kantungKuning || 0)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Bulanan</p>
                  <p className="font-semibold text-navy">{formatCurrency(item.bulanan || 0)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Pembangunan</p>
                  <p className="font-semibold text-navy">{formatCurrency(item.pembangunan || 0)}</p>
                </div>
                <div>
                  <p className="text-gray-600">GOTA</p>
                  <p className="font-semibold text-navy">{formatCurrency(item.gota || 0)}</p>
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
          );
        })}
      </div>
    </div>
  );
}
