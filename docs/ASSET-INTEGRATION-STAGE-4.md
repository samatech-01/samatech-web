# Tahap 4 - Integrasi aset asli

Proyek: D:/android/project/stPOS dan D:/android/project/stFNB.

Manifest Android menunjuk @mipmap/ic_launcher. Adaptive icon dan foreground/background diperiksa. Sumber terpilih: app/src/main/ic_launcher-playstore.png (512 x 512), artwork lengkap dari proyek; tidak memakai Android default. Tidak ada perubahan proyek Android.

Screenshot tidak ditemukan dalam source Android di luar build/cache. Screenshot perangkat sudah tersimpan di public/images/stPOS dan public/images/stFNB sebelum pekerjaan ini. Ekstensi .webp ternyata JPEG berdasarkan signature; dinormalisasi ke .jpg tanpa recompression. Tidak ada gambar internet, Compose preview, atau gambar buatan. Keaslian runtime disimpulkan dari tangkapan perangkat dan kecocokan UI; sesi penangkapan aslinya tidak disertakan.

## Inventaris

### stPOS
- /images/stpos/icon.png (512 x 512), SHA-256 bdf28ade9c5ef8dd97dbab901aece9bd1bf5434f1e3ed0950a150e89e83f6471
- /images/stpos/screenshot-dashboard1.jpg (1220 x 2712, 424551 bytes)
- /images/stpos/screenshot-dashboard2.jpg (1220 x 2712, 423710 bytes)
- /images/stpos/screenshot-dashboard3.jpg (1220 x 2712, 443364 bytes)
- /images/stpos/screenshot-data-barang1.jpg (1220 x 2712, 610249 bytes)
- /images/stpos/screenshot-data-barang2.jpg (1220 x 2712, 229672 bytes)
- /images/stpos/screenshot-kasir1.jpg (1220 x 2712, 762431 bytes)
- /images/stpos/screenshot-kasir2.jpg (1220 x 2712, 230334 bytes)
- /images/stpos/screenshot-login-awal.jpg (1220 x 2712, 649335 bytes)
- /images/stpos/screenshot-riwayat-transaksi.jpg (1220 x 2712, 448977 bytes)
- /images/stpos/screenshot-akun.jpg (1220 x 2712, 364296 bytes)

### stFNB
- /images/stfnb/icon.png (512 x 512), SHA-256 45c6e7a400395c09208c550fa702d9457bb72a029c8fcbdaf6dd4997ad9ef8fe
- /images/stfnb/screenshot-akun.jpg (1220 x 2712, 381352 bytes)
- /images/stfnb/screenshot-dashboard.jpg (1220 x 2712, 403131 bytes)
- /images/stfnb/screenshot-kasir.jpg (1220 x 2712, 722751 bytes)
- /images/stfnb/screenshot-kasir2.jpg (1220 x 2712, 284092 bytes)
- /images/stfnb/screenshot-menu-form.jpg (1220 x 2712, 196465 bytes)
- /images/stfnb/screenshot-menu.jpg (1220 x 2712, 612831 bytes)
- /images/stfnb/screenshot-pesanan.jpg (1220 x 2712, 523960 bytes)

Logo SamaTech yang sudah ada disalin tanpa perubahan ke public/images/samatech/logo-96.png dan logo-192.png.

## Validasi
- Build dan check: lulus.
- Audit render: 12 halaman + 3 fallback lulus; ikon/gambar/alt dan path lokal valid.
- test:detail: carousel, batas navigasi, pagination, lightbox, keyboard, focus restoration dan reduced motion lulus.
- test:store: desktop/mobile DOM lulus.
- HTTP seluruh ikon dan 17 screenshot: 200.
- Gambar menggunakan object-fit: contain pada container ikon, galeri dan lightbox; dimensi screenshot sesuai file 1220 x 2712.
- Browser visual belum terverifikasi: browser access host unavailable. Native swipe, overflow, tampilan responsif dan decoding browser tetap perlu QA visual.

## Kekurangan
Tidak ada screenshot wajib yang masih kosong: stPOS 10 dan stFNB 7 tersedia. Screenshot layar lain di luar inventaris belum ditemukan. Konversi WebP belum dilakukan karena encoder lokal tidak tersedia dan pip terhalang jaringan; JPEG asli dipertahankan agar teks tidak mengalami kompresi ulang.

## File source website diubah
- src/data/products.js
- src/components/UI.jsx
- src/components/HeroShowcase.jsx (referensi aset komponen lama)
- src/styles.css (fit gambar pada wadah ikon yang sama)
- scripts/audit-render.mjs (mengenali image preload React sebagai aset lokal)
- scripts/test-detail-ui.mjs (fixture placeholder eksplisit)
- scripts/test-store-ui.mjs (jumlah galeri mengikuti data)
- public/images/stpos/*, public/images/stfnb/*, public/images/samatech/*
- docs/ASSET-INTEGRATION-STAGE-4.md
- dist/* dihasilkan ulang oleh build

Layout, desain, animasi, routing, lisensi, harga, URL download, Android, Sheets dan Apps Script tidak diubah. Tidak ada push/deploy.