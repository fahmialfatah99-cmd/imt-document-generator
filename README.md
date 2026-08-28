# Generator Dokumen PDF Template - PT. Infiniti Matrix Teknology

Aplikasi web interaktif untuk mengisi form data dan menghasilkan dokumen PDF siap pakai sesuai format resmi **PT. Infiniti Matrix Teknology**.

## 📑 Dokumen yang Didukung
1. **Internal Office Memo (IOM)** - Halaman 1
   - Pengisian nomor IOM otomatis / manual.
   - Poin pertimbangan & data pendukung dinamis.
   - Rincian biaya & catatan rekening transfer.
   - Kotak otorisasi (Diajukan, Diketahui/RPM, Direview/Admin, Disetujui/Pimpinan).

2. **Settlement (Pertanggungjawaban Biaya / Cash Advance)** - Halaman 2
   - Toggle tipe pengajuan (*Business / Non-Business*).
   - Tabel ringkasan saldo, uang muka (*Cash Advance*), dan perhitungan selisih otomatis.
   - Tambah & hapus baris rincian pengeluaran secara fleksibel.
   - Tanda tangan (Prepared by, Checked by RPM, Checked by Septya, Approved by Pimpinan).

3. **Lampiran Bukti Transaksi (Nota / Struk / Kwitansi)** - Halaman 3
   - 4 slot lampiran foto bukti transaksi dalam grid 2x2.
   - Upload gambar langsung dari perangkat dengan auto-fit.
   - Input keterangan / deskripsi di setiap bukti transaksi.

---

## ✨ Fitur Utama
- **⚡ Real-time Live Preview**: Dokumen tampil berdampingan dengan form input dan ter-update secara langsung.
- **✍️ Tanda Tangan Digital**:
  - Tanda tangan resmi template (Septya & Pimpinan) bawaan siap pakai (1 klik).
  - Menggambar tanda tangan langsung menggunakan kursor / touchscreen.
  - Upload file tanda tangan (PNG/JPG transparan).
- **📥 Export PDF & Print**:
  - Tombol **Download PDF** untuk mengunduh file PDF beresolusi tinggi langsung ke perangkat.
  - Tombol **Cetak / Print** untuk mencetak langsung ke printer fisik atau simpan PDF vektor via browser print dialog.
  - Opsi download per halaman atau gabungan semua 3 halaman sekaligus.
- **💾 Simpan & Muat Draft**:
  - Auto-save draft otomatis ke LocalStorage browser.
  - Fitur Export JSON & Import JSON untuk arsip atau berbagi template data.

---

## 🚀 Cara Menjalankan Aplikasi

Jalankan perintah berikut di terminal:

```bash
# 1. Jalankan development server
npm run dev
```

Buka browser Anda di alamat: `http://localhost:3000` (atau port yang tertera pada terminal).

Untuk membuat file build produksi statis:
```bash
npm run build
```
Hasil build akan berada di dalam folder `dist/`.
