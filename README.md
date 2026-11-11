# SamaTech Official Website

Modul jasa custom tersedia di `/#/jasa-custom` dengan empat halaman detail dan konfigurasi terpusat `src/data/services.js`. CTA konsultasi memakai nomor admin yang sudah dikonfigurasi; nomor kosong menampilkan tombol nonaktif. Lihat [panduan modul jasa](docs/CUSTOM-SERVICES.md).

Tampilan terbaru memakai dark app store shell dengan sidebar desktop, bottom navigation mobile, pencarian katalog lokal, dan detail aplikasi responsif. Tipografi aktif: Manrope untuk heading/nama aplikasi dan Inter untuk body/UI, keduanya WOFF2 self-hosted. Lihat [laporan tipografi terbaru](docs/PREMIUM-TYPOGRAPHY.md) dan [laporan redesign Windows Store](docs/WINDOWS-STORE-REDESIGN.md). Dokumen fase sebelumnya merupakan catatan historis.

Website informasi resmi SamaTech, fase pertama. React + Vite, tanpa backend, database, formulir registrasi, integrasi Google Sheets/Apps Script, atau pembayaran online. Tidak ada deployment atau perubahan DNS yang dilakukan dalam fase ini.

## Menjalankan lokal

Gunakan Node.js 24 LTS (minimum 22.12) dan npm. Di PowerShell gunakan `npm.cmd` jika kebijakan eksekusi memblokir `npm.ps1`.

```powershell
cd D:\xampp\htdocs\Project\samatech-web
npm.cmd ci
npm.cmd run dev
```

Buka URL Local yang dicetak Vite (biasanya `http://localhost:5173`). XAMPP tidak perlu dijalankan untuk development React. Jangan membuka `index.html` langsung sebagai file.

```powershell
npm.cmd run check
npm.cmd run audit:render
npm.cmd run test:detail
npm.cmd run test:store
npm.cmd run build
npm.cmd run preview
```

Build ada di `dist/`. Preview biasanya `http://localhost:4173`.

## Struktur

```text
samatech-web/
├── .github/workflows/deploy.yml
├── public/
│   ├── CNAME
│   ├── favicon.svg
│   ├── og-image.svg / og-image.png
│   ├── robots.txt
│   └── images/{stpos,stfnb,samatech}/
├── src/
│   ├── components/{Layout,UI}.jsx
│   ├── config/site.js
│   ├── data/{products,faqs}.js
│   ├── pages/{Home,Products,ProductDetail,Activation,FAQ,Contact,NotFound}.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── tests/config.test.js
├── docs/DEPLOYMENT.md
├── index.html
├── vite.config.js
├── package.json
└── package-lock.json
```

## Halaman dan routing

HashRouter dipakai agar refresh dan tautan detail bekerja di GitHub Pages tanpa server fallback:

- `/#/` — Beranda
- `/#/produk` — Katalog
- `/#/produk/stpos` dan `/#/produk/stfnb` — Detail produk
- `/#/aktivasi` — Cara Aktivasi
- `/#/faq` — FAQ dengan accordion native yang dapat diakses keyboard
- `/#/kontak` — Kontak
- URL lain — halaman 404

## Konfigurasi konten

Edit `src/data/products.js` untuk menambah aplikasi. Kartu katalog dan detail dibentuk dari data; tidak perlu mengubah komponen UI. `id` harus unik dan aman untuk URL.

