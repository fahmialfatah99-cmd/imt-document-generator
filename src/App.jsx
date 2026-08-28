import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { IOMForm } from './components/IOMForm';
import { SettlementForm } from './components/SettlementForm';
import { EvidenceForm } from './components/EvidenceForm';
import { PageIOM } from './components/DocumentPreview/PageIOM';
import { PageSettlement } from './components/DocumentPreview/PageSettlement';
import { PageEvidence } from './components/DocumentPreview/PageEvidence';
import { exportToPdf } from './utils/exportPdf';
import { DEFAULT_SIGNATURES } from './utils/signatures';
import { parseNumber } from './utils/formatters';

const STORAGE_KEY = 'IMT_DOC_GENERATOR_DATA_V1';

const sampleReceipt1 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="400" viewBox="0 0 320 400" fill="%23fff"><rect width="320" height="400" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="2"/><text x="160" y="38" text-anchor="middle" font-family="monospace" font-size="15" font-weight="bold" fill="%231e293b">TOKO ELEKTRONIK JAYA</text><text x="160" y="58" text-anchor="middle" font-family="monospace" font-size="10" fill="%2364748b">Mall Mangga Dua Lt. 3 No. 45</text><line x1="20" y1="75" x2="300" y2="75" stroke="%23cbd5e1" stroke-dasharray="4"/><text x="25" y="105" font-family="monospace" font-size="11" fill="%23334155">10x Kabel Patch Cord Cat6</text><text x="295" y="105" text-anchor="end" font-family="monospace" font-size="11" fill="%23334155">350.000</text><text x="25" y="130" font-family="monospace" font-size="11" fill="%23334155">1x Crimping Tool Pro</text><text x="295" y="130" text-anchor="end" font-family="monospace" font-size="11" fill="%23334155">120.000</text><line x1="20" y1="160" x2="300" y2="160" stroke="%23cbd5e1" stroke-dasharray="4"/><text x="25" y="190" font-family="monospace" font-size="12" font-weight="bold" fill="%230f172a">TOTAL TRANSAKSI</text><text x="295" y="190" text-anchor="end" font-family="monospace" font-size="12" font-weight="bold" fill="%230f172a">Rp 470.000</text><text x="160" y="270" text-anchor="middle" font-family="monospace" font-size="9" fill="%2394a3b8">NOTA RESMI PEMBELIAN HARDWARE</text><text x="160" y="350" text-anchor="middle" font-family="monospace" font-size="9" fill="%2394a3b8">PT. INFINITI MATRIX TEKNOLOGY</text></svg>`;

const sampleReceipt2 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="400" viewBox="0 0 320 400" fill="%23fff"><rect width="320" height="400" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="2"/><text x="160" y="38" text-anchor="middle" font-family="monospace" font-size="15" font-weight="bold" fill="%231e293b">SPBU PERTAMINA 31-102</text><text x="160" y="58" text-anchor="middle" font-family="monospace" font-size="10" fill="%2364748b">Struk Pembelian Bahan Bakar</text><line x1="20" y1="75" x2="300" y2="75" stroke="%23cbd5e1" stroke-dasharray="4"/><text x="25" y="105" font-family="monospace" font-size="11" fill="%23334155">Produk : Pertamax Turbo</text><text x="25" y="130" font-family="monospace" font-size="11" fill="%23334155">Volume : 20.00 Liter</text><text x="25" y="155" font-family="monospace" font-size="11" fill="%23334155">Harga/L : Rp 14.000</text><line x1="20" y1="180" x2="300" y2="180" stroke="%23cbd5e1" stroke-dasharray="4"/><text x="25" y="210" font-family="monospace" font-size="12" font-weight="bold" fill="%230f172a">TOTAL BAYAR (CASH)</text><text x="295" y="210" text-anchor="end" font-family="monospace" font-size="12" font-weight="bold" fill="%230f172a">Rp 280.000</text><text x="160" y="280" text-anchor="middle" font-family="monospace" font-size="9" fill="%2394a3b8">Terima kasih dan selamat jalan</text></svg>`;

