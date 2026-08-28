import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, Trash2, Upload, PenTool, Sparkles } from 'lucide-react';
import { DEFAULT_SIGNATURES } from '../utils/signatures';

export const SignatureModal = ({
  isOpen,
  onClose,
  onSave,
  title = 'Tanda Tangan',
  currentSignature = null
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [activeTab, setActiveTab] = useState('draw'); // 'draw', 'presets', 'upload'
  const [previewImage, setPreviewImage] = useState(null);

  // Synchronize when modal opens or current signature changes
  useEffect(() => {
    if (isOpen) {
      setPreviewImage(currentSignature || null);
      setHasDrawn(false);

      // Delay slightly to ensure canvas DOM is mounted and visible
      const timer = setTimeout(() => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
      }, 60);

      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, currentSignature]);

  if (!isOpen) return null;

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Support mouse or touch
    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;

    if (clientX === undefined || clientY === undefined) return { x: 0, y: 0 };

    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = getCanvasCoordinates(e);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (e.cancelable && e.touches) {
      e.preventDefault();
    }

    const { x, y } = getCanvasCoordinates(e);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasDrawn(false);
  };

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
    if (activeTab === 'draw') {
      if (hasDrawn && canvasRef.current) {
        const dataUrl = canvasRef.current.toDataURL('image/png');
        onSave(dataUrl);
      } else if (previewImage) {
        onSave(previewImage);
      } else {
        onSave(null);
      }
    } else if (activeTab === 'presets' || activeTab === 'upload') {
      onSave(previewImage || null);
    }
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
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col border border-slate-200 z-[10000] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-800 text-base">{title}</h3>
            <p className="text-xs text-slate-500">Pilih metode pembuatan tanda tangan digital</p>
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
            onClick={() => setActiveTab('draw')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'draw' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" /> Gores Langsung
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'presets' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Preset Template
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'upload' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> Upload File
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'draw' && (
            <div>
              <div className="border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/70 relative overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={460}
                  height={180}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-[180px] cursor-crosshair block"
                />
                {!hasDrawn && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 select-none pointer-events-none">
                    Gores tanda tangan di area ini (Touch / Mouse)
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mt-3">
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium px-3 py-1.5 rounded-lg hover:bg-rose-50 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Bersihkan Canvas
                </button>
                <span className="text-[11px] text-slate-400">Transparan otomatis</span>
              </div>
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

          {activeTab === 'upload' && (
            <div className="space-y-3">
              <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/20 transition">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <Upload className="w-8 h-8 text-blue-500 mb-2" />
                <span className="text-xs font-semibold text-slate-700">Pilih gambar tanda tangan (PNG / JPG)</span>
                <span className="text-[11px] text-slate-400 mt-1">Disarankan berlatar belakang transparan atau putih</span>
              </label>

              {previewImage && (
                <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-12 max-w-[120px] object-contain bg-white rounded border p-1"
                    />
                    <span className="text-xs text-slate-600">Gambar terpilih</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewImage(null)}
                    className="text-xs text-rose-600 hover:underline font-medium"
                  >
                    Hapus
                  </button>
                </div>
              )}
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
