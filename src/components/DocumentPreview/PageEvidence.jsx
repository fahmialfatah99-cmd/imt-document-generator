import React from 'react';

export const PageEvidence = ({ data }) => {
  const {
    noBuktiTransaksi = '',
    nama = '',
    evidences = []
  } = data || {};

  // Fallback if empty
  const rawList = evidences && evidences.length > 0
    ? evidences
    : [{ image: null, description: '' }];

  const itemsPerPage = 4;
  const pages = [];
  for (let i = 0; i < rawList.length; i += itemsPerPage) {
    const chunk = [...rawList.slice(i, i + itemsPerPage)];
    while (chunk.length < itemsPerPage) {
      chunk.push({ image: null, description: '' });
    }
    pages.push(chunk);
  }

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {pages.map((pageSlots, pageIdx) => (
        <div
          key={pageIdx}
          className="a4-page print-page-break bg-white text-black text-[13px] flex flex-col justify-between select-none relative box-border"
          style={{ minHeight: '297mm', padding: '16mm 18mm' }}
        >
          <div>
            {/* Header Details */}
            <div className="grid grid-cols-2 gap-8 mb-4 text-[13px] font-medium border-b border-slate-300 pb-2">
              <div className="flex items-center">
                <span className="w-36">No Bukti transaksi :</span>
                <span className="font-semibold text-slate-900">{noBuktiTransaksi || '-'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-16">Nama :</span>
                  <span className="font-semibold text-slate-900">{nama || '-'}</span>
                </div>
                {pages.length > 1 && (
                  <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-300 font-bold">
                    Halaman {pageIdx + 1} / {pages.length}
                  </span>
                )}
              </div>
            </div>

            {/* 2x2 Grid of Evidence Boxes */}
            <div className="grid grid-cols-2 gap-4">
              {pageSlots.map((item, index) => {
                const globalIndex = pageIdx * itemsPerPage + index + 1;
                return (
                  <div key={index} className="border-[1.5px] border-black flex flex-col justify-between" style={{ height: '360px' }}>
                    {/* Image Preview Container */}
                    <div className="flex-1 flex items-center justify-center p-2 overflow-hidden bg-slate-50/50">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={`Bukti ${globalIndex}`}
                          className="max-h-[300px] max-w-full object-contain shadow-sm"
                        />
                      ) : (
                        <div className="text-slate-300 flex flex-col items-center justify-center text-xs">
                          <span className="border border-dashed border-slate-300 rounded p-4 text-slate-400">
                            Lampiran Nota / Bukti #{globalIndex}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description Bar */}
                    <div className="border-t-[1.5px] border-black px-2 py-1 text-[11.5px] bg-white flex items-start min-h-[28px]">
                      <span className="font-medium shrink-0 mr-1">Description :</span>
                      <span className="text-slate-800 break-words line-clamp-2">{item.description || ''}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-400 mt-2">
            Lampiran Bukti Transaksi - PT. Infiniti Matrix Teknology {pages.length > 1 ? `(Halaman ${pageIdx + 1} dari ${pages.length})` : ''}
          </div>
        </div>
      ))}
    </div>
  );
};
