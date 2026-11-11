# Modul Jasa Pembuatan Aplikasi

9 November 2026. Modul baru mengikuti palet, Manrope/Inter, komponen tombol, Reveal, sidebar dan shell Microsoft Store Dark Mode yang sudah ada. Gambar referensi khusus banner/halaman jasa belum tersedia; gambar detail aplikasi dari tahap sebelumnya bukan acuan komposisi banner jasa. Pencocokan gambar layanan masih memerlukan referensi pemilik.

## Halaman dan navigasi

- Beranda: banner **Jasa Pembuatan Aplikasi** tepat setelah section aplikasi populer. Desktop: headline/CTA kiri, empat jenis layanan di kanan. Mobile: satu kolom dengan ikon/tautan layanan grid 2 kolom dan CTA konsultasi full width.
- `/#/jasa-custom`: hero, empat kartu layanan, alur pengerjaan, FAQ accordion, dan CTA konsultasi.
- `/#/jasa-custom/mobile-app-development`
- `/#/jasa-custom/web-application-development`
- `/#/jasa-custom/google-appsheet-development`
- `/#/jasa-custom/website-landing-page`
- Slug lain menampilkan fallback 404 aplikasi yang sudah ada.

Menu Jasa Custom ditambahkan satu kali di sidebar karena sebelumnya belum ada. Bottom navigation tetap empat menu lama. Pada mobile modul dapat diakses dari banner beranda, footer, dan tautan layanan terkait. Route produk lama tidak diubah; metadata khusus jasa ditambahkan.

## Konten dan konfigurasi

`src/data/services.js` memuat `id`, `slug`, `title`, `shortDescription`, `description`, `icon`, `examples`, dan `whatsappMessage`. Juga memuat pesan konsultasi umum, urutan pemesanan, dan FAQ. Keempat layanan hanya menyebut Android, aplikasi web, Google AppSheet, website dan landing page sesuai brief; tidak mengklaim iOS/platform lain atau teknologi implementasi tambahan.

Contoh cakupan bukan janji fitur yang otomatis termasuk paket. Tidak ada nominal biaya atau tenggat rekaan. Biaya, jadwal, akun/lisensi layanan, dan ketentuan pengerjaan dibahas berdasarkan kebutuhan proyek.

Nomor berasal dari `site.whatsappNumber` di `src/config/site.js`. `src/data/serviceContact.js` memakai validasi helper WhatsApp yang sudah ada, lalu mengganti hanya pesan URL untuk jenis layanan. Konfigurasi dan pesan aktivasi produk lama tidak diubah.

- Nomor kosong/tidak valid: button disabled dengan informasi **Kontak WhatsApp admin belum tersedia**. Tidak ada href palsu.
- Nomor valid: link `https://wa.me/...` dengan pesan yang diencode sesuai layanan, target tab baru, `noopener noreferrer`.
- Konsultasi hanya membuka tautan; tidak ada pengiriman otomatis pesan atau formulir website.

## Validasi

- `npm run build`: berhasil tanpa warning; JS 436.26 kB / 138.07 kB gzip, CSS 51.53 kB / 11.14 kB gzip.
- `npm run check`: 3 pengujian konfigurasi lama lulus.
- `npm run audit:render`: 12 halaman dan 3 fallback lulus, seluruh link internal dan gambar valid.
- `npm run test:store`: dua simulasi media desktop/mobile lulus. Ditambah pemeriksaan posisi banner, empat route detail layanan, contoh cakupan, FAQ, lima langkah proyek, kontak kosong/invalid, pesan per layanan, keamanan link, dan kontak valid yang disimulasikan di memori lalu dikembalikan.
- `npm run test:detail`: pengujian galeri/keyboard/fokus/reduced-motion aplikasi lama tetap lulus.
- Preview produksi HTTP 200. Analisis source tidak menemukan import yang tidak digunakan.
- Tidak ada dependensi baru. CSS jasa terisolasi dalam kelas services/service sehingga tampilan detail produk tidak tersentuh.

Aturan mobile memakai minmax(0, 1fr), min-width: 0, pembungkusan teks, grid 2 kolom ikon, serta CTA full width. Layout/overflow browser nyata belum dapat disimpulkan dari jsdom: pemeriksaan visual desktop/mobile dan pengukuran horizontal overflow tetap memerlukan browser yang dapat diakses. Tidak ada klaim skor Lighthouse atau kesesuaian visual terhadap gambar yang belum diterima.

## File dibuat

- `src/data/services.js`
- `src/data/serviceContact.js`
- `src/components/ServicesUI.jsx`
- `src/pages/Services.jsx`
- `src/pages/ServiceDetail.jsx`
- `src/styles/services.css`
- Laporan ini.

## File diubah

- `src/pages/Home.jsx`: menyisipkan banner.
- `src/components/Layout.jsx`: menu tunggal, label header, footer jasa; bottom nav tetap sama.
- `src/App.jsx`: route dan metadata jasa tambahan.
- `scripts/audit-render.mjs`: mencakup lima route jasa dan fallback baru.
- `scripts/test-store-ui.mjs`: tes interaksi jasa dan konfigurasi kontak.
- `README.md`: petunjuk modul.

Katalog stPOS/stFNB, komponen/detail aplikasi, alur APK/aktivasi, konfigurasi kontak, Vite/Pages, DNS, Sheets dan Apps Script tidak diubah. Tidak ada login, checkout, database, push atau deployment.