const INITIAL_DATA = {
  iom: {
    iomNo: '018/IOM/IMT/VIII/2026',
    diajukanOleh: 'Septya Wulandari',
    divisi: 'IT & Operational',
    costCentre: 'Project Enterprise IMT',
    perihal: 'Pengajuan Biaya Operasional Maintenance Jaringan & Server',
    perkiraanBiaya: 'Rp 1.850.000,-',
    tanggalPengajuan: '2026-08-28',
    pertimbangan: [
      'Kebutuhan pemeliharaan rutin server dan infrastruktur jaringan kantor cabang.',
      'Penggantian kabel patch cord dan perapihan rak server utama.',
      'Pembelian lisensi security domain operasional sistem.',
      'Biaya konsumsi dan transportasi teknisi lapangan selama pengerjaan maintenance.'
    ],
    dataPendukung: [
      'Penawaran harga perangkat dari vendor hardware',
      'Laporan log error performa server pekan lalu'
    ],
    biayaYangDiajukan: '1. Pemeliharaan Jaringan & Kabel : Rp 470.000\n2. Lisensi & Sertifikat Keamanan : Rp 650.000\n3. Transportasi & BBM Lapangan : Rp 280.000\n4. Konsumsi Teknisi Lapangan : Rp 150.000\n5. Jasa Konfigurasi & Setup : Rp 300.000\n\nTotal Biaya : Rp 1.850.000',
    catatanRekening: 'BCA 1234567890 a.n. Septya Wulandari',
    signatures: {
      diajukan: { name: 'Septya W.', sign: DEFAULT_SIGNATURES.user, date: '28/08/2026' },
      diketahui: { role: 'RPM', sign: null, date: '28/08/2026' },
      direview: { role: 'Admin', sign: DEFAULT_SIGNATURES.septya, date: '28/08/2026' },
      disetujui: { role: 'Pimpinan', sign: DEFAULT_SIGNATURES.pimpinan, date: '28/08/2026' }
    }
  },
  settlement: {
    isBusiness: true,
    isNonBusiness: false,
    name: 'Septya Wulandari',
    tanggal: '2026-08-28',
    deptDiv: 'IT / Operational',
    expenseType: 'Operational Maintenance',
    cashAdvanceTaken: 2000000,
    appliedRate: 1,
    otherCurrency: {
      name: '',
      cashAdvance: 0,
      totalExpenses: 0,
      appliedRate: 0
    },
    items: [
      { date: '2026-08-25', description: 'Pembelian Kabel Patch Cord Cat6 10pcs & Crimping Tool', amount: 470000 },
      { date: '2026-08-26', description: 'Biaya Lisensi Security Domain IMT', amount: 650000 },
      { date: '2026-08-26', description: 'Konsumsi Tim Teknisi Lapangan (Makan Siang & Minum)', amount: 150000 },
      { date: '2026-08-27', description: 'BBM Pertamax Kendaraan Operasional Jakarta-Bekasi', amount: 280000 },
      { date: '2026-08-27', description: 'Jasa Konfigurasi Firewall & Router', amount: 300000 }
    ],
    signatures: {
      preparedBy: { name: '( user)', sign: DEFAULT_SIGNATURES.user },
      checkedByRPM: { name: 'RPM', sign: null },
      checkedBySeptya: { name: 'Septya', sign: DEFAULT_SIGNATURES.septya },
      approvedBy: { name: 'Pimpinan', sign: DEFAULT_SIGNATURES.pimpinan }
    }
  },
  evidence: {
    noBuktiTransaksi: 'BKT-2026/08/018',
    nama: 'Septya Wulandari',
    evidences: [
      { image: sampleReceipt1, description: 'Nota Pembelian Hardware & Kabel Patch Cord' },
      { image: sampleReceipt2, description: 'Struk Pengisian BBM Pertamax Kendaraan Operasional' },
      { image: null, description: '' },
      { image: null, description: '' }
    ]
  }
};