- `downloadUrl`: setiap produk memiliki URL mandiri untuk aset `.apk` langsung di GitHub Releases publik, misalnya pola `/OWNER/REPOSITORY/releases/download/TAG/FILE.apk`. Isi hanya dengan URL rilis resmi produk itu. URL kosong, halaman tag (bukan aset APK), atau URL tidak valid menghasilkan tombol nonaktif **Segera Tersedia**. Jangan menyalin tautan APK produk lain atau mengisi URL contoh.
- `price`, `paymentType`, `licenseScope`: harga stPOS dan stFNB saat ini Rp300.000, sekali bayar, untuk satu perangkat Android per pembelian. Jangan menambahkan biaya langganan bulanan/tahunan tanpa konfirmasi resmi.
- `features`: hanya fitur yang sudah dikonfirmasi. Operasional offline setelah aktivasi dijelaskan sesuai informasi masing-masing produk.
- `requirements`: lengkapi minimum Android dan kebutuhan perangkat setelah diverifikasi.
- `screenshot` dan `screenshotAlt`: ganti placeholder dengan aset resmi, idealnya WebP. Pertahankan teks alternatif yang sesuai. Gambar memiliki lazy loading dan ukuran intrinsik. Set `screenshotIsPlaceholder: false` setelah memakai screenshot resmi agar label placeholder di detail tidak muncul.

Kontak resmi telepon, WhatsApp, email, dan lokasi dikonfigurasi di `src/config/site.js` dan digunakan bersama pada halaman Kontak, footer, tombol WhatsApp, serta bantuan produk/jasa.

## Desain dan aksesibilitas

Palet dark `#181818`, surface `#242424`, elevated `#2D2D2D`, border `#3A3A3A`, biru `#0078D4`, teks `#F5F5F5` dan sekunder `#AFAFAF`. Font Manrope untuk heading/nama aplikasi dan Inter untuk body/UI, WOFF2 self-hosted dengan fallback system sans-serif. Shell responsif dengan sidebar desktop, header/search, bottom navigation mobile, safe-area, skip link, focus keyboard, reduced motion, dan galeri screenshot aplikasi asli. Detail mobile memiliki bar download di atas bottom navigation. Tailwind CSS v4 melalui plugin Vite; CSS global di `src/styles.css` dan detail di `src/pages/product-detail.css`. Ikon Lucide React, animasi ringan Motion.

## SEO

Judul dan deskripsi awal, canonical domain utama, bahasa Indonesia, Open Graph PNG 1200×630, favicon, robots, serta metadata dinamis judul/deskripsi. HashRouter memiliki keterbatasan indeks per halaman dan crawler sosial umumnya membaca metadata `index.html`, sehingga preview berbagi memakai identitas website utama. Gambar Open Graph berbasis tipografi disiapkan bersama sumber visual SVG; dapat diganti aset brand resmi sebelum peluncuran. `public/sitemap.xml` hanya memuat URL canonical `https://samatech.sbs/`, bukan URL hash karena fragment bukan dokumen terpisah. Referensinya tercantum di robots.txt.

Audit render memeriksa tujuh halaman, dua rute tidak dikenal, tautan internal, aset/alt gambar, menu tersembunyi, dan penambahan produk sementara hanya melalui data. Ini bukan uji interaksi browser. Script lint belum tersedia; tidak ditambahkan dependensi lint baru pada tahap audit ini. Hasil audit tahap kedua ada di [docs/AUDIT-STAGE-2.md](docs/AUDIT-STAGE-2.md).

## Data yang perlu dilengkapi

URL aset APK resmi GitHub Releases untuk tiap produk serta metadata versi, minimum Android, ukuran APK dan tanggal pembaruan yang dikonfirmasi. Harga dan kontak resmi telah dikonfigurasi. Kode sumber Android harus tetap di repository private yang terpisah dari repository distribusi publik berisi APK. Tinjau screenshot aplikasi dan pastikan nama/data usaha, pemilik, serta transaksi di dalamnya sintetis atau telah diizinkan untuk publikasi. Jangan menaruh rahasia/API key di kode atau variabel frontend.

## Deployment

Lihat [panduan deployment dan DNS](docs/DEPLOYMENT.md). Push/PR ke `main` hanya menjalankan validasi. Deployment memerlukan pemicu manual **Run workflow** pada `main` dengan input **publish=true**, setelah publikasi disetujui. Default input adalah false. Fase ini hanya menyiapkan berkas lokal. Lihat [laporan Tahap 5A](docs/PUBLICATION-READINESS-5A.md).
