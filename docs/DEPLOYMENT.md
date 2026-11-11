# GitHub Pages dan domain SamaTech

Panduan untuk mengaktifkan GitHub Pages setelah website tersedia di repository.
Push source ke `main` hanya menjalankan validasi; tidak menerbitkan website.

## Persiapan

1. Pastikan perubahan konten, screenshot, APK, harga dan kontak telah disetujui serta lolos validasi produksi.
2. Push source ke branch `main` pada repository website ini. `node_modules/`, `dist/`, file `.env` dan rahasia dikecualikan oleh `.gitignore`/pemeriksaan rilis.
3. Di repository GitHub, buka **Settings → Pages** dan pilih sumber **GitHub Actions**.
4. Setelah publikasi disetujui, buka **Actions → Validate and optionally deploy GitHub Pages → Run workflow**, pilih branch `main`, set `publish=true`, lalu jalankan. Default `publish` adalah `false`; push/PR biasa hanya menjalankan validasi.
5. Untuk domain khusus, atur **samatech.sbs** pada **Settings → Pages**. `public/CNAME` ikut tersalin ke `dist/CNAME` sebagai dokumentasi domain. GitHub mengabaikan CNAME pada workflow Actions kustom; domain wajib diatur melalui Settings → Pages.

Vite menggunakan `base: '/'` untuk root domain. HashRouter membuat tautan seperti `https://samatech.sbs/#/produk/stpos` tetap dapat dibuka dan direfresh. Jika preview memakai subpath repository tanpa custom domain, ubah `base` serta URL aset absolut secara konsisten terlebih dahulu; konfigurasi sekarang sengaja untuk custom domain root.

## DNS manual — pertahankan Google Workspace

**Jangan mengganti nameserver, mereset DNS zone, atau menghapus record email.** Simpan salinan konfigurasi DNS sebelum perubahan manual. Pertahankan seluruh MX, TXT SPF, TXT/CNAME DKIM, TXT `_dmarc`, serta record verifikasi Workspace. Jangan membuat record SPF kedua.

Setelah memastikan nilai terbaru di dokumentasi resmi GitHub, atur record web apex `@`:

| Jenis | Host | Nilai GitHub Pages |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Hanya ganti A/AAAA web yang bertentangan. Bila ada AAAA lama yang mengarah ke hosting lain, periksa dan perbarui/hapus hanya record web tersebut; IPv6 GitHub opsional, ikuti nilai resmi jika digunakan. Jangan memakai CNAME pada apex karena domain juga membutuhkan record email.

Opsional: `www` sebagai CNAME ke hostname Pages `<OWNER>.github.io` (isi owner sebenarnya, tanpa skema/path). Jangan membuat wildcard DNS. Verifikasi kepemilikan domain melalui Settings akun/organisasi → Pages dan tambahkan TXT verifikasi yang diberikan GitHub tanpa menghapus TXT lain.

Tunggu propagasi dan pemeriksaan domain, lalu aktifkan **Enforce HTTPS** ketika sertifikat tersedia. Jika domain menggunakan CAA, pastikan kebijakan mengizinkan sertifikat GitHub Pages sesuai dokumentasi. Uji HTTPS, navigasi, refresh detail, unduhan APK, email masuk/keluar Workspace, serta SPF/DKIM/DMARC sesudah perubahan.

## Referensi resmi

- [Vite: persyaratan Node.js](https://vite.dev/guide/)
- [GitHub: deployment melalui workflow Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub: mengelola domain dan DNS Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub: verifikasi custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
