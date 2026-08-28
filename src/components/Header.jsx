import React from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  RotateCcw, 
  Sparkles, 
  Eye, 
  Edit3, 
  Columns, 
  Save, 
  Upload,
  CheckCircle2,
  FolderKanban,
  FileDown
} from 'lucide-react';

export const Header = ({
  activeDoc,
  setActiveDoc,
  viewMode,
  setViewMode,
  onSaveDoc,
  savedCount = 0,
  onDownloadPdf,
  onPrint,
  onLoadSample,
  onReset,
  onExportJson,
  onImportJson,
  isGeneratingPdf
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm no-print">
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-black text-lg">
              IMT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                  Document & PDF Generator
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200" title="Semua perubahan otomatis tersimpan di browser">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Auto-saved
                </span>
              </div>
              <p className="text-[11px] text-slate-500">PT. Infiniti Matrix Teknology</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Simpan Dokumen langsung ke Web UI */}
            <button
              onClick={onSaveDoc}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 rounded-xl shadow-xs transition"
              title="Simpan dokumen ke daftar dokumen tersimpan di browser"
            >
              <Save className="w-4 h-4 text-emerald-600" /> Simpan Dokumen
            </button>

            <button
              onClick={onLoadSample}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              title="Isi form dengan contoh data siap pakai"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Contoh Data
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl shadow-sm transition"
              title="Cetak dokumen atau Simpan ke PDF via Browser"
            >
              <Printer className="w-4 h-4 text-slate-600" /> Cetak / Print
            </button>

            <button
              onClick={onDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-md shadow-blue-500/25 transition disabled:opacity-50"
            >
              {isGeneratingPdf ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sub Toolbar: Document Selector & View Toggles */}
      <div className="bg-slate-50/80 border-t border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Document Tab Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
            <button
              onClick={() => setActiveDoc('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
                activeDoc === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              Semua Halaman (1, 2 & 3)
            </button>
            <button
              onClick={() => setActiveDoc('iom')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
                activeDoc === 'iom'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              1. Internal Office Memo (IOM)
            </button>
            <button
              onClick={() => setActiveDoc('settlement')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
                activeDoc === 'settlement'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              2. Settlement
            </button>
            <button
              onClick={() => setActiveDoc('evidence')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
                activeDoc === 'evidence'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              3. Bukti Transaksi
            </button>
            <button
              onClick={() => setActiveDoc('saved-docs')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap flex items-center gap-1.5 transition ${
                activeDoc === 'saved-docs'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100/70 border border-emerald-200/80'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Dokumen Tersimpan ({savedCount})</span>
            </button>
          </div>

          {/* View Mode & Utility Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* View Mode (Only show when not in saved-docs tab) */}
            {activeDoc !== 'saved-docs' && (
              <div className="hidden lg:flex items-center bg-slate-200/70 p-1 rounded-xl gap-1">
                <button
                  onClick={() => setViewMode('split')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg transition ${
                    viewMode === 'split' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Berdampingan (Form + Preview)"
                >
                  <Columns className="w-3.5 h-3.5" /> Split
                </button>
                <button
                  onClick={() => setViewMode('form')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg transition ${
                    viewMode === 'form' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Fokus Form Input"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Form Saja
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg transition ${
                    viewMode === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Fokus Pratinjau Dokumen"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview Saja
                </button>
              </div>
            )}

            {/* Extra Tools */}
            <div className="flex items-center gap-1 border-l border-slate-300 pl-3">
              <button
                onClick={onExportJson}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition"
                title="Download Backup File (JSON)"
              >
                <FileDown className="w-4 h-4" />
              </button>
              <label
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg cursor-pointer transition"
                title="Import Backup File (JSON)"
              >
                <input type="file" accept=".json" onChange={onImportJson} className="hidden" />
                <Upload className="w-4 h-4" />
              </label>
              <button
                onClick={onReset}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Reset Form"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

