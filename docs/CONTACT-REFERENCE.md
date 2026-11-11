# Kontak — redesign sesuai gambar pemilik

9 November 2026. Referensi: `kontak web.jpg` yang dilampirkan pemilik.

Desktop memakai breadcrumb dan judul Hubungi Kami, dua kolom seimbang dengan kartu WhatsApp/email/lokasi di kiri serta formulir di kanan. Mobile memakai judul dengan tombol kembali, CTA WhatsApp full width, kartu email/lokasi, lalu formulir satu kolom. Palet dark, Manrope/Inter, border tipis, radius 15–17px dan sidebar/bottom navigation lama dipertahankan.

Kartu WhatsApp memakai aksen navy/hijau yang halus sesuai referensi. Tidak disalin alamat/email contoh, branding AppNexus, klaim konsultasi gratis atau Fast Response yang belum dikonfirmasi.

## Kontak resmi dan formulir

Konfigurasi di `src/config/site.js`:

- `whatsappNumber`: nomor internasional resmi tanpa +/spasi, field lama tetap sama.
- `email`: alamat email resmi, field lama tetap sama.
- `officeAddress`: field baru, kosong sampai lokasi resmi dikonfirmasi.

Nomor kosong/tidak valid menonaktifkan CTA chat dan submit formulir. Email kosong/tidak valid tidak menghasilkan mailto. Alamat kosong menampilkan status belum tersedia. Tidak ada nomor, alamat, atau email buatan.

Formulir memiliki Nama Lengkap, Email/No. WhatsApp, Kategori Kebutuhan dan Pesan Anda, dengan label terhubung, isian wajib, batas panjang, serta validasi native. Pilihan kategori: Aplikasi Siap Pakai, Jasa Custom, Aktivasi Lisensi, Pertanyaan Umum.

CTA **Lanjut ke WhatsApp** menyiapkan URL pesan yang diencode dan mencoba membukanya pada tab baru dengan noopener/noreferrer. Pesan tetap perlu diperiksa dan dikirim oleh pengguna di WhatsApp. Tautan cadangan disediakan jika tab tidak terbuka; tautan lama dibersihkan ketika isian berubah. Tidak ada klaim pesan berhasil terkirim.

Tidak ada backend, request API pengiriman, database, email server, maupun localStorage. Isian hanya berada di form/memori halaman dan diteruskan ke WhatsApp saat pengguna melanjutkan. Routing/download/aktivasi tidak diubah.

## Validasi

- Build produksi berhasil tanpa warning.
- 3 tes konfigurasi dan audit 12 halaman + 3 fallback lulus.
- Tes store untuk kondisi media desktop/mobile lulus, termasuk kontak kosong, label/isian wajib, mailto valid, penolakan form kosong, penyusunan pesan sesuai isian, parameter tab aman, tautan cadangan, status yang tidak mengklaim pengiriman, dan reset tautan setelah edit.
- Nomor, email dan alamat uji hanya disimulasikan di memori dan dikembalikan setelah tes; tidak ada pesan sungguhan dikirim.
- Tes katalog, jasa, detail/lightbox/reduced-motion lama tetap lulus.
- Preview produksi merespons HTTP 200.

Grid minmax(0,1fr), input/select width 100% dan min-width 0, pembungkusan alamat/email panjang, serta textarea resize vertical disiapkan untuk mencegah overflow. Form mobile memakai ukuran input 16px agar tidak memicu pembesaran input pada browser yang melakukannya untuk font kecil.

Pemeriksaan visual desktop/mobile, kesamaan piksel terhadap gambar dan pengukuran overflow nyata belum diverifikasi melalui browser. Tes jsdom memeriksa logika/markup, bukan geometri layout.

## File berubah

- `src/pages/Contact.jsx`: layout dan formulir frontend.
- `src/pages/contact.css`: baru, style kontak terisolasi.
- `src/data/contact.js`: baru, kategori/pesan dan helper mailto.
- `src/config/site.js`: hanya menambahkan konfigurasi lokasi kosong.
- `scripts/test-store-ui.mjs`: pengujian kontak.
- Laporan ini.

Tidak ada dependensi baru, perubahan halaman lain, push, deploy atau perubahan DNS.
