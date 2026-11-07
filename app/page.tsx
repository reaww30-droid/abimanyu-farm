'use client';

import React, { useState } from 'react';

// Contoh data dummy untuk tabel hewan ternak
const initialAnimals = [
  { id: 'TRN-001', name: 'Sapi Simmental A', type: 'Sapi', age: '2 Tahun', weight: '450 kg', health: 'Sehat', status: 'Kandang A' },
  { id: 'TRN-002', name: 'Sapi Limousin B', type: 'Sapi', age: '1.5 Tahun', weight: '380 kg', health: 'Sehat', status: 'Kandang A' },
  { id: 'TRN-003', name: 'Kambing Etawa 1', type: 'Kambing', age: '8 Bulan', weight: '45 kg', health: 'Perawatan', status: 'Kandang B' },
  { id: 'TRN-004', name: 'Kambing Boer 2', type: 'Kambing', age: '1 Tahun', weight: '60 kg', health: 'Sehat', status: 'Kandang B' },
];

export default function Page() {
  const [animals] = useState(initialAnimals);

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Dashboard */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-2xl">
                🐄
              </div>
              <div>
                <h1 className="text-2xl font-black">Abimanyu Farm Pro</h1>
                <p className="text-xs text-slate-400">Dashboard Manajemen Peternakan Sapi & Kambing (Supabase Connected)</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Database Online
            </span>
          </div>
        </header>

        {/* Statistik Singkat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <p className="text-xs text-slate-400 font-medium">Total Ternak</p>
            <h3 className="text-3xl font-black mt-1 text-blue-400">124 Ekor</h3>
            <p className="text-xs text-slate-500 mt-2">↑ 4 ekor bulan ini</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <p className="text-xs text-slate-400 font-medium">Populasi Sapi</p>
            <h3 className="text-3xl font-black mt-1 text-emerald-400">45 Ekor</h3>
            <p className="text-xs text-slate-500 mt-2">Kondisi sehat semua</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <p className="text-xs text-slate-400 font-medium">Populasi Kambing</p>
            <h3 className="text-3xl font-black mt-1 text-amber-400">79 Ekor</h3>
            <p className="text-xs text-slate-500 mt-2">2 dalam pengawasan</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <p className="text-xs text-slate-400 font-medium">Jadwal Vaksin</p>
            <h3 className="text-3xl font-black mt-1 text-purple-400">Besok</h3>
            <p className="text-xs text-slate-500 mt-2">Pukul 08:00 WIB</p>
          </div>
        </div>

        {/* Tabel Data Ternak */}
        <div className="bg-slate-800 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-lg font-bold">Data Hewan Ternak</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-lg">
              + Tambah Ternak
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 border-b border-slate-700 text-xs uppercase tracking-wider">
                  <th className="p-4">ID / Tag</th>
                  <th className="p-4">Nama Hewan</th>
                  <th className="p-4">Jenis</th>
                  <th className="p-4">Usia</th>
                  <th className="p-4">Berat</th>
                  <th className="p-4">Kesehatan</th>
                  <th className="p-4">Lokasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {animals.map((animal) => (
                  <tr key={animal.id} className="hover:bg-slate-700/30 transition">
                    <td className="p-4 font-mono text-xs text-blue-400 font-bold">{animal.id}</td>
                    <td className="p-4 font-medium">{animal.name}</td>
                    <td className="p-4 text-slate-300">{animal.type}</td>
                    <td className="p-4 text-slate-300">{animal.age}</td>
                    <td className="p-4 text-slate-300">{animal.weight}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        animal.health === 'Sehat' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {animal.health}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{animal.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}