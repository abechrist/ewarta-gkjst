import React, { useState } from 'react';
import { supabase } from '@/supabaseService';
import WartaManager from '@/components/WartaManager';
import JadwalManager from '@/components/JadwalManager';
import PengumumanManager from '@/components/PengumumanManager';
import DoaManager from '@/components/DoaManager';
import KeuanganManager from '@/components/KeuanganManager';

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('warta');

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const tabs = [
    { id: 'warta', label: 'Warta & Renungan', icon: '📰' },
    { id: 'jadwal', label: 'Jadwal', icon: '📅' },
    { id: 'pengumuman', label: 'Pengumuman', icon: '📢' },
    { id: 'doa', label: 'Doa & Bacaan', icon: '🙏' },
    { id: 'keuangan', label: 'Keuangan', icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-warmCream">
      <nav className="bg-navy text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">eWARTA Admin</h1>
            <p className="text-sm text-gray-300">GKJ Salatiga Timur</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-terracotta hover:bg-terracotta/90 px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-navy text-white'
                  : 'bg-white text-navy border-2 border-navy hover:bg-navy/10'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'warta' && <WartaManager />}
          {activeTab === 'jadwal' && <JadwalManager />}
          {activeTab === 'pengumuman' && <PengumumanManager />}
          {activeTab === 'doa' && <DoaManager />}
          {activeTab === 'keuangan' && <KeuanganManager />}
        </div>
      </div>
    </div>
  );
}
