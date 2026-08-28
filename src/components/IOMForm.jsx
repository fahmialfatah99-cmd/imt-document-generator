import React, { useState } from 'react';
import { Plus, Trash2, PenTool, Sparkles, RefreshCw, CheckCircle2, Upload, Paperclip, FileText, X, FileCheck } from 'lucide-react';
import { SignatureModal } from './SignatureModal';
import { DEFAULT_SIGNATURES } from '../utils/signatures';
import { formatDate } from '../utils/formatters';

export const IOMForm = ({ data, onChange }) => {
  const [activeSignModal, setActiveSignModal] = useState(null); // 'diajukan', 'diketahui', 'direview', 'disetujui'

  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleDiajukanOlehChange = (value) => {
    const signatures = { ...(data.signatures || {}) };
    signatures.diajukan = {
      ...(signatures.diajukan || {}),
      name: value
    };
    onChange({
      ...data,
      diajukanOleh: value,
      signatures
    });
  };

  const handleTanggalPengajuanChange = (newDate) => {
    const formattedShort = newDate ? formatDate(newDate, 'short') : '';
    const signatures = { ...(data.signatures || {}) };
    
    ['diajukan', 'diketahui', 'direview', 'disetujui'].forEach((role) => {
      signatures[role] = {
        ...(signatures[role] || {}),
        date: formattedShort
      };
    });

    onChange({
      ...data,
      tanggalPengajuan: newDate,
      signatures
    });
  };

  const handlePerkiraanBiayaChange = (val) => {
    const rawDigits = val.replace(/[^0-9]/g, '');
    if (!rawDigits) {
      onChange({
        ...data,
        perkiraanBiaya: '',
        biayaYangDiajukan: ''
      });
      return;
    }
    const num = parseInt(rawDigits, 10);
    const formatted = `Rp ${new Intl.NumberFormat('id-ID').format(num)},-`;

    // Auto-populate / sync biayaYangDiajukan
    let newBiayaYangDiajukan = data.biayaYangDiajukan || '';
    if (!newBiayaYangDiajukan || newBiayaYangDiajukan.startsWith('Total Biaya')) {
      newBiayaYangDiajukan = `Total Biaya Yang Diajukan : ${formatted}`;
    } else if (/Total Biaya/i.test(newBiayaYangDiajukan)) {
      newBiayaYangDiajukan = newBiayaYangDiajukan.replace(/Total Biaya(\s*Yang\s*Diajukan)?\s*:\s*Rp\s*[0-9.,-]+/i, `Total Biaya : ${formatted}`);
    } else {
      newBiayaYangDiajukan = `${newBiayaYangDiajukan}\n\nTotal Biaya : ${formatted}`;
    }

    onChange({
      ...data,
      perkiraanBiaya: formatted,
      biayaYangDiajukan: newBiayaYangDiajukan
    });
  };

  const generateIOMNumber = () => {
    const today = new Date();
    const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    const romanMonth = romanMonths[today.getMonth()];
    const year = today.getFullYear();
    const randomNum = String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');
    const autoNo = `${randomNum}/IOM/IMT/${romanMonth}/${year}`;
    updateField('iomNo', autoNo);
  };

  const handlePertimbanganChange = (index, value) => {
    const list = [...(data.pertimbangan || [])];
    list[index] = value;
    updateField('pertimbangan', list);
  };

  const addPertimbangan = () => {
    const list = [...(data.pertimbangan || []), ''];
    updateField('pertimbangan', list);
  };

  const removePertimbangan = (index) => {
    const list = [...(data.pertimbangan || [])];
    list.splice(index, 1);
    updateField('pertimbangan', list);
  };

  const handleDataPendukungTextChange = (index, value) => {
    const list = [...(data.dataPendukung || [])];
    const current = list[index];
    if (typeof current === 'object' && current !== null) {
      list[index] = { ...current, text: value };
    } else {
      list[index] = value;
    }
    updateField('dataPendukung', list);
  };

  const handleDataPendukungFileUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const list = [...(data.dataPendukung || [])];
      const current = list[index];
      const currentText = typeof current === 'object' && current !== null ? current.text : current;
      list[index] = {
        text: currentText || file.name,
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(1) + ' KB',
        fileType: file.type,
        fileData: e.target.result
      };
      updateField('dataPendukung', list);
    };
    reader.readAsDataURL(file);
  };

  const removeDataPendukungFile = (index) => {
    const list = [...(data.dataPendukung || [])];
    const current = list[index];
    const currentText = typeof current === 'object' && current !== null ? current.text : current;
    list[index] = currentText || '';
    updateField('dataPendukung', list);
  };

  const addDataPendukung = () => {
    const list = [...(data.dataPendukung || []), ''];
    updateField('dataPendukung', list);
  };

  const removeDataPendukung = (index) => {
    const list = [...(data.dataPendukung || [])];
    list.splice(index, 1);
    updateField('dataPendukung', list);
  };

  const updateSignature = (roleKey, signData) => {
    const signatures = { ...(data.signatures || {}) };
    signatures[roleKey] = {
      ...(signatures[roleKey] || {}),
      sign: signData
    };
    updateField('signatures', signatures);
  };

  const updateSignatureMeta = (roleKey, field, value) => {
    const signatures = { ...(data.signatures || {}) };
    signatures[roleKey] = {
      ...(signatures[roleKey] || {}),
      [field]: value
    };
    updateField('signatures', signatures);
  };

  return (
    <div className="space-y-6">
      {/* Header Form Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Informasi Dasar IOM</span>
          <button
            type="button"
            onClick={generateIOMNumber}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Auto Nomor IOM
          </button>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nomor IOM</label>
            <input
              type="text"
              value={data.iomNo || ''}
              onChange={(e) => updateField('iomNo', e.target.value)}
              placeholder="Contoh: 023/IOM/IMT/VIII/2026"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Diajukan Oleh</label>
            <input
              type="text"
              value={data.diajukanOleh || ''}
              onChange={(e) => handleDiajukanOlehChange(e.target.value)}
              placeholder="Nama pemohon"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Divisi / Dept.</label>
            <input
              type="text"
              value={data.divisi || ''}
              onChange={(e) => updateField('divisi', e.target.value)}
              placeholder="Contoh: IT / Engineering / Finance"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Cost Centre / Project</label>
            <input
              type="text"
              value={data.costCentre || ''}
              onChange={(e) => updateField('costCentre', e.target.value)}
              placeholder="Contoh: Operational / Project Alpha"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Perihal</label>
            <input
              type="text"
              value={data.perihal || ''}
              onChange={(e) => updateField('perihal', e.target.value)}
              placeholder="Contoh: Pengajuan Biaya Operasional Maintenance Server"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Perkiraan Biaya <span className="text-[10px] text-blue-600 font-normal">(Otomatis format Rp)</span>
            </label>
            <input
              type="text"
              value={data.perkiraanBiaya || ''}
              onChange={(e) => handlePerkiraanBiayaChange(e.target.value)}
              placeholder="Ketik angka (Contoh: 1850000)"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-blue-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Tanggal Pengajuan <span className="text-[10px] text-blue-600 font-normal">(Otomatis mengisi tanggal tanda tangan)</span>
            </label>
            <input
              type="date"
              value={data.tanggalPengajuan || ''}
              onChange={(e) => handleTanggalPengajuanChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section I: Pertimbangan */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">I. Pertimbangan</h3>
            <p className="text-xs text-slate-500">Poin-poin alasan atau latar belakang pengajuan</p>
          </div>
          <button
            type="button"
            onClick={addPertimbangan}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Poin
          </button>
        </div>

        <div className="space-y-2.5">
          {(data.pertimbangan || []).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="w-6 py-2 text-xs font-bold text-slate-500 text-center">{idx + 1}.</span>
              <textarea
                rows={2}
                value={item}
                onChange={(e) => handlePertimbanganChange(idx, e.target.value)}
                placeholder={`Isi pertimbangan poin ${idx + 1}`}
                className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removePertimbangan(idx)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Hapus baris"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section II: Data Pendukung */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">II. Data Pendukung</h3>
            <p className="text-xs text-slate-500">Tuliskan nama dokumen atau lampirkan file dokumen pendukung (PDF/Doc/Gambar)</p>
          </div>
          <button
            type="button"
            onClick={addDataPendukung}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Dokumen
          </button>
        </div>

        <div className="space-y-3">
          {(data.dataPendukung || []).map((dp, idx) => {
            const isObj = typeof dp === 'object' && dp !== null;
            const textValue = isObj ? (dp.text || '') : (dp || '');
            const hasFile = isObj && dp.fileName;

            return (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 py-1 text-xs font-bold text-slate-500 text-center">-</span>
                  <input
                    type="text"
                    value={textValue}
                    onChange={(e) => handleDataPendukungTextChange(idx, e.target.value)}
                    placeholder="Contoh: Penawaran Harga Vendor / Invoice / Laporan Teknis"
                    className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  
                  {/* Attach File Button */}
                  <label className="cursor-pointer px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-blue-200 shrink-0 transition">
                    <input
                      type="file"
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                      onChange={(e) => handleDataPendukungFileUpload(idx, e.target.files?.[0])}
                      className="hidden"
                    />
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{hasFile ? 'Ganti File/Foto' : 'Lampirkan Foto/File'}</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => removeDataPendukung(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Hapus baris"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Attached File/Photo Indicator with Image Preview */}
                {hasFile && (
                  <div className="ml-7 bg-white p-2.5 rounded-xl border border-emerald-200 text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {dp.fileData && dp.fileData.startsWith('data:image/') ? (
                        <img
                          src={dp.fileData}
                          alt="Thumbnail"
                          className="h-12 w-16 object-contain rounded border bg-slate-50 p-0.5"
                        />
                      ) : (
                        <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      <div>
                        <span className="font-semibold text-emerald-900 block truncate max-w-[240px] sm:max-w-md">
                          {dp.fileName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {dp.fileSize || 'Lampiran tersimpan'}
                          {dp.fileData?.startsWith('data:image/') ? ' • Foto siap ditampilkan di dokumen' : ''}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDataPendukungFile(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition"
                      title="Hapus lampiran ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section III: Biaya & Catatan Rekening */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-800 pb-2 border-b border-slate-100">
          III. Rincian Biaya & Rekening Transfer
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Rincian Biaya Yang Diajukan</label>
          <textarea
            rows={4}
            value={data.biayaYangDiajukan || ''}
            onChange={(e) => updateField('biayaYangDiajukan', e.target.value)}
            placeholder="Tuliskan rincian biaya atau kebutuhan yang diajukan..."
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Catatan Rekening Transfer Pembayaran
          </label>
          <input
            type="text"
            value={data.catatanRekening || ''}
            onChange={(e) => updateField('catatanRekening', e.target.value)}
            placeholder="Contoh: BCA 1234567890 a.n. Septya / Kas Kecil"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Signatures Settings */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
          Otorisasi & Tanda Tangan
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Diajukan Oleh */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">Diajukan Oleh</span>
              <input
                type="text"
                value={data.signatures?.diajukan?.name || ''}
                onChange={(e) => updateSignatureMeta('diajukan', 'name', e.target.value)}
                placeholder="Nama Pemohon"
                className="w-full px-2 py-1 text-xs border border-slate-300 rounded mb-2 bg-white"
              />
              <input
                type="text"
                value={data.signatures?.diajukan?.date || ''}
                onChange={(e) => updateSignatureMeta('diajukan', 'date', e.target.value)}
                placeholder="Date: DD/MM/YYYY"
                className="w-full px-2 py-1 text-xs border border-slate-300 rounded mb-2 bg-white"
              />
            </div>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="h-10 flex items-center">
                {data.signatures?.diajukan?.sign ? (
                  <img src={data.signatures.diajukan.sign} alt="Sign" className="h-8 object-contain" />
                ) : (
                  <span className="text-[11px] text-slate-400 italic">Belum ada</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveSignModal('diajukan')}
                className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
              >
                <Upload className="w-3.5 h-3.5" /> Lampirkan File
              </button>
            </div>
          </div>

          {/* Diketahui Oleh (RPM) */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">Diketahui Oleh (RPM)</span>
              <input
                type="text"
                value={data.signatures?.diketahui?.date || ''}
                onChange={(e) => updateSignatureMeta('diketahui', 'date', e.target.value)}
                placeholder="Date: DD/MM/YYYY"
                className="w-full px-2 py-1 text-xs border border-slate-300 rounded mb-2 bg-white"
              />
            </div>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="h-10 flex items-center">
                {data.signatures?.diketahui?.sign ? (
                  <img src={data.signatures.diketahui.sign} alt="Sign" className="h-8 object-contain" />
                ) : (
                  <span className="text-[11px] text-slate-400 italic">Belum ada</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveSignModal('diketahui')}
                className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
              >
                <Upload className="w-3.5 h-3.5" /> Lampirkan File
              </button>
            </div>
          </div>

          {/* Direview Oleh (Admin) */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700">Direview (Admin)</span>
                <button
                  type="button"
                  onClick={() => updateSignature('direview', DEFAULT_SIGNATURES.septya)}
                  className="text-[10px] text-blue-600 hover:underline font-semibold"
                >
                  Pakai Default
                </button>
              </div>
              <input
                type="text"
                value={data.signatures?.direview?.date || ''}
                onChange={(e) => updateSignatureMeta('direview', 'date', e.target.value)}
                placeholder="Date: DD/MM/YYYY"
                className="w-full px-2 py-1 text-xs border border-slate-300 rounded mb-2 bg-white"
              />
            </div>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="h-10 flex items-center">
                {data.signatures?.direview?.sign ? (
                  <img src={data.signatures.direview.sign} alt="Sign" className="h-8 object-contain" />
                ) : (
                  <span className="text-[11px] text-slate-400 italic">Belum ada</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveSignModal('direview')}
                className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
              >
                <Upload className="w-3.5 h-3.5" /> Lampirkan File
              </button>
            </div>
          </div>

          {/* Disetujui Oleh (Pimpinan) */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700">Disetujui (Pimpinan)</span>
                <button
                  type="button"
                  onClick={() => updateSignature('disetujui', DEFAULT_SIGNATURES.pimpinan)}
                  className="text-[10px] text-blue-600 hover:underline font-semibold"
                >
                  Pakai Default
                </button>
              </div>
              <input
                type="text"
                value={data.signatures?.disetujui?.date || ''}
                onChange={(e) => updateSignatureMeta('disetujui', 'date', e.target.value)}
                placeholder="Date: DD/MM/YYYY"
                className="w-full px-2 py-1 text-xs border border-slate-300 rounded mb-2 bg-white"
              />
            </div>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="h-10 flex items-center">
                {data.signatures?.disetujui?.sign ? (
                  <img src={data.signatures.disetujui.sign} alt="Sign" className="h-8 object-contain" />
                ) : (
                  <span className="text-[11px] text-slate-400 italic">Belum ada</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveSignModal('disetujui')}
                className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
              >
                <Upload className="w-3.5 h-3.5" /> Lampirkan File
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
        title={`Lampirkan TTD - ${activeSignModal?.toUpperCase()}`}
        currentSignature={activeSignModal ? data.signatures?.[activeSignModal]?.sign : null}
      />
    </div>
  );
};
