import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, messaging } from '@/firebase';
import { getToken } from 'firebase/messaging';

export default function WartaManager() {
  const [warta, setWarta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [formData, setFormData] = useState({
    tema: '',
    ayat: '',
    renungan: '',
    mingguLiturgi: '',
    warnaLiturgi: '',
    published: false,
  });

  useEffect(() => {
    loadWarta();
  }, []);

  const loadWarta = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'warta'));
      const snapshot = await getDocs(q);
      setWarta(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error loading warta:', error);
      alert('Error loading warta');
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

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let pdfUrl = '';

      if (pdfFile) {
        const pdfRef = ref(storage, `warta/${Date.now()}_${pdfFile.name}`);
        await uploadBytes(pdfRef, pdfFile);
        pdfUrl = await getDownloadURL(pdfRef);
      }

      const wartaData = {
        ...formData,
        tanggal: Timestamp.now(),
        pdfUrl: pdfUrl || formData.pdfUrl || '',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      if (editingId) {
        await updateDoc(doc(db, 'warta', editingId), wartaData);
        alert('Warta updated successfully');
      } else {
        await addDoc(collection(db, 'warta'), wartaData);
        alert('Warta created successfully');

        if (formData.published) {
          await sendNotification('Warta Baru', `${formData.tema} - ${formData.ayat}`);
        }
      }

      setFormData({
        tema: '',
        ayat: '',
        renungan: '',
        mingguLiturgi: '',
        warnaLiturgi: '',
        published: false,
      });
      setPdfFile(null);
      setEditingId(null);
      setShowForm(false);
      loadWarta();
    } catch (error) {
      console.error('Error saving warta:', error);
      alert('Error saving warta: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendNotification = async (title, body) => {
    try {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
      });
      
      await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `key=${import.meta.env.VITE_FIREBASE_SERVER_KEY}`
        },
        body: JSON.stringify({
          notification: { title, body },
          to: '/topics/all'
        })
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus warta ini?')) {
      try {
        await deleteDoc(doc(db, 'warta', id));
        loadWarta();
      } catch (error) {
        console.error('Error deleting warta:', error);
        alert('Error deleting warta');
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      tema: item.tema,
      ayat: item.ayat,
      renungan: item.renungan,
      mingguLiturgi: item.mingguLiturgi,
      warnaLiturgi: item.warnaLiturgi,
      published: item.published,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy">Warta & Renungan</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              tema: '',
              ayat: '',
              renungan: '',
              mingguLiturgi: '',
              warnaLiturgi: '',
              published: false,
            });
          }}
          className="bg-navy hover:bg-navy/90 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          {showForm ? 'Cancel' : '+ Tambah Warta'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-warmCream p-6 rounded-lg mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Tema</label>
              <input
                type="text"
                name="tema"
                value={formData.tema}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Ayat</label>
              <input
                type="text"
                name="ayat"
                value={formData.ayat}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                placeholder="Contoh: Yohanes 14:15-21"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">Renungan</label>
            <textarea
              name="renungan"
              value={formData.renungan}
              onChange={handleInputChange}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Minggu Liturgi</label>
              <input
                type="text"
                name="mingguLiturgi"
                value={formData.mingguLiturgi}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                placeholder="Contoh: Minggu Paskah VI"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Warna Liturgi</label>
              <input
                type="text"
                name="warnaLiturgi"
                value={formData.warnaLiturgi}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                placeholder="Contoh: Putih"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">Upload PDF Warta</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleInputChange}
              className="w-4 h-4 text-navy rounded focus:ring-2 focus:ring-navy"
            />
            <label className="text-sm font-medium text-navy">Publish & Kirim Notifikasi</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy hover:bg-navy/90 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Warta' : 'Tambah Warta'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {loading && <p className="text-center text-navy">Loading...</p>}
        {warta.map(item => (
          <div key={item.id} className="bg-warmCream p-4 rounded-lg border-l-4 border-navy">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-navy">{item.tema}</h3>
                <p className="text-sm text-terracotta">{item.ayat}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {item.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.renungan}</p>
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
