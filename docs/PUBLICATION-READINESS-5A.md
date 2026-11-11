# SamaTech - Persiapan publikasi GitHub, Tahap 5A

Tanggal pemeriksaan: 10 November 2026 (Asia/Singapore).

## Pembaruan finalisasi, 11 November 2026

Bagian di bawah merekam kondisi saat audit 10 November dan bersifat historis.
Untuk persiapan initial release, status terbaru:

- Pemilik proyek mengonfirmasi bahwa data barang dan transaksi di screenshot
  merupakan data uji coba miliknya.
- Nama owner pada screenshot stPOS diganti menjadi identitas demo; nama usaha
  pada akun/login juga digenerikkan. Nama owner dan usaha stFNB diganti dengan
  identitas demo. Email pada dua screenshot akun tetap tertutup permanen.
- Nama menu dan item bermerek Mie Gacoan diganti dengan nama demo generik.
  Materi promosi bermerek diganti foto menu tanpa merek; tampilan aplikasi dan
  data transaksi uji coba lainnya dipertahankan. Source code Android tidak
  diubah.
- Semua 17 screenshot aktif tetap berukuran 1220 x 2712. Pemeriksaan metadata
  tidak menemukan tag GPS, owner, artist, atau copyright.
- Kontak terkonfigurasi: telepon/WhatsApp `081345458212`, email
  `admin@samatech.sbs`, dan alamat SamaTech di Sepinggan Baru, Balikpapan
  Selatan, Kota Balikpapan, Kalimantan Timur.
- APK resmi stPOS 0.35.5 dan stFNB 1.0.0, serta harga Rp300.000 sekali bayar
  untuk masing-masing produk, sudah terkonfigurasi di katalog dinamis.
- `npm run check`, `npm run audit:render`, `npm run test:detail`,
  `npm run test:store`, `npm run build`, dan `npm run check:release` lulus
  setelah finalisasi screenshot.
- Branch lokal `main` belum memiliki commit. Repository tujuan diperiksa
  sebelum initial push dan belum memiliki branch. Push awal tidak menjalankan
  GitHub Pages; DNS dan Google Workspace tidak diubah.

Pekerjaan hanya lokal. Tidak ada repository remote dibuat, remote ditambahkan,
push, deployment, pengaturan GitHub Pages online, atau perubahan DNS.

## Keamanan source dan aset

- Pemeriksaan source, konfigurasi, workflow, nama berkas, dan kandidat Git tidak
  menemukan API key, password, private key, token autentikasi, atau rahasia lisensi.
  Istilah token/password pada validator URL dan permission `id-token: write` pada
  workflow merupakan kode/konfigurasi, bukan kredensial yang tersimpan.
- Tidak ditemukan `.env`, keystore, database pelanggan, APK, atau ekspor lisensi
  di berkas source yang disiapkan untuk Git. Proyek Android tidak disalin ke repo.
- `.gitignore` kini mencakup environment, signing keys/keystore, konfigurasi lokal,
  cache, backup/database, APK, output build dan folder aset privat.
- Dua screenshot Akun mengandung email. Atas instruksi pengguna, email ditutup
  dengan blok hitam permanen menggunakan pengolahan bitmap lokal tanpa AI.
  Versi publik adalah `public/images/stpos/screenshot-akun.png` dan
  `public/images/stfnb/screenshot-akun.png`. Referensi produk telah diperbarui.
  File PNG disimpan ulang tanpa menyertakan metadata JPEG asli.
  Keduanya tetap 1220 x 2712 piksel; perbandingan bitmap menemukan 0 piksel
  berubah di luar kotak email (x=80, y=935, lebar=800, tinggi=80).
- Screenshot asli berada di `.private-assets/originals/`, di luar `public/` dan
  diabaikan Git. Jangan mengunggah seluruh folder proyek secara manual, karena
  layanan upload manual tidak menerapkan `.gitignore`.
- Nama usaha/pemilik dan data barang/transaksi pada screenshot tetap terlihat.
  Instruksi pengguna hanya menyamarkan email. Audit source tidak membuktikan
  apakah data transaksi merupakan data demo; jangan menafsirkan hasil ini sebagai
  jaminan bahwa screenshot bebas seluruh informasi pribadi/komersial.
- Ikon stPOS/stFNB berasal dari launcher Play Store proyek Android. Dua SVG
  placeholder lama dan dua logo duplikat yang tidak dipakai dipindahkan ke
  `.private-assets/unused/`; tidak ikut build maupun kandidat Git.
- Tidak ada placeholder gambar yang dirujuk produk aktif. Fallback placeholder
  dan fixture pengujian tetap tersedia dalam kode untuk menangani data mendatang.

## Validasi produksi

- `npm run build`: lulus.
- `npm run check`: 3/3 lulus.
- `npm run audit:render`: 12 halaman dan 3 fallback lulus; tautan lokal, gambar,
  teks alternatif dan produk tambahan dari data diperiksa.
- `npm run test:detail`: lulus pada motion normal dan reduced motion, termasuk
  carousel, pagination, lightbox, keyboard, penutupan dan pengembalian fokus.
- `npm run test:store`: lulus pada desktop dan mobile DOM, termasuk navigasi,
  pencarian, formulir kontak, tombol yang nonaktif dan alur aktivasi.
- `npm audit --json`: berhasil mengakses registry npm; 0 kerentanan
  (info/low/moderate/high/critical seluruhnya 0), 209 dependensi menurut npm.
  Percobaan pertama dalam sandbox gagal mengakses registry; hasil di atas berasal
  dari percobaan berhasil dengan akses jaringan yang diizinkan.
