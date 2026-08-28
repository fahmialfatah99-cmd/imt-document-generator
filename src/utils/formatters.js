// Formatting helpers

export const formatRupiah = (value, includePrefix = false) => {
  if (value === null || value === undefined || value === '') return includePrefix ? 'Rp 0' : '0';
  const num = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]+/g, '')) || 0;
  
  const formatted = new Intl.NumberFormat('id-ID').format(num);
  return includePrefix ? `Rp ${formatted}` : formatted;
};

export const parseNumber = (value) => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  const cleaned = String(value).replace(/[^0-9.-]+/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

export const formatDate = (dateString, format = 'short') => {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;

    if (format === 'short') {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }

    if (format === 'long') {
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }

    return dateString;
  } catch {
    return dateString;
  }
};
