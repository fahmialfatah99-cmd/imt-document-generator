import React from 'react';

export const PageEvidence = ({ data }) => {
  const {
    noBuktiTransaksi = '',
    nama = '',
    evidences = [
      { image: null, description: '' },
      { image: null, description: '' },
      { image: null, description: '' },
      { image: null, description: '' },
    ]
  } = data || {};

  // Ensure 4 items
  const slots = [0, 1, 2, 3].map(i => evidences[i] || { image: null, description: '' });

  return (
    <div className="a4-page bg-white text-black text-[13px] flex flex-col justify-between select-none relative box-border" style={{ minHeight: '297mm', padding: '16mm 18mm' }}>
      <div>
        {/* Header Details */}
        <div className="grid grid-cols-2 gap-8 mb-4 text-[13px] font-medium">
          <div className="flex items-center">
            <span className="w-36">No Bukti transaksi :</span>
            <span className="font-semibold text-slate-900">{noBuktiTransaksi}</span>
          </div>
          <div className="flex items-center">
            <span className="w-16">Nama :</span>
            <span className="font-semibold text-slate-900">{nama}</span>
          </div>
        </div>

        {/* 2x2 Grid of Evidence Boxes */}
        <div className="grid grid-cols-2 gap-4">
          {slots.map((item, index) => (
            <div key={index} className="border-[1.5px] border-black flex flex-col justify-between" style={{ height: '360px' }}>
              {/* Image Preview Container */}
              <div className="flex-1 flex items-center justify-center p-2 overflow-hidden bg-slate-50/50">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={`Bukti ${index + 1}`}
                    className="max-h-[300px] max-w-full object-contain shadow-sm"
                  />
                ) : (
                  <div className="text-slate-300 flex flex-col items-center justify-center text-xs">
                    <span className="border border-dashed border-slate-300 rounded p-4 text-slate-400">
                      Lampiran Nota / Bukti #{index + 1}
                    </span>
                  </div>
                )}
              </div>

              {/* Description Bar */}
              <div className="border-t-[1.5px] border-black px-2 py-1 text-[11.5px] bg-white flex items-start min-h-[28px]">
                <span className="font-medium shrink-0 mr-1">Description :</span>
                <span className="text-slate-800 break-words line-clamp-2">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-[10px] text-slate-400 mt-2">
        Lampiran Bukti Transaksi - PT. Infiniti Matrix Teknology
      </div>
    </div>
  );
};
