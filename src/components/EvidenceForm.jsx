import React from 'react';
import { Upload, Trash2, Image as ImageIcon, Sparkles, Plus, FileText } from 'lucide-react';

export const EvidenceForm = ({ data, onChange }) => {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const evidences = [...(data.evidences || [])];
      evidences[index] = {
        ...(evidences[index] || {}),
        image: e.target.result
      };
      updateField('evidences', evidences);
    };
    reader.readAsDataURL(file);
  };

  const handleDescriptionChange = (index, desc) => {
    const evidences = [...(data.evidences || [])];
    evidences[index] = {
      ...(evidences[index] || {}),
      description: desc
    };
    updateField('evidences', evidences);
  };

  const addEvidenceSlot = () => {
    const evidences = [...(data.evidences || []), { image: null, description: '' }];
    updateField('evidences', evidences);
  };

  const removeEvidenceSlot = (index) => {
    const evidences = [...(data.evidences || [])];
    evidences.splice(index, 1);
    // Keep at least 1 slot
    if (evidences.length === 0) {
      evidences.push({ image: null, description: '' });
    }
    updateField('evidences', evidences);
  };

  // Sample receipts generator for quick demonstration
  const loadSampleReceipts = () => {
    // Generate simple SVG mock receipts
    const sample1 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="380" viewBox="0 0 300 380" fill="%23fff"><rect width="300" height="380" fill="%23fff" stroke="%23cbd5e1" stroke-width="2"/><text x="150" y="40" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold">RESTO PADANG SEDAP</text><text x="150" y="60" text-anchor="middle" font-family="monospace" font-size="11">Jl. Sudirman No. 45 Jakarta</text><line x1="20" y1="80" x2="280" y2="80" stroke="%2364748b" stroke-dasharray="4"/><text x="30" y="110" font-family="monospace" font-size="12">1x Nasi Rendang</text><text x="270" y="110" text-anchor="end" font-family="monospace" font-size="12">35.000</text><text x="30" y="135" font-family="monospace" font-size="12">1x Jus Alpukat</text><text x="270" y="135" text-anchor="end" font-family="monospace" font-size="12">18.000</text><text x="30" y="160" font-family="monospace" font-size="12">1x Kerupuk Kulit</text><text x="270" y="160" text-anchor="end" font-family="monospace" font-size="12">7.000</text><line x1="20" y1="190" x2="280" y2="190" stroke="%2364748b" stroke-dasharray="4"/><text x="30" y="220" font-family="monospace" font-size="13" font-weight="bold">TOTAL</text><text x="270" y="220" text-anchor="end" font-family="monospace" font-size="13" font-weight="bold">Rp 60.000</text><text x="150" y="300" text-anchor="middle" font-family="monospace" font-size="10" fill="%2364748b">TERIMA KASIH ATAS KUNJUNGANNYA</text></svg>`;

    const sample2 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="380" viewBox="0 0 300 380" fill="%23fff"><rect width="300" height="380" fill="%23fff" stroke="%23cbd5e1" stroke-width="2"/><text x="150" y="40" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold">SPBU PERTAMINA 34-123</text><text x="150" y="60" text-anchor="middle" font-family="monospace" font-size="11">Struk Pembelian BBM</text><line x1="20" y1="80" x2="280" y2="80" stroke="%2364748b" stroke-dasharray="4"/><text x="30" y="120" font-family="monospace" font-size="12">Pertamax Turbo</text><text x="270" y="120" text-anchor="end" font-family="monospace" font-size="12">20.00 Ltr</text><text x="30" y="150" font-family="monospace" font-size="12">Harga / Liter</text><text x="270" y="150" text-anchor="end" font-family="monospace" font-size="12">14.400</text><line x1="20" y1="190" x2="280" y2="190" stroke="%2364748b" stroke-dasharray="4"/><text x="30" y="220" font-family="monospace" font-size="13" font-weight="bold">TOTAL BAYAR</text><text x="270" y="220" text-anchor="end" font-family="monospace" font-size="13" font-weight="bold">Rp 288.000</text></svg>`;

    const evidences = [
      { image: sample1, description: 'Nota Makan Siang Tim Operasional' },
      { image: sample2, description: 'BBM Pertamax Kendaraan Operasional Kantor' }
    ];
    updateField('evidences', evidences);
  };

  const evidences = data.evidences && data.evidences.length > 0 
    ? data.evidences 
    : [{ image: null, description: '' }];

  const totalPages = Math.ceil(evidences.length / 4) || 1;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">Lampiran Bukti Transaksi</h3>
            <p className="text-xs text-slate-500">
              Unggah foto nota / kwitansi / struk pengeluaran. Tiap 4 nota otomatis membentuk 1 lembar A4.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-200 font-semibold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> {evidences.length} Bukti ({totalPages} Lembar A4)
            </span>
            <button
              type="button"
              onClick={loadSampleReceipts}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5" /> Contoh Nota Mockup
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              No Bukti Transaksi <span className="text-[10px] text-blue-600 font-normal">(Otomatis dari No IOM Halaman 1)</span>
            </label>
            <input
              type="text"
              value={data.noBuktiTransaksi || ''}
              onChange={(e) => updateField('noBuktiTransaksi', e.target.value)}
              placeholder="Contoh: 018/IOM/IMT/VIII/2026"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Nama Pemohon <span className="text-[10px] text-blue-600 font-normal">(Otomatis dari Halaman 1)</span>
            </label>
            <input
              type="text"
              value={data.nama || ''}
              onChange={(e) => updateField('nama', e.target.value)}
              placeholder="Nama pemohon"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Action Bar for Adding More Evidences */}
      <div className="flex items-center justify-between bg-slate-100/80 p-3.5 rounded-2xl border border-slate-200">
        <div>
          <span className="text-xs font-bold text-slate-800">Daftar Slot Foto Bukti Transaksi</span>
          <span className="text-[11px] text-slate-500 ml-2">({evidences.length} slot aktif)</span>
        </div>
        <button
          type="button"
          onClick={addEvidenceSlot}
          className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" /> Tambah Slot Bukti Transaksi
        </button>
      </div>

      {/* Dynamic Image Upload Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {evidences.map((item, idx) => {
          const pageNumber = Math.floor(idx / 4) + 1;
          const slotOnPage = (idx % 4) + 1;
          return (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-600" /> Slot #{idx + 1}
                  <span className="text-[10px] font-normal text-slate-400">
                    (Lembar A4 ke-{pageNumber}, Posisi #{slotOnPage})
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeEvidenceSlot(idx)}
                  className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium hover:bg-rose-50 px-2 py-1 rounded-lg transition"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Slot
                </button>
              </div>

              {/* Upload Dropzone / Image Preview */}
              <div className="h-56 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/60 overflow-hidden relative flex items-center justify-center mb-3">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={`Preview Nota ${idx + 1}`}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <label className="cursor-pointer h-full w-full flex flex-col items-center justify-center p-4 hover:bg-blue-50/30 transition text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(idx, e.target.files?.[0])}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-slate-400 mb-2 group-hover:text-blue-500" />
                    <span className="text-xs font-semibold text-slate-600">Klik untuk upload foto nota / struk</span>
                    <span className="text-[11px] text-slate-400 mt-1">Format JPG / PNG / WebP</span>
                  </label>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Description / Keterangan Nota #{idx + 1}
                </label>
                <input
                  type="text"
                  value={item.description || ''}
                  onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                  placeholder="Contoh: Tiket Kereta / Pembelian Sparepart / Konsumsi"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Button to Add More Slots */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={addEvidenceSlot}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-5 py-2.5 rounded-xl flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> Tambah Slot Bukti Transaksi Baru
        </button>
      </div>
    </div>
  );
};
