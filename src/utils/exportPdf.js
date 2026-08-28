import html2pdf from 'html2pdf.js';

export const exportToPdf = async (elementOrId, filename = 'dokumen-imt.pdf') => {
  const element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId;
  if (!element) {
    throw new Error('Element target PDF tidak ditemukan');
  }

  const opt = {
    margin: 0,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2.5,
      useCORS: true,
      logging: false,
      letterRendering: true,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { mode: ['css', 'legacy'], after: '.print-page-break' }
  };

  try {
    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (err) {
    console.error('Failed to generate PDF with html2pdf:', err);
    // Fallback: trigger browser print dialog if html2pdf fails
    window.print();
    return false;
  }
};
