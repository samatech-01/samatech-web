# Aplikasi Siap Pakai — katalog sesuai referensi

9 November 2026. Referensi utama: gambar pemilik `web app siap.jpg`, desktop dan mobile. Komposisi disesuaikan tanpa menyalin merek, rating, harga, aplikasi fiktif, menu akun atau keranjang dari gambar.

## Implementasi

- Judul Aplikasi Siap Pakai, breadcrumb, filter horizontal di bawah judul, kartu dark #292929 dengan border #424242 dan radius 15–17px.
- Grid 3 kolom mulai 1200px viewport, 2 kolom pada 768–1199px, 1 kolom di bawah 768px. Hanya dua produk yang tersedia; kolom ketiga sengaja tidak diisi produk fiktif.
- Desktop: ikon 78px, nama, kategori, platform aktual, ringkasan lisensi dan harga hanya jika terisi, dua tombol di dasar kartu. Grid stretch dan flex memastikan tinggi/posisi tombol sejajar.
- Mobile: ikon 63px di kiri, nama/kategori/platform kanan, informasi lisensi ringkas, CTA di bawah; radius 15px dan tinggi mengikuti konten.
- Kartu katalog merupakan komponen lokal halaman Products; ProductCard Beranda tidak diubah.
- Tombol **Download APK** hanya berupa link jika `downloadUrl` produk berisi aset APK HTTPS langsung dari GitHub Releases. URL tag/rilis yang tidak menunjuk file `.apk` dan nilai kosong tetap **Segera Tersedia**/disabled. Link tab baru memakai `noopener noreferrer`.
- Setiap produk memiliki `downloadUrl` sendiri di `src/data/products.js`; menambah produk hanya perlu menambah konfigurasi data. Kode Android tetap berada di repository private terpisah dari repository distribusi publik yang menyediakan aset APK.
- Tidak ada rating, review, jumlah download, angka harga, atau kategori platform yang dibuat-buat.

## Pencarian dan filter

Search header berubah menjadi real-time **hanya saat berada di route `/produk`**. Halaman lain mempertahankan perilaku submit sebelumnya. Pencarian mencocokkan nama dan deskripsi produk, case-insensitive, mendukung beberapa kata.

Kategori diambil dari products.js, deduplicated, tanpa kategori kosong. Pilihan kategori disimpan pada query `kategori`; kata pencarian pada `q`. Route tetap `/produk` dalam HashRouter. Perubahan/clear pencarian mempertahankan kategori valid. Kategori tidak dikenal ditampilkan sebagai Semua. Daftar kategori berasal dari keseluruhan katalog agar pilihan tetap tersedia ketika hasil pencarian kosong.

Empty state menyediakan Hapus pencarian (mempertahankan kategori) dan Lihat semua aplikasi (reset query/kategori). Semua filter adalah button native berlabel aria-pressed, focus ring terlihat di dalam viewport filter, dan overflow hanya pada bar filter. Fade daftar dan hover ringan menghormati reduced-motion.

## Validasi

- `npm run build`: berhasil tanpa warning. JS 438.58 kB / 138.70 kB gzip; CSS 57.17 kB / 12.04 kB gzip.
- `npm run check`: 3 pengujian konfigurasi lulus.
- `npm run audit:render`: 12 halaman + 3 fallback lulus. Tautan rilis valid diperiksa menggunakan produk fixture sementara dalam memori; tidak dimasukkan ke konfigurasi produk maupun katalog publik.
- `npm run test:store`: dua skenario media desktop/mobile lulus. Tambahan: kategori aktual/tidak duplikat, pencarian nama/deskripsi sebelum submit, kombinasi kategori, empty state, clear yang menjaga kategori, reset semua, APK kosong, dan navigasi detail. Pengujian jasa/navigasi lama tetap lulus.
- `npm run test:detail`: carousel, lightbox, fokus, dan reduced-motion detail lama tetap lulus.
- Preview produksi merespons HTTP 200.

CSS disiapkan untuk 1440px (3 kolom), 1024px dan 768px (2 kolom), 390px dan 360px (1 kolom). Minmax(0,1fr), min-width:0, pembungkusan teks, tombol yang dapat membungkus label, serta scroll filter lokal mencegah pembesaran intrinsik kolom. Padding workspace/bottom navigation lama dipertahankan.

**Belum terverifikasi secara visual pada kelima viewport tersebut:** ukuran nyata, horizontal overflow, clipping teks, dan kecocokan piksel terhadap referensi. jsdom memvalidasi logika/markup, bukan layout engine. Tidak ada klaim hasil screenshot/Lighthouse tanpa browser yang dapat diakses.

## File berubah

- `src/pages/Products.jsx`: katalog khusus sesuai referensi.
- `src/pages/products.css`: baru, styling katalog terisolasi.
- `src/data/catalogSearch.js`: kategori dan pencarian nama/deskripsi.
- `src/components/Layout.jsx`: handler pencarian kondisional untuk katalog; shell/sidebar/bottom navigation tetap sama.
- `scripts/test-store-ui.mjs`, `scripts/audit-render.mjs`: pemeriksaan filter/search/download.
- Laporan ini.

Tidak ada perubahan Beranda, Detail Aplikasi, Jasa Custom, katalog produk/URL APK, font global, routing definitions, aktivasi, Vite/Pages, atau DNS. Tidak ada dependensi baru, push maupun deployment.