- `npm run check:release`: memeriksa CNAME source/output, base root, HashRouter,
  path aset dengan huruf besar/kecil yang tepat untuk Linux, aset produk aktif,
  berkas output, kandidat Git dan pola kredensial umum.
  Hasil akhir: 95 kandidat berkas Git dan 40 berkas output lulus; tidak ada
  JPEG Akun asli maupun aset bernama placeholder dalam public/output.
- Smoke test HTTP pada preview produksi lokal: 25 permintaan root, URL hash,
  CNAME, favicon, Open Graph, ikon dan screenshot semuanya berhasil. Server
  preview ditutup setelah pemeriksaan; tidak ada layanan publik dibuat.
- SHA-256 kedua ikon website identik dengan ikon launcher Play Store Android.
- Uji DOM memakai jsdom; geometri viewport, swipe native dan tampilan akhir di
  browser bukan cakupan pengujian tersebut. Browser QA visual belum diulang pada
  tahap ini; layanan browser pada tahap sebelumnya tidak tersedia.

## GitHub Pages dan domain

- `vite.config.js`: `base: '/'`, sesuai root custom domain.
- `public/CNAME`: `samatech.sbs`; tersalin ke `dist/CNAME`.
- Routing memakai HashRouter, misalnya `https://samatech.sbs/#/produk/stpos`.
  Refresh detail tidak memerlukan server rewrite.
- Canonical, Open Graph, robots dan sitemap menggunakan `https://samatech.sbs/`.
  Sitemap hanya memuat root karena fragment hash bukan dokumen terpisah.
- Workflow `.github/workflows/deploy.yml` memakai Node 24, `npm ci`, semua
  pengujian, npm audit, build dan pemeriksaan rilis.
- Push/PR pada `main` hanya memvalidasi. Deployment hanya dapat dipilih lewat
  `workflow_dispatch` pada `main` dengan `publish=true`; default false.
  Upload artifact Pages dan job deploy memakai kondisi manual yang sama.
- Hak build dibatasi ke contents/pages read; job deploy mendapat pages write
  dan OIDC. Tidak menggunakan personal access token.
- Pada publikasi berikutnya, pemilik harus memilih GitHub Actions sebagai source
  Pages dan memasukkan custom domain melalui Settings > Pages. Pada workflow
  Actions kustom, GitHub mengabaikan berkas CNAME; berkas tersebut tidak
  mengonfigurasi domain secara otomatis.
- Belum ada verifikasi DNS, sertifikat HTTPS atau state Pages online. Perubahan
  DNS dan pengaturan remote hanya dilakukan setelah persetujuan publikasi.

Referensi resmi yang diperiksa:

- [Vite: static deployment dan base custom domain](https://vite.dev/guide/static-deploy)
- [GitHub: custom workflows untuk Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub: mengelola custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

## Repository lokal

- Sebelumnya tidak ada `.git` pada proyek atau repository induk yang dikenali.
- Repository lokal baru diinisialisasi dengan branch `main`.
- Belum ada commit, staging, atau remote. Tidak ada riwayat Git yang dihapus.
- Runner sandbox memiliki akun berbeda dari pemilik folder. Pemeriksaan memakai
  `git -c safe.directory=D:/xampp/htdocs/Project/samatech-web ...` hanya untuk
  perintah terkait; konfigurasi global Git tidak diubah.
- `.gitattributes` menormalkan berkas teks untuk checkout/build Linux.

## Yang perlu dilengkapi sebelum peluncuran operasional

- `src/config/site.js`: WhatsApp, email dan alamat resmi masih kosong. Kontak dan
  konsultasi WhatsApp nonaktif secara sengaja, bukan tautan rusak. Email pada
  screenshot tidak dianggap sebagai kontak resmi dan tidak disalin ke konfigurasi.
- `src/data/products.js`: URL download APK masih kosong untuk kedua aplikasi;
  tombol menampilkan Segera Tersedia. Harga dan sebagian metadata teknis juga
  belum diisi. Tidak dibuat URL, kontak, harga atau versi rekaan.
- Tetapkan bahwa nama/identitas dan transaksi screenshot memang layak dipublikasikan.
- Setelah persetujuan, tentukan pemilik/nama repository remote, identitas commit,
  konfigurasi Pages/domain online dan DNS sesuai panduan DEPLOYMENT.md.

Source dan konfigurasi lokal disiapkan untuk proses upload Git berikutnya.
Kesiapan teknis tidak mengaktifkan unduhan/kontak yang masih kosong dan tidak
merupakan izin publikasi.

## Berkas yang diubah pada Tahap 5A

- `.gitignore`, `.gitattributes`
- `.github/workflows/deploy.yml`
- `package.json`, `scripts/check-release.mjs`
- `src/data/products.js` (hanya referensi dua screenshot Akun)
- `public/images/stpos/screenshot-akun.png`
- `public/images/stfnb/screenshot-akun.png`
- Dua JPEG Akun asli, dua SVG placeholder dan dua logo tak terpakai dipindahkan
  keluar public ke folder privat lokal.
- `README.md`, `docs/DEPLOYMENT.md`, `docs/APP-DETAIL.md`, dokumen ini
- `.git/` dibuat lokal; `dist/` dihasilkan ulang, keduanya bukan berkas source
  yang akan diunggah sebagai konten website melalui Git.
