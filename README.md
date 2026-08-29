# Generator Dokumen PDF Template - PT. Infiniti Matrix Teknology

Aplikasi web interaktif modern untuk mengisi form data dan menghasilkan dokumen PDF profesional sesuai format resmi **PT. Infiniti Matrix Teknology**. Dibangun dengan React, Vite, dan TailwindCSS untuk performa optimal dan pengalaman pengguna yang intuitif.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.11-ffdd00.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.15-38bdf8.svg)

## 📑 Daftar Isi

- [Dokumen yang Didukung](#-dokumen-yang-didukung)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Instalasi](#-instalasi)
- [Cara Menjalankan](#-cara-menjalankan-aplikasi)
- [Struktur Folder](#-struktur-folder)
- [Konfigurasi](#-konfigurasi)
- [Build & Deployment](#-build--deployment)
- [Lisensi](#-lisensi)

---

## 📑 Dokumen yang Didukung

### 1. **Internal Office Memo (IOM)** - Halaman 1
Dokumen pengajuan resmi internal perusahaan dengan fitur:
- ✅ Pengisian nomor IOM otomatis / manual
- ✅ Poin pertimbangan & data pendukung dinamis (multi-entry)
- ✅ Rincian biaya detail dengan catatan rekening transfer
- ✅ Kotak otorisasi lengkap (Diajukan, Diketahui/RPM, Direview/Admin, Disetujui/Pimpinan)

### 2. **Settlement (Pertanggungjawaban Biaya / Cash Advance)** - Halaman 2
Formulir pertanggungjawaban keuangan dengan kemampuan:
- ✅ Toggle tipe pengajuan (*Business / Non-Business*)
- ✅ Tabel ringkasan saldo, uang muka (*Cash Advance*), dan perhitungan selisih otomatis
- ✅ Tambah & hapus baris rincian pengeluaran secara fleksibel
- ✅ Tanda tangan digital (Prepared by, Checked by RPM, Checked by Septya, Approved by Pimpinan)

### 3. **Lampiran Bukti Transaksi (Nota / Struk / Kwitansi)** - Halaman 3
Halaman lampiran visual dengan spesifikasi:
- ✅ 4 slot lampiran foto bukti transaksi dalam grid 2x2
- ✅ Upload gambar langsung dari perangkat dengan auto-fit
- ✅ Input keterangan / deskripsi di setiap bukti transaksi
- ✅ Optimasi tampilan untuk cetak dan export PDF

---

## ✨ Fitur Utama

### 🖥️ User Experience
- **⚡ Real-time Live Preview**: Dokumen tampil berdampingan dengan form input dan ter-update secara langsung tanpa refresh
- **📱 Responsive Design**: Tampilan optimal di desktop, tablet, dan mobile
- **🎨 UI Modern**: Interface bersih dengan TailwindCSS dan komponen Lucide React

### ✍️ Tanda Tangan Digital Multi-Mode
- **Template Signature**: Tanda tangan resmi template (Septya & Pimpinan) bawaan siap pakai (1 klik)
- **Draw Signature**: Menggambar tanda tangan langsung menggunakan kursor / touchscreen dengan canvas interaktif
- **Upload Signature**: Upload file tanda tangan (PNG/JPG transparan) dari perangkat

### 📥 Export & Printing
- **Download PDF**: Tombol **Download PDF** untuk mengunduh file PDF beresolusi tinggi langsung ke perangkat
- **Print Direct**: Tombol **Cetak / Print** untuk mencetak langsung ke printer fisik atau simpan PDF vektor via browser print dialog
- **Flexible Export**: Opsi download per halaman atau gabungan semua 3 halaman sekaligus
- **High Quality**: PDF dihasilkan dengan resolusi optimal untuk keperluan cetak dan arsip digital

### 💾 Data Management
- **Auto-save**: Draft otomatis tersimpan ke LocalStorage browser
- **Export JSON**: Simpan template data untuk arsip atau berbagi konfigurasi
- **Import JSON**: Muat kembali data dari file JSON yang pernah diekspor
- **Clear Data**: Reset form dengan satu klik untuk pengisian baru

---

## 🛠 Teknologi yang Digunakan

### Frontend Framework
- **React 18.3.1** - Library UI declarative
- **Vite 5.4.11** - Build tool dan development server ultra-cepat

### Styling & UI
- **TailwindCSS 3.4.15** - Utility-first CSS framework
- **PostCSS** - Tool transformasi CSS
- **Autoprefixer** - Parser PostCSS untuk manage vendor prefixes
- **Lucide React 0.46.0** - Icon library modern dan ringan
- **clsx & tailwind-merge** - Utility untuk conditional className

### PDF Generation
- **html2pdf.js 0.10.2** - Library konversi HTML ke PDF berkualitas tinggi

### Development Tools
- **@vitejs/plugin-react** - Plugin React untuk Vite
- **TypeScript Types** - Type definitions untuk React dan React DOM

---

## 📦 Instalasi

### Prasyarat
Pastikan sistem Anda telah terinstall:
- **Node.js** (versi 18.x atau lebih baru)
- **npm** atau **yarn** (package manager)

### Langkah Instalasi

```bash
# Clone repository ini
git clone <repository-url>

# Masuk ke direktori project
cd imt-document-generator

# Install semua dependencies
npm install
```

atau dengan yarn:
```bash
yarn install
```

---

## 🚀 Cara Menjalankan Aplikasi

### Development Mode

Jalankan development server dengan hot-reload:

```bash
npm run dev
```

Aplikasi akan berjalan di:
```
http://localhost:3000
```
*(Port dapat berubah sesuai ketersediaan, lihat output terminal)*

### Production Build

Buat build produksi statis yang teroptimasi:

```bash
npm run build
```

Hasil build akan tersimpan di folder `dist/` dengan struktur:
```
dist/
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
└── index.html
```

### Preview Build

Preview hasil build produksi secara lokal:

```bash
npm run preview
```

---

## 📁 Struktur Folder

```
imt-document-generator/
├── .gitignore              # Git ignore configuration
├── index.html              # HTML entry point
├── package.json            # Project dependencies & scripts
├── package-lock.json       # Dependency lock file
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # TailwindCSS customization
├── vite.config.js          # Vite build configuration
├── README.md               # Documentation (file ini)
└── src/                    # Source code
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main application component
    ├── index.css           # Global styles
    ├── components/         # Reusable UI components
    │   └── ...             # Component files
    └── utils/              # Helper functions & utilities
        └── ...             # Utility modules
```

---

## ⚙️ Konfigurasi

### TailwindCSS Configuration
File `tailwind.config.js` berisi kustomisasi tema, colors, fonts, dan breakpoints sesuai branding PT. Infiniti Matrix Teknology.

### PostCSS Configuration
File `postcss.config.js` mengkonfigurasi plugin TailwindCSS dan Autoprefixer untuk proses styling.

### Vite Configuration
File `vite.config.js` mengatur:
- Development server settings
- Build optimization
- Plugin configuration
- Alias paths (jika ada)

---

## 🏗 Build & Deployment

### Build untuk Production

```bash
# Clean build
npm run build

# Verify build output
ls -la dist/
```

### Deployment Options

#### Static Hosting
Upload isi folder `dist/` ke layanan static hosting:
- **Netlify**: Drag & drop folder `dist/`
- **Vercel**: Connect repository dan deploy otomatis
- **GitHub Pages**: Push ke branch `gh-pages`
- **AWS S3 + CloudFront**: Upload ke S3 bucket dengan CloudFront CDN

#### Self-Hosted Server
Copy isi folder `dist/` ke web server (Nginx, Apache, dll):

```bash
# Contoh deploy ke Nginx
sudo cp -r dist/* /var/www/html/
```

### Environment Variables (Optional)
Jika diperlukan konfigurasi environment-specific, buat file `.env`:

```env
VITE_API_URL=https://api.example.com
VITE_APP_VERSION=1.0.0
```

---

## 🤝 Kontribusi

Untuk berkontribusi pada project ini:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

---

## 📄 Lisensi

Project ini dikembangkan khusus untuk **PT. Infiniti Matrix Teknology**.

© 2024 PT. Infiniti Matrix Teknology. All rights reserved.

---

## 📞 Kontak & Support

Untuk pertanyaan, dukungan teknis, atau permintaan fitur, silakan hubungi tim pengembangan PT. Infiniti Matrix Teknology.

---

**Dibuat dengan ❤️ oleh Tim Developer PT. Infiniti Matrix Teknology**
