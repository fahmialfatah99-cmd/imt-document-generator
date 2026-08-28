import React, { useState } from 'react';
import { 
  FileText, 
  Trash2, 
  Edit3, 
  Plus, 
  Copy, 
  Calendar, 
  User, 
  Search, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { formatRupiah, formatDate } from '../utils/formatters';

export const SavedDocumentsList = ({
  savedDocs,
  onLoadDoc,
  onDeleteDoc,
  onDuplicateDoc,
  onNewDoc,
  currentDocId
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocs = (savedDocs || []).filter((doc) => {
    const term = searchTerm.toLowerCase();
    const iomNo = doc.iomNo?.toLowerCase() || '';
    const perihal = doc.title?.toLowerCase() || '';
    const name = doc.diajukanOleh?.toLowerCase() || '';
    const divisi = doc.divisi?.toLowerCase() || '';
    return iomNo.includes(term) || perihal.includes(term) || name.includes(term) || divisi.includes(term);
  });

  const formatSaveTime = (isoString) => {
    if (!isoString) return '-';
    try {
      const d = new Date(isoString);
      return d.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Header & Action */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            Daftar Dokumen Tersimpan di Web
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Semua dokumen yang Anda simpan tersimpan langsung di browser ini dan dapat dibuka kapan saja untuk dilanjutkan editnya.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNewDoc}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" /> + Buat Dokumen Baru
          </button>
        </div>
      </div>

      {/* Search & Counter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari berdasarkan No IOM, Pemohon, atau Perihal..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Total: <span className="font-bold text-slate-800">{filteredDocs.length}</span> dokumen
        </div>
      </div>

      {/* Grid of Saved Documents */}
      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => {
            const isCurrentlyActive = doc.id === currentDocId;
            return (
              <div
                key={doc.id}
                className={`bg-white rounded-2xl border transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                  isCurrentlyActive
                    ? 'border-blue-500 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Card Header */}
                <div className="p-5 border-b border-slate-100 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-mono font-semibold">
                      {doc.iomNo || 'Tanpa No IOM'}
                    </span>
                    {isCurrentlyActive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-[10px] font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-blue-600" /> Sedang Diedit
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2" title={doc.title}>
                    {doc.title || 'Pengajuan Tanpa Judul'}
                  </h3>

                  {/* Metadata fields */}
                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{doc.diajukanOleh || '-'} {doc.divisi ? `(${doc.divisi})` : ''}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{doc.tanggal ? formatDate(doc.tanggal, 'long') : '-'}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[11px] text-slate-400">Estimasi Biaya:</span>
                      <span className="font-bold text-blue-900 text-xs">{doc.perkiraanBiaya || '-'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-3 bg-slate-50/80 flex items-center justify-between gap-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatSaveTime(doc.savedAt)}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onDuplicateDoc(doc)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 rounded-lg transition"
                      title="Duplikat Dokumen"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteDoc(doc.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Hapus Dokumen"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onLoadDoc(doc)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Buka Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mx-auto">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-700">Belum Ada Dokumen Tersimpan</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Saat Anda sedang mengisi form dokumen, klik tombol <strong>"Simpan Dokumen"</strong> di header atas untuk menyimpannya ke daftar ini.
            </p>
          </div>
          <button
            type="button"
            onClick={onNewDoc}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
          >
            <Plus className="w-4 h-4" /> Mulai Buat Dokumen Baru
          </button>
        </div>
      )}
    </div>
  );
};
