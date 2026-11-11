# Audit dan finalisasi tahap 2

Tanggal: 9 November 2026. Ruang lingkup hanya `samatech-web`. Tidak ada push/deploy, perubahan DNS, atau perubahan aplikasi Android, Apps Script, dan Google Sheets.

## Temuan menurut risiko

### Kritis / tinggi

Tidak ditemukan dalam pemeriksaan source, konfigurasi, dan advisori npm saat audit. Ini bukan jaminan bebas seluruh kerentanan. `npm audit --json` melaporkan 0 info, low, moderate, high, dan critical. Tidak dilakukan upgrade dependensi atau `audit fix`.

Source tidak menyimpan API key/token/kredensial atau data pelanggan; tidak ada fetch/axios, penyimpanan browser, form pendaftaran/pembayaran, atau koneksi ke sistem aktivasi. Alur aktivasi hanya konten informasi. Tautan tab baru memakai `noopener noreferrer`; APK dibatasi HTTPS GitHub Releases, WhatsApp dibentuk dari nomor valid yang dapat dikonfigurasi. Domain/path valid tidak membuktikan APK terpercaya: pemilik tetap harus memasukkan repository dan APK resmi.

### Sedang — keterbatasan SEO yang tetap berlaku

HashRouter aman untuk refresh URL seperti `/#/produk/stpos` di Pages, tetapi tidak memberi dokumen HTTP terpisah untuk setiap produk. Metadata dinamis tidak selalu dibaca crawler sosial. Canonical dan Open Graph tetap menunjuk website utama. Sitemap sengaja hanya memuat `https://samatech.sbs/`; tidak berisi URL hash atau path bersih yang belum didukung deployment.

Jika visibilitas pencarian per produk menjadi kebutuhan bisnis, pemilik perlu memutuskan migrasi routing dengan prerender/SSG pada fase berikutnya. Tidak dilakukan refactoring arsitektur pada tahap ini.

### Rendah — diperbaiki

- Footer produk sebelumnya ditulis manual. Sekarang mengambil katalog lokal yang sama dengan kartu dan detail, sehingga produk baru tidak memerlukan edit footer.
- Label placeholder pada detail selalu muncul. Sekarang dikendalikan `screenshotIsPlaceholder` dari data produk.
- Harga `undefined`/string kosong kini memakai status harga belum diumumkan.
- Menu mobile kini menutup saat tautan halaman aktif diklik, target `aria-controls` selalu tersedia, menu tersembunyi tidak tampil pada desktop, dan perpindahan rute termasuk Beranda mengarahkan fokus ke konten tanpa mencuri fokus saat halaman pertama dimuat.
- Penyesuaian wrapping CTA/teks untuk viewport sangat sempit.
- Menambahkan sitemap XML canonical dan referensinya di robots.txt.
- Hak token workflow dibatasi menurut job: build hanya baca konten/Pages; deploy mendapat Pages write dan OIDC. Tidak ada token pribadi/kredensial dalam workflow.
- Pengujian katalog tidak lagi mengharuskan harga/URL selamanya kosong, sehingga konfigurasi resmi berikutnya dapat ditambahkan tanpa melanggar pengujian.

## Struktur, desain, dan katalog

React + Vite + Tailwind v4 melalui plugin Vite konsisten. Kartu dan UI pendukung dipakai ulang; tidak ditemukan kebutuhan refactoring besar atau komponen tidak terpakai. Analisis scope Babel pada seluruh source tidak menemukan import yang tidak digunakan. Warna, tipografi, spacing, breakpoint, dan ukuran komponen terpusat di stylesheet. Tidak ditemukan aset besar: PNG Open Graph sekitar 18.4 kB, SVG placeholder sekitar 1.5 kB per produk. Gambar produk memiliki alt, ukuran intrinsik, dan lazy loading. Tidak ditambahkan dependensi baru.

`src/data/products.js` tetap sumber katalog; harga dan URL dapat dikonfigurasi. Harga resmi, kontak, dan URL APK masih kosong sesuai status aktual. Tombol **Segera Tersedia** sengaja disabled, bukan CTA yang menjanjikan fungsi tersedia. Tidak dibuat fitur, harga, nomor kontak, atau tautan palsu.

