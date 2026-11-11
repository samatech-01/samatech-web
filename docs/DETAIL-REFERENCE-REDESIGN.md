# Detail aplikasi — implementasi berdasarkan referensi pemilik

9 November 2026. Referensi utama: gambar `detail web app.jpg` yang dilampirkan pemilik, berisi komposisi desktop dan mobile. Gambar dipakai untuk proporsi dan susunan visual, bukan sebagai sumber data/aset aplikasi.

## Komposisi yang diterapkan

- Background detail #191919, kartu #292929, border #424242, aksen #0078D4, heading #F5F5F5 dan teks sekunder #B5B5B5. Manrope/Inter tetap digunakan. Tidak ada gradient, partikel, floating animation atau dekorasi baru.
- Container maksimum 1200px di dalam shell yang sudah disetujui. Toolbar kembali/nama aplikasi, lalu satu kartu header horizontal dengan ikon besar, nama/developer, breadcrumb/kategori, tombol APK dan Lihat Cara Aktivasi.
- Desktop: grid sekitar 72/28; pada lebar menengah sidebar minimum 225px. Galeri berbingkai dengan navigasi samping/pagination dan kartu Tentang Aplikasi Ini di kiri. Kartu spesifikasi, fitur dan lisensi di kanan. Bantuan WhatsApp hanya dirender jika nomor valid sudah dikonfigurasi.
- Mobile: kartu ringkasan berikon di kiri, dua CTA, galeri horizontal, pill pagination, lalu empat accordion Spesifikasi Teknis/Fitur Aplikasi/Ketentuan Lisensi/Cara Aktivasi. Deskripsi tetap tersedia setelah rangkaian accordion.
- Sticky action bar menampilkan Aktivasi Berbayar dan CTA Download Gratis ketika APK tersedia. APK belum tersedia tetap Segera Tersedia. Posisi bar berada di atas bottom navigation, menghormati safe-area dan memiliki padding konten tambahan 116px.
- Screenshot menggunakan aset katalog dengan object-fit contain, tanpa crop, scroll/snap native, lightbox, Escape, panah dan pemulihan fokus. Tidak ada screenshot aplikasi lain atau gambar yang diduplikasi untuk menciptakan galeri semu. Satu placeholder berarti satu pagination item.

Nama KasirPro POS/AppNexus, rating/review, harga Rp499.000 dan fitur dari referensi tidak disalin. Nilai teknis/harga yang kosong tidak dirender. Data katalog dan alur bisnis tidak diubah; klaim offline tetap hanya sesuai informasi produk terkonfirmasi.

## Validasi

- `npm run build`: berhasil tanpa warning build.
- `npm run check`: 3 tes konfigurasi lulus.
- `npm run audit:render`: 7 halaman dan 2 fallback lulus, termasuk detail stPOS/stFNB dan produk tambahan dari data.
- `npm run test:detail`: normal/reduced-motion lulus; termasuk next/previous, pagination aktif/click, scroll sync, lightbox, keyboard panah, cancel/Escape, fokus dan scroll body.
- `npm run test:store`: kondisi media desktop/mobile lulus; termasuk kartu header/dua CTA, empat accordion dan status awal, sticky bar/Aktivasi Berbayar, WhatsApp yang tidak muncul saat kosong, share, navigasi dan alur aktivasi lama.
- Preview produksi merespons HTTP 200.
- Checksum data katalog, router, Vite, CNAME, workflow, dan halaman Cara Aktivasi tetap sama.

Ukuran 1440/1024 desktop dan 390/360 mobile telah dipertimbangkan pada aturan lebar container, grid menyusut, kolom CTA, min-width dan pembungkusan teks. **Belum ada pengukuran render visual/overflow pada empat viewport tersebut.** jsdom menguji markup/logika dengan geometri yang dimock; bukan pengganti layout engine. Native swipe dan focus trap juga memerlukan browser nyata. Kemiripan piksel tidak diklaim tanpa screenshot hasil render.

## File berubah

- `src/pages/ProductDetail.jsx`: struktur sesuai referensi.
- `src/pages/product-detail.css`: styling detail terisolasi dan responsif.
- `src/components/ScreenshotGallery.jsx`: frame, tombol samping dan pagination.
- `src/components/UI.jsx`: label DownloadButton opsional untuk sticky bar; default/hasil visual di halaman lain tetap sama.
- `scripts/test-detail-ui.mjs`, `scripts/test-store-ui.mjs`: pengujian pagination dan struktur detail baru.
- Laporan ini.

Beranda, halaman katalog, data produk/bisnis, routing, aktivasi Android, Sheets, Apps Script, GitHub Pages dan DNS tidak diubah. Tidak ada dependensi baru, push atau deploy.
