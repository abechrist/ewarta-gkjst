import React from 'react';

export default function JadwalManager() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy">Jadwal Sekolah Minggu & Leksionari</h2>
        <button className="bg-navy hover:bg-navy/90 text-white px-4 py-2 rounded-lg font-semibold transition">
          + Tambah Jadwal
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p className="text-blue-800">
          Fitur Jadwal Sekolah Minggu & Leksionari akan segera ditambahkan
        </p>
      </div>
    </div>
  );
}
