import React from 'react';
import { formatDate } from '../../utils/formatters';

export const PageIOM = ({ data }) => {
  const {
    iomNo = '',
    diajukanOleh = '',
    divisi = '',
    costCentre = '',
    perihal = '',
    perkiraanBiaya = '',
    tanggalPengajuan = '',
    pertimbangan = ['', '', '', '', ''],
    dataPendukung = [''],
    biayaYangDiajukan = '',
    catatanRekening = '',
    signatures = {
      diajukan: { name: '', sign: null, date: '' },
      diketahui: { role: 'RPM', sign: null, date: '' },
      direview: { role: 'Admin', sign: null, date: '' },
      disetujui: { role: 'Pimpinan', sign: null, date: '' }
    }
  } = data || {};

  const displayedBiaya = biayaYangDiajukan || (perkiraanBiaya ? `Total Biaya Yang Diajukan : ${perkiraanBiaya}` : '');

  return (
    <div className="a4-page bg-white text-black text-[12.5px] flex flex-col justify-between select-none relative box-border" style={{ minHeight: '297mm', padding: '14mm 16mm' }}>
      <div className="space-y-2">
        {/* Header */}
        <div className="text-center mb-1">
          <h1 className="font-bold text-[15px] tracking-wide mb-1">PT. INFINITI MATRIX TEKNOLOGY</h1>
          <div className="inline-block border-[1.5px] border-black px-12 py-0.5 rounded-sm w-full max-w-[540px]">
            <h2 className="font-bold text-[13.5px] tracking-wider">INTERNAL OFFICE MEMO</h2>
          </div>
        </div>

        {/* Top Info Box */}
        <div className="border-[1.5px] border-black p-2 leading-relaxed text-[12px]">
          <div className="grid grid-cols-[150px_10px_1fr] items-center">
            <span className="font-medium">IOM No.</span>
            <span>:</span>
            <span className="font-semibold text-slate-900">{iomNo || '-'}</span>

            <span className="font-medium">Diajukan Oleh</span>
            <span>:</span>
            <span>{diajukanOleh || '-'}</span>

            <span className="font-medium">Divisi/Dept.</span>
            <span>:</span>
            <span>{divisi || '-'}</span>

            <span className="font-medium">Cost Centre/Project</span>
            <span>:</span>
            <span>{costCentre || '-'}</span>
          </div>
        </div>

        {/* Second Info Box */}
        <div className="border-[1.5px] border-black p-2 leading-relaxed text-[12px]">
          <div className="grid grid-cols-[150px_10px_1fr] items-center">
            <span className="font-medium">Perihal</span>
            <span>:</span>
            <span className="font-medium">{perihal || '-'}</span>

            <span className="font-medium">Perkiraan Biaya</span>
            <span>:</span>
            <span className="font-semibold">{perkiraanBiaya || '-'}</span>

            <span className="font-medium">Tanggal Pengajuan</span>
            <span>:</span>
            <span>{formatDate(tanggalPengajuan, 'long') || tanggalPengajuan || '-'}</span>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="border-[1.5px] border-black p-3 text-[12px] space-y-3">
          {/* Section I */}
          <div>
            <div className="font-bold mb-1">I. &nbsp;&nbsp; PERTIMBANGAN :</div>
            <div className="pl-5 space-y-1">
              {pertimbangan && pertimbangan.length > 0 ? (
                pertimbangan.map((item, idx) => (
                  <div key={idx} className="flex items-start text-justify">
                    <span className="w-5 shrink-0">{idx + 1}.</span>
                    <span className="flex-1">{item || ''}</span>
                  </div>
                ))
              ) : (
                <div className="flex">
                  <span className="w-5">1.</span>
                  <span>-</span>
                </div>
              )}
            </div>
          </div>

          {/* Section II */}
          <div>
            <div className="font-bold mb-1">II. &nbsp; DATA PENDUKUNG :</div>
            <div className="pl-5 space-y-1">
              {dataPendukung && dataPendukung.length > 0 ? (
                dataPendukung.map((dp, idx) => {
                  const text = typeof dp === 'object' && dp !== null 
                    ? (dp.text || dp.fileName || '') 
                    : (dp || '');
                  const hasFile = typeof dp === 'object' && dp !== null && dp.fileName;
                  if (!text && !hasFile) return null;
                  return (
                    <div key={idx} className="flex items-start">
                      <span className="w-5 shrink-0">-</span>
                      <span className="flex-1">
                        {text}
                        {hasFile && dp.fileName !== text ? (
                          <span className="text-[10.5px] text-slate-600 italic ml-1">
                            (Lampiran: {dp.fileName})
                          </span>
                        ) : null}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex">
                  <span className="w-5">-</span>
                  <span>-</span>
                </div>
              )}
            </div>
          </div>

          {/* Section III */}
          <div>
            <div className="font-bold mb-1">III. BIAYA YANG DIAJUKAN :</div>
            <div className="pl-5 text-slate-800 whitespace-pre-line leading-relaxed font-medium">
              {displayedBiaya || '-'}
            </div>
          </div>

          {/* Transfer Note */}
          <div className="pt-2 border-t border-dashed border-slate-300 text-[11.5px] italic text-slate-700">
            Catatan : Pembayaran dapat ditransfer ke rekening {catatanRekening || '........'}
          </div>
        </div>
      </div>

      {/* Signature Section at bottom */}
      <div className="border-[1.5px] border-black mt-3 text-[11.5px]">
        <div className="grid grid-cols-4 divide-x-[1.5px] divide-black border-b-[1.5px] border-black text-center font-medium bg-slate-50 py-1">
          <div>Diajukan Oleh :</div>
          <div>Diketahui Oleh :</div>
          <div>Direview Oleh :</div>
          <div>Disetujui Oleh :</div>
        </div>

        {/* Signature visuals row */}
        <div className="grid grid-cols-4 divide-x-[1.5px] divide-black h-[70px]">
          {/* Diajukan */}
          <div className="flex items-center justify-center p-1">
            {signatures?.diajukan?.sign ? (
              <img src={signatures.diajukan.sign} alt="Sign" className="max-h-[58px] max-w-[95px] object-contain" />
            ) : null}
          </div>

          {/* Diketahui (RPM) */}
          <div className="flex items-center justify-center p-1">
            {signatures?.diketahui?.sign ? (
              <img src={signatures.diketahui.sign} alt="RPM Sign" className="max-h-[58px] max-w-[95px] object-contain" />
            ) : null}
          </div>

          {/* Direview (Admin) */}
          <div className="flex items-center justify-center p-1">
            {signatures?.direview?.sign ? (
              <img src={signatures.direview.sign} alt="Admin Sign" className="max-h-[58px] max-w-[95px] object-contain" />
            ) : null}
          </div>

          {/* Disetujui (Pimpinan) */}
          <div className="flex items-center justify-center p-1">
            {signatures?.disetujui?.sign ? (
              <img src={signatures.disetujui.sign} alt="Pimpinan Sign" className="max-h-[58px] max-w-[95px] object-contain" />
            ) : null}
          </div>
        </div>

        {/* Roles row */}
        <div className="grid grid-cols-4 divide-x-[1.5px] divide-black border-t-[1px] border-black text-center text-[11px] py-0.5">
          <div className="font-normal">{signatures?.diajukan?.name || '( Pemohon )'}</div>
          <div className="font-normal">RPM</div>
          <div className="font-normal">Admin</div>
          <div className="font-normal">Pimpinan</div>
        </div>

        {/* Date Row */}
        <div className="grid grid-cols-4 divide-x-[1.5px] divide-black border-t-[1.5px] border-black text-[10.5px] px-1 py-0.5 bg-slate-50 text-center">
          <div>Date: {signatures?.diajukan?.date || formatDate(tanggalPengajuan, 'short') || '-'}</div>
          <div>Date: {signatures?.diketahui?.date || formatDate(tanggalPengajuan, 'short') || '-'}</div>
          <div>Date: {signatures?.direview?.date || formatDate(tanggalPengajuan, 'short') || '-'}</div>
          <div>Date: {signatures?.disetujui?.date || formatDate(tanggalPengajuan, 'short') || '-'}</div>
        </div>
      </div>
    </div>
  );
};
