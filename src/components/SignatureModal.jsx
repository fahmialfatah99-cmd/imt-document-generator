import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, Trash2, Upload, PenTool, Sparkles } from 'lucide-react';
import { DEFAULT_SIGNATURES } from '../utils/signatures';

export const SignatureModal = ({
  isOpen,
  onClose,
  onSave,
  title = 'Lampirkan Tanda Tangan',
  currentSignature = null
}) => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload', 'presets'
  const [previewImage, setPreviewImage] = useState(null);

  // Synchronize when modal opens or current signature changes
  useEffect(() => {
    if (isOpen) {
      setPreviewImage(currentSignature || null);
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, currentSignature]);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(previewImage || null);
    onClose();
  };

  const handleRemove = () => {
    onSave(null);
    onClose();
  };

  // Render via React Portal to document.body with highest z-index
  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col border border-slate-200 z-[10000] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-600" /> {title}
            </h3>
            <p className="text-xs text-slate-500">Lampirkan file gambar tanda tangan atau pilih preset</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 bg-slate-100/80 p-1.5 gap-1.5 mx-6 mt-4 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'upload' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> 1. Upload File Gambar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'presets' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> 2. Preset Template
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/60 hover:bg-blue-50/20 transition group">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">Klik untuk lampirkan file tanda tangan</span>
                <span className="text-[11px] text-slate-400 mt-1">Format PNG / JPG / WebP (disarankan background transparan)</span>
              </label>

              {previewImage && (
                <div className="border border-slate-200 rounded-xl p-3.5 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-14 max-w-[140px] object-contain bg-white rounded-lg border p-1"
                    />
                    <div>
                      <span className="text-xs font-semibold text-slate-700 block">File gambar terpilih</span>
                      <span className="text-[10px] text-emerald-600 font-medium">✓ Siap dipasang</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewImage(null)}
                    className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-lg transition"
                    title="Hapus gambar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">Pilih tanda tangan resmi template yang sudah disiapkan:</p>
              <div className="grid grid-cols-3 gap-3">
                {/* Preset Septya */}
                <button
                  type="button"
                  onClick={() => setPreviewImage(DEFAULT_SIGNATURES.septya)}
                  className={`border-2 rounded-xl p-3 flex flex-col items-center justify-between h-32 transition ${
                    previewImage === DEFAULT_SIGNATURES.septya
                      ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex-1 flex items-center justify-center w-full">
                    <img src={DEFAULT_SIGNATURES.septya} alt="Septya Sign" className="max-h-16 object-contain" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">Septya (Admin)</span>
                </button>

                {/* Preset Pimpinan */}
                <button
                  type="button"
                  onClick={() => setPreviewImage(DEFAULT_SIGNATURES.pimpinan)}
                  className={`border-2 rounded-xl p-3 flex flex-col items-center justify-between h-32 transition ${
                    previewImage === DEFAULT_SIGNATURES.pimpinan
                      ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex-1 flex items-center justify-center w-full">
                    <img src={DEFAULT_SIGNATURES.pimpinan} alt="Pimpinan Sign" className="max-h-16 object-contain" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">Pimpinan</span>
                </button>

                {/* Preset User / Paraf */}
                <button
                  type="button"
                  onClick={() => setPreviewImage(DEFAULT_SIGNATURES.user)}
                  className={`border-2 rounded-xl p-3 flex flex-col items-center justify-between h-32 transition ${
                    previewImage === DEFAULT_SIGNATURES.user
                      ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex-1 flex items-center justify-center w-full">
                    <img src={DEFAULT_SIGNATURES.user} alt="Paraf Sign" className="max-h-16 object-contain" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">Paraf User</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs text-rose-600 hover:text-rose-700 font-medium transition"
          >
            Hapus Tanda Tangan
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow transition"
            >
              <Check className="w-4 h-4" /> Pasang Tanda Tangan
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
