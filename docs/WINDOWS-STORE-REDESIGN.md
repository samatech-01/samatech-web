# SamaTech — dark app store redesign

9 November 2026. Implementasi mengikuti spesifikasi tertulis tema Windows 11 App Store. **Tiga gambar referensi tidak tersedia di percakapan/workspace yang diperiksa**, sehingga belum dapat dilakukan pencocokan visual terhadap gambar pemilik.

## UI yang diterapkan

- Dark default: background `#181818`, surface `#242424`, elevated `#2D2D2D`, border `#3A3A3A`, primary `#0078D4`, text `#F5F5F5`, secondary `#AFAFAF`.
- Font system: Segoe UI Variable → Segoe UI → Inter self-hosted → sans-serif. Preload font display lama dilepas agar tidak mengunduh font yang tidak digunakan. Tidak menggunakan aset Microsoft.
- Desktop: sidebar fixed dengan logo dan empat navigasi, indikator aktif biru, header sticky berjudul, search katalog, konten halaman scroll native, tautan FAQ terpisah. Sidebar dapat digulir pada jendela pendek.
- Mobile: sidebar disembunyikan, header ringkas dan search di bawahnya, empat bottom navigation fixed dengan safe-area inset. Workspace mendapat padding yang sesuai agar konten tidak tertutup.
- Beranda: hero “Solusi Aplikasi Bisnis Anda”, CTA katalog, pilihan aplikasi, kartu berikon, status lisensi, serta informasi keunggulan tanpa statistik/rating palsu. “Aplikasi populer” merupakan pilihan editorial katalog, bukan hasil peringkat unduhan.
- Search: nama/kategori/deskripsi/audiens/fitur dari katalog lokal; submit menuju route katalog yang sama dengan query `q`. Mendukung beberapa kata, reset, dan empty state. Tidak ada API pencarian/backend.
- Detail desktop: breadcrumb, ikon/nama/developer, screenshot carousel, konten utama, sidebar spesifikasi dan lisensi/download.
- Detail mobile: kembali/share, ringkasan, download full width, galeri swipe native, accordion fitur/spesifikasi, bar download fixed di atas bottom navigation. Bar memiliki ruang konten tambahan dan posisi yang menghormati safe-area.
- Share menggunakan native share jika didukung, clipboard jika tersedia, dan input tautan yang dapat disalin manual sebagai fallback.
- Animasi hanya fade, hover kecil, accordion/galeri. Elemen hero lama dengan partikel/glow/floating tidak dirender. Preferensi reduced-motion tetap dihormati.

## Batas bisnis dipertahankan

Katalog `products.js` tidak diubah pada tahap ini. Route, URL APK, harga/config kontak, Vite base, CNAME, workflow Pages, dan halaman aktivasi tidak diubah. Tidak ada login, keranjang, pembayaran online, review/rating buatan, akses Google Sheets/Apps Script, push, deployment, atau perubahan DNS.

Download gratis dibedakan dari lisensi berbayar. Tombol APK yang belum tersedia tetap **Segera Tersedia** dan disabled. Alur pendaftaran, status Pending, instruksi pembayaran, persetujuan admin, verifikasi aktivasi/autentikasi tetap sama. Dukungan penggunaan offline hanya diklaim untuk stPOS karena belum dikonfirmasi untuk stFNB.

## Validasi

| Pemeriksaan | Hasil |
| --- | --- |
| `npm run build` | Berhasil, tanpa warning build |
| `npm run check` | 3 tes lulus |
| `npm run audit:render` | 7 halaman + 2 fallback lulus, tautan internal/galeri/field detail valid |
| `npm run test:detail` | Lulus pada normal/reduced-motion: carousel, scroll sync, lightbox panah/cancel/tutup, fokus dan scroll body |
| `npm run test:store` | Lulus pada simulasi media desktop dan mobile: empat navigasi/indikator aktif, search/reset, detail, accordion, sticky download markup, share fallback, fokus, dan 10 langkah aktivasi |
| Preview produksi | HTTP 200 |
| Analisis import | Tidak ditemukan import tak terpakai di src |
| Bundle JS | 424.07 kB / 135.16 kB gzip |
| Bundle CSS | 36.77 kB / 8.69 kB gzip |

Tidak ada dependensi baru. `jsdom` yang sudah tersedia digunakan untuk tes DOM. Ukuran viewport dan dialog pada tes tidak mereplikasi browser nyata. Pemberitahuan Motion tentang reduced-motion saat tes merupakan kondisi yang disengaja, bukan error aplikasi; tes shell juga memastikan tidak ada error DOM tak tertangani.

## Pemeriksaan overflow dan keterbatasan

Source menggunakan track galeri lokal yang scroll, `minmax(0, 1fr)` pada grid, `min-width: 0` pada konten, search input yang dapat menyusut, teks detail yang membungkus, serta safe-area dan padding terpisah untuk dua bar mobile. Tidak diterapkan global `overflow-x: hidden` untuk menutupi masalah layout.

**Render visual desktop/mobile, pengukuran horizontal overflow, Tab/focus trap browser, dan swipe sentuh nyata belum diverifikasi.** Hasil jsdom merupakan validasi logika/markup, bukan screenshot atau hasil layout engine. Verifikasi visual membutuhkan akses browser yang berfungsi dan tiga referensi pemilik.

## File berubah

- `src/components/Layout.jsx`: shell, sidebar, header/search, bottom navigation.
- `src/components/UI.jsx`: brand, kartu katalog, fade animation.
- `src/components/DetailAccordion.jsx` (baru): native accordion responsif.
- `src/components/ShareApp.jsx` (baru): share/clipboard/manual fallback.
- `src/data/catalogSearch.js` (baru): pencarian lokal.
- `src/pages/Home.jsx`, `Products.jsx`, `ProductDetail.jsx`.
- `src/styles.css`, `src/pages/product-detail.css`.
- `index.html`: theme color dan viewport-fit; menghapus preload font lama.
- `scripts/audit-render.mjs`, `scripts/test-store-ui.mjs` (baru).
- `package.json`: script test:store; tanpa perubahan paket.
- `README.md` dan laporan ini.

Preview lokal: jalankan `npm.cmd run dev` dan buka URL Local Vite. Untuk preview build: `npm.cmd run build`, lalu `npm.cmd run preview`.
