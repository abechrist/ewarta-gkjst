import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase';

export default function DoaManager() {
  const [doa, setDoa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('doa');
  const [formData, setFormData] = useState({
    isi: '',
    kategori: 'jemaat',
    periodeMulai: '',
    periodeSelesai: '',
  });

  useEffect(() => {
    loadDoa();
  }, []);

  const loadDoa = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'doa_pokok'));
      setDoa(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
      const doaData = {
        ...formData,
        periodeMulai: Timestamp.fromDate(new Date(formData.periodeMulai)),
        periodeSelesai: Timestamp.fromDate(new Date(formData.periodeSelesai)),
      };

      if (editingId) {
        await updateDoc(doc(db, 'doa_pokok', editingId), doaData);
        alert('Doa updated successfully');
      } else {
        await addDoc(collection(db, 'doa_pokok'), doaData);
        alert('Doa created successfully');
      }

      setFormData({
        isi: '',
        kategori: 'jemaat',
        periodeMulai: '',
        periodeSelesai: '',
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
        await deleteDoc(doc(db, 'doa_pokok', id));
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
      periodeMulai: item.periodeMulai?.toDate?.().toISOString().split('T')[0] || '',
      periodeSelesai: item.periodeSelesai?.toDate?.().toISOString().split('T')[0] || '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy">Pokok Doa</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              isi: '',
              kategori: 'jemaat',
              periodeMulai: '',
              periodeSelesai: '',
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
            <label className="block text-sm font-medium text-navy mb-2">Pokok Doa</label>
            <textarea
              name="isi"
              value={formData.isi}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Kategori</label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              >
                <option value="bangsa">Bangsa</option>
                <option value="jemaat">Jemaat</option>
                <option value="gereja">Gereja</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Periode Mulai</label>
              <input
                type="date"
                name="periodeMulai"
                value={formData.periodeMulai}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Periode Selesai</label>
              <input
                type="date"
                name="periodeSelesai"
                value={formData.periodeSelesai}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                required
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
          <div key={item.id} className="bg-warmCream p-4 rounded-lg border-l-4 border-terracotta">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <p className="text-sm text-terracotta font-semibold capitalize mb-2">{item.kategori}</p>
                <p className="text-gray-700 mb-2">{item.isi}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Periode: {item.periodeMulai?.toDate?.().toLocaleDateString('id-ID')} - {item.periodeSelesai?.toDate?.().toLocaleDateString('id-ID')}
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
