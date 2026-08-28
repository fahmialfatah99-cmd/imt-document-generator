import React, { useState } from 'react';
import { Plus, Trash2, PenTool, Sparkles, Calculator, Calendar } from 'lucide-react';
import { SignatureModal } from './SignatureModal';
import { DEFAULT_SIGNATURES } from '../utils/signatures';
import { formatRupiah, parseNumber } from '../utils/formatters';

export const SettlementForm = ({ data, onChange }) => {
  const [activeSignModal, setActiveSignModal] = useState(null);

  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const list = [...(data.items || [])];
    list[index] = {
      ...list[index],
      [field]: value
    };
    updateField('items', list);
  };

  const addItem = () => {
    const today = new Date().toISOString().split('T')[0];
    const list = [...(data.items || []), { date: today, description: '', amount: 0 }];
    updateField('items', list);
  };

  const removeItem = (index) => {
    const list = [...(data.items || [])];
    list.splice(index, 1);
    updateField('items', list);
  };

  const updateSignature = (roleKey, signData) => {
    const signatures = { ...(data.signatures || {}) };
    signatures[roleKey] = {
      ...(signatures[roleKey] || {}),
      sign: signData
    };
    updateField('signatures', signatures);
  };

  const updateSignatureName = (roleKey, name) => {
    const signatures = { ...(data.signatures || {}) };
    signatures[roleKey] = {
      ...(signatures[roleKey] || {}),
      name: name
    };
    updateField('signatures', signatures);
  };

  // Calculations
  const totalExpenses = (data.items || []).reduce((sum, item) => sum + parseNumber(item.amount), 0);
  const cashAdvance = parseNumber(data.cashAdvanceTaken || 0);
  const balance = cashAdvance - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Header & Meta */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Informasi Pengajuan Settlement</span>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="businessType"
                checked={data.isBusiness !== false}
                onChange={() => updateField('isBusiness', true)}
                className="text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>Business</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="businessType"
                checked={data.isBusiness === false}
                onChange={() => updateField('isBusiness', false)}
                className="text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>Non-Business</span>
            </label>
          </div>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Nama (Name) <span className="text-[10px] text-blue-600 font-normal">(Otomatis dari Halaman 1)</span>
            </label>
            <input
              type="text"
              value={data.name || ''}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Nama Karyawan / Pemohon"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Tanggal (Date) <span className="text-[10px] text-slate-500 font-normal">(Diisi Manual)</span>
            </label>
            <input
              type="date"
              value={data.tanggal || ''}
              onChange={(e) => updateField('tanggal', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Dept / Div <span className="text-[10px] text-blue-600 font-normal">(Otomatis dari Halaman 1)</span>
            </label>
            <input
              type="text"
              value={data.deptDiv || ''}
              onChange={(e) => updateField('deptDiv', e.target.value)}
              placeholder="Contoh: Operasional / IT / Finance"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Expense Type <span className="text-[10px] text-blue-600 font-normal">(Otomatis dari No IOM Halaman 1)</span>
            </label>
            <input
              type="text"
              value={data.expenseType || ''}
              onChange={(e) => updateField('expenseType', e.target.value)}
              placeholder="Contoh: 018/IOM/IMT/VIII/2026"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Cash Advance & Calculation Summary Box */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 rounded-2xl border border-blue-200/80 shadow-sm">
        <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-blue-600" /> Ringkasan Saldo & Uang Muka (Cash Advance)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 block mb-1">
              Cash Advance Taken (A) <span className="text-[10px] text-blue-600 font-normal block">(Otomatis dari Halaman 1)</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-400">Rp</span>
              <input
                type="number"
                value={data.cashAdvanceTaken || ''}
                onChange={(e) => updateField('cashAdvanceTaken', e.target.value)}
                placeholder="0"
                className="w-full text-base font-bold text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 block mb-1">Total Expenses (B)</span>
            <div className="text-base font-bold text-slate-800">
              {formatRupiah(totalExpenses, true)}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">✓ Dihitung otomatis dari tabel rincian</span>
          </div>

          <div className={`p-3.5 rounded-xl border shadow-sm ${
            balance < 0 ? 'bg-amber-50/80 border-amber-200' : 'bg-emerald-50/80 border-emerald-200'
          }`}>
            <span className="text-xs font-semibold text-slate-600 block mb-1">
              Balance (C = A - B)
            </span>
            <div className={`text-base font-bold ${balance < 0 ? 'text-amber-800' : 'text-emerald-800'}`}>
              {formatRupiah(balance, true)}
            </div>
            <span className="text-[10px] text-slate-500">
              {balance < 0 ? 'Perusahaan mengganti ke karyawan' : 'Karyawan mengembalikan sisa ke kas'}
            </span>
          </div>
        </div>
      </div>

      {/* Expense Items Table */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">Rincian Pengeluaran (Detail of Expense)</h3>
            <p className="text-xs text-slate-500">Daftar item biaya, tanggal, dan nominal</p>
          </div>
          <button
            type="button"
            onClick={addItem}
            className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-4 h-4" /> Tambah Baris Biaya
          </button>
        </div>

        <div className="space-y-3">
          {(data.items || []).map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="flex items-center gap-2 sm:w-40">
                <span className="text-xs font-bold text-slate-400 w-5 text-center">{idx + 1}.</span>
                <input
                  type="date"
                  value={item.date || ''}
                  onChange={(e) => handleItemChange(idx, 'date', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <input
                type="text"
                value={item.description || ''}
                onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                placeholder="Deskripsi pengeluaran / keperluan..."
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              />

              <div className="flex items-center gap-2 sm:w-48">
                <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 flex-1 focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="text-[11px] font-medium text-slate-400">Rp</span>
                  <input
                    type="number"
                    value={item.amount || ''}
                    onChange={(e) => handleItemChange(idx, 'amount', e.target.value)}
                    placeholder="0"
                    className="w-full text-xs font-semibold text-slate-800 focus:outline-none text-right"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Hapus baris"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {(!data.items || data.items.length === 0) && (
            <div className="text-center py-6 text-slate-400 text-xs border border-dashed rounded-xl">
              Belum ada baris biaya. Klik "Tambah Baris Biaya" untuk menambahkan.
            </div>
          )}
        </div>
      </div>

      {/* Signatures Section */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
          Otorisasi & Tanda Tangan Settlement
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Prepared By */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700">Prepared by</span>
                <button
                  type="button"
                  onClick={() => updateSignature('preparedBy', DEFAULT_SIGNATURES.user)}
                  className="text-[10px] text-blue-600 hover:underline font-semibold"
                >
                  Pakai Paraf
                </button>
              </div>
              <input
                type="text"
                value={data.signatures?.preparedBy?.name || ''}
                onChange={(e) => updateSignatureName('preparedBy', e.target.value)}
                placeholder="( user )"
                className="w-full px-2 py-1 text-xs border border-slate-300 rounded mb-2 bg-white"
              />
            </div>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="h-10 flex items-center">
                {data.signatures?.preparedBy?.sign ? (
                  <img src={data.signatures.preparedBy.sign} alt="Sign" className="h-8 object-contain" />
                ) : (
                  <span className="text-[11px] text-slate-400 italic">Belum ada</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveSignModal('preparedBy')}
                className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium flex items-center gap-1 transition"
              >
                <PenTool className="w-3.5 h-3.5" /> Atur
              </button>
            </div>
          </div>

          {/* Checked by RPM */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">Checked by (RPM)</span>
              <input
                type="text"
                value={data.signatures?.checkedByRPM?.name || ''}
                onChange={(e) => updateSignatureName('checkedByRPM', e.target.value)}
                placeholder="RPM"
                className="w-full px-2 py-1 text-xs border border-slate-300 rounded mb-2 bg-white"
              />
            </div>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="h-10 flex items-center">
                {data.signatures?.checkedByRPM?.sign ? (
                  <img src={data.signatures.checkedByRPM.sign} alt="Sign" className="h-8 object-contain" />
                ) : (
                  <span className="text-[11px] text-slate-400 italic">Belum ada</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveSignModal('checkedByRPM')}
                className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium flex items-center gap-1 transition"
              >
                <PenTool className="w-3.5 h-3.5" /> Atur
              </button>
            </div>
          </div>

          {/* Checked by Septya */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700">Checked by</span>
                <button
                  type="button"
                  onClick={() => updateSignature('checkedBySeptya', DEFAULT_SIGNATURES.septya)}
                  className="text-[10px] text-blue-600 hover:underline font-semibold"
                >
                  Pakai Default
                </button>
              </div>
              <input
                type="text"
                value={data.signatures?.checkedBySeptya?.name || ''}
                onChange={(e) => updateSignatureName('checkedBySeptya', e.target.value)}
                placeholder="Septya"
                className="w-full px-2 py-1 text-xs border border-slate-300 rounded mb-2 bg-white"
              />
            </div>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="h-10 flex items-center">
                {data.signatures?.checkedBySeptya?.sign ? (
                  <img src={data.signatures.checkedBySeptya.sign} alt="Sign" className="h-8 object-contain" />
                ) : (
                  <span className="text-[11px] text-slate-400 italic">Belum ada</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveSignModal('checkedBySeptya')}
                className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium flex items-center gap-1 transition"
              >
                <PenTool className="w-3.5 h-3.5" /> Atur
              </button>
            </div>
          </div>

          {/* Approved by Pimpinan */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700">Approved by</span>
                <button
                  type="button"
                  onClick={() => updateSignature('approvedBy', DEFAULT_SIGNATURES.pimpinan)}
                  className="text-[10px] text-blue-600 hover:underline font-semibold"
                >
                  Pakai Default
                </button>
              </div>
              <input
                type="text"
                value={data.signatures?.approvedBy?.name || ''}
                onChange={(e) => updateSignatureName('approvedBy', e.target.value)}
                placeholder="Pimpinan"
                className="w-full px-2 py-1 text-xs border border-slate-300 rounded mb-2 bg-white"
              />
            </div>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="h-10 flex items-center">
                {data.signatures?.approvedBy?.sign ? (
                  <img src={data.signatures.approvedBy.sign} alt="Sign" className="h-8 object-contain" />
                ) : (
                  <span className="text-[11px] text-slate-400 italic">Belum ada</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveSignModal('approvedBy')}
                className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium flex items-center gap-1 transition"
              >
                <PenTool className="w-3.5 h-3.5" /> Atur
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      <SignatureModal
        isOpen={Boolean(activeSignModal)}
        onClose={() => setActiveSignModal(null)}
        onSave={(signData) => updateSignature(activeSignModal, signData)}
        title={`Tanda Tangan - ${activeSignModal?.toUpperCase()}`}
        currentSignature={activeSignModal ? data.signatures?.[activeSignModal]?.sign : null}
      />
    </div>
  );
};