## Validasi

| Pemeriksaan | Hasil |
| --- | --- |
| `npm run check` | 3 lulus, 0 gagal |
| `npm run audit:render` | 7 halaman + 2 fallback lulus |
| Tautan lokal dan gambar | Target internal valid; aset lokal ditemukan; alt tersedia |
| Penambahan produk | Produk sementara dikenali katalog, footer, dan detail tanpa edit komponen; dihapus dari memori setelah pengujian |
| `npm run build` | Berhasil, Vite 7.3.7, 2005 modul, tanpa warning build |
| `npm run lint --if-present` | Dilewati: script lint belum tersedia; bukan hasil lint lulus |
| `npm audit --json` | 0 kerentanan yang diketahui registry saat pemeriksaan |
| Preview HTTP | 200 untuk root, sitemap, robots, CNAME, OG PNG, dan dua SVG produk |
| Sitemap | XML valid; canonical HTTPS domain final, tanpa hash |
| CNAME build | `samatech.sbs` |
| Bundle JS | 411.92 kB mentah / 131.36 kB gzip |
| Bundle CSS | 24.36 kB mentah / 6.47 kB gzip |
| Total output | 460,515 byte termasuk aset publik |

Audit render memakai komponen React aktual via Vite SSR dan MemoryRouter, tanpa menambahkan server pada website. Ini menguji markup/rute, bukan perilaku browser. Tidak ada peringatan/error pada audit render maupun build.

Uji manual browser desktop/mobile, fungsi navigasi, dan ketiadaan error browser telah dikonfirmasi pemilik sebelum tahap ini. Interaksi browser dan console setelah perubahan kecil belum diuji ulang otomatis; hasil tahap ini terbatas pada source, render, build, dan HTTP. Tidak mengklaim pemeriksaan WCAG penuh atau skor Lighthouse.

404 aplikasi berfungsi untuk hash route tidak dikenal dan ID produk tidak dikenal. Sebagai SPA statis, fallback aplikasi tidak mengubah status HTTP menjadi 404. Tautan publik harus memakai HashRouter; `/produk/stpos` tanpa hash bukan URL yang didukung.

## File yang diubah/ditambah

- `src/components/Layout.jsx`: katalog footer dan aksesibilitas/perilaku menu/fokus.
- `src/pages/ProductDetail.jsx`: status placeholder dan fallback harga.
- `src/data/products.js`: flag placeholder pada kedua produk.
- `src/styles.css`: visibilitas menu dan wrapping viewport sempit.
- `public/sitemap.xml` (baru), `public/robots.txt`: sitemap canonical.
- `.github/workflows/deploy.yml`: hak per job dan audit render sebelum build.
- `scripts/audit-render.mjs` (baru), `package.json`: pemeriksaan render lokal/CI.
- `tests/config.test.js`: validasi konfigurasi yang menerima data resmi di masa depan.
- `README.md`, `docs/VERIFICATION.md`, dan laporan ini: dokumentasi penggunaan dan hasil audit.

## Kesiapan GitHub Pages dan keputusan pemilik

Konfigurasi lokal siap: Vite `base: '/'`, HashRouter, CNAME, build statis `dist`, dan workflow Actions. Workflow belum diuji di GitHub karena push/deploy tidak diizinkan. Repository, akses Pages, environment, custom domain, serta HTTPS perlu disiapkan pada fase publikasi.

Pemilik masih perlu mengonfirmasi URL APK resmi, harga/ketentuan lisensi, kontak resmi, minimum Android, fitur tambahan, dan screenshot/logo final. Konfirmasi juga kebutuhan SEO per produk sebelum memutuskan arsitektur pada fase selanjutnya. Semua perubahan DNS nantinya tetap manual dengan mempertahankan MX/SPF/DKIM/DMARC Google Workspace.

## Referensi

- [GitHub: custom workflow Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Sitemaps: protokol URL canonical](https://www.sitemaps.org/protocol.html)
