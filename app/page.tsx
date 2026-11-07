'use client';

import React, { useState, useEffect } from 'react';

export default function Page() {
  const [animals, setAnimals] = useState([
    { id: '1', tag: 'TAG-SAP-001', type: 'Sapi', breed: 'Friesian Holstein', gender: 'Betina', weight: 450, age: 36, milkVolume: 18, maleCalves: 1, femaleCalves: 2, lastCalvingDate: '2025-10-10', reproStatus: 'Laktasi (Aktif diperah)', healthStatus: 'Sehat', lastVaccineDate: '2026-01-15', vaccineName: 'Vaksin PMK', feedCost: 1200000, buyPrice: 18000000 }
  ]);
  const [currentView, setGridView] = useState('grid');
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const totalMilk = animals.reduce((acc, curr) => acc + Number(curr.milkVolume || 0), 0);
  const totalCalves = animals.reduce((acc, curr) => acc + Number(curr.maleCalves || 0) + Number(curr.femaleCalves || 0), 0);
  const totalExpense = animals.reduce((acc, curr) => acc + Number(curr.buyPrice || 0) + Number(curr.feedCost || 0), 0);
  const monthlyRevenue = totalMilk * 30 * 9000;

  const filteredAnimals = animals.filter(a => {
    const matchesSearch = a.tag.toLowerCase().includes(searchTerm.toLowerCase()) || a.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || a.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border border-slate-700 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-inner">
              🐄
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Abimanyu Farm Pro</h1>
              <p className="text-xs text-slate-400">Sistem Perah & Rekam Medis Sapi Modern (Supabase Connected)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Online & Ready
            </span>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Milk Production</p>
            <h3 className="text-2xl font-black text-sky-400 mt-1">{totalMilk} Liter/Hari</h3>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Anak Lahir (Pedet/Cempe)</p>
            <h3 className="text-2xl font-black text-blue-400 mt-1">{totalCalves} Ekor</h3>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Modal & Pakan</p>
            <h3 className="text-2xl font-black text-rose-400 mt-1">Rp {totalExpense.toLocaleString('id-ID')}</h3>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Est. Pendapatan Susu/Bln</p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1">Rp {monthlyRevenue.toLocaleString('id-ID')}</h3>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input 
              type="text" 
              placeholder="Cari Ear Tag / Ras..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
            >
              <option value="ALL">Semua Ternak</option>
              <option value="Sapi">🐄 Sapi Only</option>
              <option value="Kambing">🐐 Kambing Only</option>
            </select>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Menampilkan {filteredAnimals.length} ternak
          </div>
        </div>

        {/* Animals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAnimals.map((a) => (
            <div key={a.id || a.tag} className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-blue-400">{a.tag}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {a.type} Perah
                </span>
              </div>
              <div>
                <h4 className="font-bold text-base text-white">{a.breed} ({a.gender})</h4>
                <p className="text-xs text-slate-400 mt-0.5">{a.weight} Kg • {a.age} Bulan</p>
              </div>
              <div className="bg-sky-500/10 p-3 rounded-xl space-y-1 text-xs border border-sky-500/20">
                <div className="flex justify-between">
                  <span className="text-slate-400">🥛 Hasil Susu:</span>
                  <span className="font-black text-sky-400">{a.milkVolume} Liter/Hari</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">👶 Riwayat Beranak:</span>
                  <span className="font-bold">{(a.maleCalves || 0) + (a.femaleCalves || 0)} Anak</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 text-xs">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {a.healthStatus}
                </span>
                <span className="text-xs text-slate-400">Status: {a.reproStatus}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}