export default function App() {
  const [docData, setDocData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_DATA;
  });

  const [activeDoc, setActiveDoc] = useState('all'); // 'all', 'iom', 'settlement', 'evidence'
  const [viewMode, setViewMode] = useState('split'); // 'split', 'form', 'preview'
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(docData));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [docData]);

  // Synchronize common fields across Page 1 (IOM), Page 2 (Settlement), and Page 3 (Evidence)
  const updateIOMData = (iom) => {
    setDocData((prev) => {
      const prevIOM = prev.iom || {};
      const newSettlement = { ...prev.settlement };
      const newEvidence = { ...prev.evidence };

      // 1. Sync Nama: Page 1 (diajukanOleh) -> Page 2 (name) & Page 3 (nama)
      if (iom.diajukanOleh !== undefined) {
        newSettlement.name = iom.diajukanOleh;
        newEvidence.nama = iom.diajukanOleh;
        newSettlement.signatures = {
          ...(newSettlement.signatures || {}),
          preparedBy: {
            ...(newSettlement.signatures?.preparedBy || {}),
            name: iom.signatures?.diajukan?.name || iom.diajukanOleh ? `( ${iom.signatures?.diajukan?.name || iom.diajukanOleh} )` : '( user)'
          }
        };
      }

      // 2. Sync Dept / Div: Page 1 (divisi) -> Page 2 (deptDiv)
      if (iom.divisi !== undefined) {
        newSettlement.deptDiv = iom.divisi;
      }

      // 3. Sync Expense Type & No Bukti Transaksi: Page 1 (iomNo) -> Page 2 (expenseType) & Page 3 (noBuktiTransaksi)
      if (iom.iomNo !== undefined) {
        newSettlement.expenseType = iom.iomNo;
        newEvidence.noBuktiTransaksi = iom.iomNo;
      }

      // 4. Sync Currency / Cash Advance: Page 1 (perkiraanBiaya) -> Page 2 (cashAdvanceTaken)
      if (iom.perkiraanBiaya !== undefined && iom.perkiraanBiaya !== prevIOM.perkiraanBiaya) {
        const parsedCost = parseNumber(iom.perkiraanBiaya);
        if (parsedCost > 0 || iom.perkiraanBiaya === '') {
          newSettlement.cashAdvanceTaken = parsedCost || '';
        }
      }

      // 5. Sync Signatures if present
      if (iom.signatures?.diajukan?.sign) {
        newSettlement.signatures = {
          ...(newSettlement.signatures || {}),
          preparedBy: {
            ...(newSettlement.signatures?.preparedBy || {}),
            sign: iom.signatures.diajukan.sign
          }
        };
      }
      if (iom.signatures?.diketahui?.sign) {
        newSettlement.signatures = {
          ...(newSettlement.signatures || {}),
          checkedByRPM: {
            ...(newSettlement.signatures?.checkedByRPM || {}),
            sign: iom.signatures.diketahui.sign
          }
        };
      }
      if (iom.signatures?.direview?.sign) {
        newSettlement.signatures = {
          ...(newSettlement.signatures || {}),
          checkedBySeptya: {
            ...(newSettlement.signatures?.checkedBySeptya || {}),
            sign: iom.signatures.direview.sign
          }
        };
      }
      if (iom.signatures?.disetujui?.sign) {
        newSettlement.signatures = {
          ...(newSettlement.signatures || {}),
          approvedBy: {
            ...(newSettlement.signatures?.approvedBy || {}),
            sign: iom.signatures.disetujui.sign
          }
        };
      }

      return {
        ...prev,
        iom,
        settlement: newSettlement,
        evidence: newEvidence
      };
    });
  };

  const updateSettlementData = (settlement) => {
    setDocData((prev) => ({ ...prev, settlement }));
  };

  const updateEvidenceData = (evidence) => {
    setDocData((prev) => ({ ...prev, evidence }));
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const targetElement = document.getElementById('printable-document-container');
      if (!targetElement) return;

      let filename = 'Dokumen_PT_Infiniti_Matrix_Teknology.pdf';
      if (activeDoc === 'iom') filename = `IOM_${docData.iom.iomNo?.replace(/[/\\?%*:|"<>]/g, '_') || 'dokumen'}.pdf`;
      else if (activeDoc === 'settlement') filename = `Settlement_${docData.settlement.name || 'dokumen'}.pdf`;
      else if (activeDoc === 'evidence') filename = `Bukti_Transaksi_${docData.evidence.noBuktiTransaksi || 'dokumen'}.pdf`;

      await exportToPdf(targetElement, filename);
    } catch (err) {
      alert('Gagal mendownload PDF: ' + (err.message || 'Terjadi kesalahan'));
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLoadSample = () => {
    if (confirm('Muat data contoh? Data yang belum disimpan akan digantikan dengan data contoh.')) {
      setDocData(INITIAL_DATA);
    }
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mengosongkan semua data form?')) {
      setDocData({
        iom: {
          iomNo: '',
          diajukanOleh: '',
          divisi: '',
          costCentre: '',
          perihal: '',
          perkiraanBiaya: '',
          tanggalPengajuan: '',
          pertimbangan: ['', '', '', '', ''],
          dataPendukung: [''],
          biayaYangDiajukan: '',
          catatanRekening: '',
          signatures: {
            diajukan: { name: '', sign: null, date: '' },
            diketahui: { role: 'RPM', sign: null, date: '' },
            direview: { role: 'Admin', sign: null, date: '' },
            disetujui: { role: 'Pimpinan', sign: null, date: '' }
          }
        },
        settlement: {
          isBusiness: true,
          isNonBusiness: false,
          name: '',
          tanggal: '',
          deptDiv: '',
          expenseType: '',
          cashAdvanceTaken: '',
          appliedRate: 1,
          items: [],
          signatures: {
            preparedBy: { name: '( user)', sign: null },
            checkedByRPM: { name: 'RPM', sign: null },
            checkedBySeptya: { name: 'Septya', sign: null },
            approvedBy: { name: 'Pimpinan', sign: null }
          }
        },
        evidence: {
          noBuktiTransaksi: '',
          nama: '',
          evidences: [
            { image: null, description: '' },
            { image: null, description: '' },
            { image: null, description: '' },
            { image: null, description: '' }
          ]
        }
      });
    }
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(docData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IMT_Draft_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          setDocData(parsed);
          alert('Draft berhasil dimuat!');
        } catch {
          alert('Format file JSON tidak valid!');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Top Header & Action Controls */}
      <Header
        activeDoc={activeDoc}
        setActiveDoc={setActiveDoc}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onDownloadPdf={handleDownloadPdf}
        onPrint={handlePrint}
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        isGeneratingPdf={isGeneratingPdf}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Editor (Visible when in Split or Form mode) */}
          {(viewMode === 'split' || viewMode === 'form') && (
            <div className={`no-print ${viewMode === 'form' ? 'lg:col-span-12 max-w-4xl mx-auto w-full' : 'lg:col-span-5 xl:col-span-5'}`}>
              <div className="sticky top-32 space-y-6">
                {activeDoc === 'all' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 leading-relaxed font-medium">
                      💡 Mengisi form gabungan 3 halaman. Anda dapat berpindah tab di atas jika ingin fokus mengisi satu per satu halaman.
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                        Internal Office Memo (IOM)
                      </h2>
                      <IOMForm data={docData.iom} onChange={updateIOMData} />
                    </div>

                    <div className="pt-6 border-t-2 border-slate-200">
                      <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
                        Settlement (Realisasi Biaya)
                      </h2>
                      <SettlementForm data={docData.settlement} onChange={updateSettlementData} />
                    </div>

                    <div className="pt-6 border-t-2 border-slate-200">
                      <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
                        Lampiran Bukti Transaksi
                      </h2>
                      <EvidenceForm data={docData.evidence} onChange={updateEvidenceData} />
                    </div>
                  </div>
                )}

                {activeDoc === 'iom' && (
                  <IOMForm data={docData.iom} onChange={updateIOMData} />
                )}

                {activeDoc === 'settlement' && (
                  <SettlementForm data={docData.settlement} onChange={updateSettlementData} />
                )}

                {activeDoc === 'evidence' && (
                  <EvidenceForm data={docData.evidence} onChange={updateEvidenceData} />
                )}
              </div>
            </div>
          )}

          {/* Right Column: Live Document Preview & PDF Render Container */}
          {(viewMode === 'split' || viewMode === 'preview') && (
            <div className={`${viewMode === 'preview' ? 'lg:col-span-12' : 'lg:col-span-7 xl:col-span-7'} flex flex-col items-center`}>
              <div className="w-full mb-3 flex items-center justify-between no-print px-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Live Preview Dokumen (Ukuran A4)
                </span>
                <span className="text-xs text-slate-400">
                  {activeDoc === 'all' ? '3 Halaman' : '1 Halaman'}
                </span>
              </div>

              {/* PDF Container that gets printed/exported */}
              <div
                id="printable-document-container"
                className="w-full flex flex-col items-center gap-8 py-2"
              >
                {(activeDoc === 'all' || activeDoc === 'iom') && (
                  <div className="print-page-break w-full flex justify-center">
                    <PageIOM data={docData.iom} />
                  </div>
                )}

                {(activeDoc === 'all' || activeDoc === 'settlement') && (
                  <div className="print-page-break w-full flex justify-center">
                    <PageSettlement data={docData.settlement} />
                  </div>
                )}

                {(activeDoc === 'all' || activeDoc === 'evidence') && (
                  <div className="w-full flex justify-center">
                    <PageEvidence data={docData.evidence} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
