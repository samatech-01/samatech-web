# SamaTech App Marketplace — detail aplikasi

Implementasi lokal 9 November 2026. Tidak ada push, deploy, perubahan DNS, routing, workflow GitHub Pages, atau perubahan sistem aktivasi Android/Apps Script/Google Sheets.

## Pengalaman detail

Semua route `/produk/:id` menggunakan satu komponen detail dari katalog lokal. Header menampilkan breadcrumb, ikon besar, nama, developer, kategori, platform dan tagline. Desktop memakai kolom konten dengan panel download/lisensi sticky di kanan. Mobile menampilkan ikon di kiri, identitas di kanan, lalu tombol download selebar panel sebelum galeri dan section informasi.

Section: galeri, deskripsi, sasaran pengguna, fitur terkonfirmasi, informasi teknis, changelog jika tersedia, panduan download/aktivasi, dan rekomendasi dari produk selain produk aktif. Tidak ada rating, statistik download, versi, ukuran atau harga rekaan. APK gratis diunduh jika URL valid; bila belum tersedia, status **Segera Tersedia** tetap nonaktif. Lisensi berbayar dijelaskan terpisah dari pengunduhan gratis.

## Data di `src/data/products.js`

Field lama tetap kompatibel. Tambahan opsional:

- `developer`, `platform`, `licenseDescription`: teks resmi untuk identitas/lisensi.
- `version`, `minAndroid`, `fileSize`, `updatedAt`: string siap tampil sesuai informasi resmi; null/kosong tidak ditampilkan. `requirements` lama tetap menjadi catatan kebutuhan perangkat.
- `licensePrice`: string harga/ketentuan resmi, atau null. Fallback ke `price` lama agar konfigurasi yang sudah ada tetap bekerja.
- `changelog`: array string perubahan resmi; array kosong menyembunyikan section.
- `screenshots`: array objek `{ src, alt, width, height, isPlaceholder }`. Gunakan URL aset lokal, alt deskriptif, dan dimensi asli gambar; `isPlaceholder: false` untuk screenshot asli. Jika array kosong, galeri memakai field `screenshot`, `screenshotAlt`, dan `screenshotIsPlaceholder` lama. Bila tidak ada gambar, tampilkan status belum tersedia.

Untuk screenshot resmi, simpan aset di `public/images/`, isi array beserta dimensi aslinya, dan ubah `screenshotIsPlaceholder: false` setelah seluruh visual produk siap diganti. Jangan memasukkan screenshot contoh sebagai data asli. Pembaruan Tahap 4/5A: stPOS memakai 10 screenshot dan stFNB 7 screenshot. Dua screenshot Akun memakai PNG dengan email ditutup permanen; screenshot lainnya JPEG. Placeholder lama telah dikeluarkan dari public.

`activationGuide` dalam katalog merupakan ringkasan presentasi dari alur yang sudah ada. Tidak mengubah halaman Cara Aktivasi atau proses Android. Status Pending, pembayaran/instruksi admin, verifikasi admin, verifikasi aktivasi dan autentikasi tetap dinyatakan secara eksplisit.

## Galeri dan aksesibilitas

- Scroll horizontal native + scroll snap untuk swipe/trackpad; tombol sebelumnya/berikutnya hanya muncul saat ada beberapa gambar.
- Setiap thumbnail merupakan tombol yang dapat difokuskan. Klik membuka native modal `<dialog>` di portal body.
- Tombol tutup, Escape melalui event native `cancel`, tombol navigasi, dan panah kiri/kanan pada keyboard.
- Modal menyimpan scroll halaman dan mengembalikan fokus ke thumbnail setelah ditutup. Native modal dialog menyediakan focus trapping/inert background pada browser yang mendukungnya.
- Gambar memakai `object-fit: contain`, sehingga rasio gambar dipertahankan tanpa crop. Metadata ukuran dan lazy loading tetap tersedia.
- Smooth scroll hanya untuk preferensi motion normal; reduced-motion memakai perpindahan langsung. Animasi entrance memakai Reveal yang sudah ada, hover hanya untuk pointer yang mendukungnya, dan lightbox hanya fade singkat.
- Seluruh CSS baru dibatasi pada kelas detail/galeri agar halaman lain tidak berubah.

## Validasi

```powershell
npm.cmd run check
npm.cmd run audit:render
npm.cmd run test:detail
npm.cmd run build
```

- Konfigurasi: 3 pengujian lulus.
- Render/routing: 7 halaman, termasuk detail stPOS/stFNB, serta 2 fallback lulus. Produk baru dari data, breadcrumb, galeri, field teknis kosong/terisi dan changelog diperiksa.
- Interaksi DOM: carousel next/previous/end, sinkronisasi scroll, mode motion normal/reduced, pembukaan lightbox, keyboard panah, navigasi gambar, penutupan via tombol dan cancel/Escape, pemulihan fokus, pemulihan scroll body, serta galeri kosong/placeholder lulus.
- `jsdom` ditambahkan hanya sebagai devDependency untuk pengujian; tidak masuk bundle website. API dialog dan ukuran layout dimock dalam pengujian. Motion memberi pemberitahuan reduced-motion yang disengaja pada mode pengujian tersebut.
- `npm audit`: 0 kerentanan terlapor setelah penambahan tooling.
- Build produksi berhasil. JS sekitar 429.24 kB / 135.97 kB gzip; CSS sekitar 53.88 kB / 12.61 kB gzip. Dibanding tahap tipografi: tambahan sekitar 2.62 kB JS gzip dan 2.73 kB CSS gzip.
- CSS diperiksa untuk single-column mobile, flex/grid `minmax(0, 1fr)`, pembungkusan header, galeri overflow lokal, dan contain pada gambar.

Batas validasi: jsdom bukan browser visual. Native swipe, Tab/focus trapping browser, hasil render desktop/mobile, dan pengukuran overflow viewport tetap membutuhkan pemeriksaan browser. Tidak mengklaim pengukuran Lighthouse atau visual browser yang belum dilakukan.

## File yang berubah

- `src/pages/ProductDetail.jsx` (redesign seluruh detail).
- `src/pages/product-detail.css` (baru, styling responsif terisolasi).
- `src/components/ScreenshotGallery.jsx` (baru, carousel/lightbox).
- `src/data/products.js` (field opsional dan ringkasan aktivasi, URL APK/harga lama dipertahankan).
- `src/data/productPresentation.js` (baru, helper fallback presentasi).
- `scripts/audit-render.mjs` (validasi detail ditambah).
- `scripts/test-detail-ui.mjs` (baru, pengujian interaksi).
- `package.json`, `package-lock.json` (script dan devDependency pengujian).
- Laporan ini.
