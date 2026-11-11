export const products = [
  {
    id: 'stpos', name: 'stPOS', category: 'TOKO & RETAIL', icon: '/images/stpos/icon.png',
    developer: 'SamaTech', platform: 'Android',
    licenseDescription: 'Pembelian lisensi dilakukan satu kali untuk satu perangkat Android. Setelah pembayaran dikonfirmasi dan aktivasi berhasil, aplikasi dapat digunakan secara offline.',
    paymentType: 'Sekali bayar',
    licenseScope: '1 perangkat Android per pembelian',
    version: '0.35.5', minAndroid: null, fileSize: null, updatedAt: null,
    screenshots: [
      {
            "src": "/images/stpos/screenshot-dashboard1.jpg",
            "alt": "stPOS - dashboard1",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stpos/screenshot-dashboard2.jpg",
            "alt": "stPOS - dashboard2",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stpos/screenshot-dashboard3.jpg",
            "alt": "stPOS - dashboard3",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stpos/screenshot-data-barang1.jpg",
            "alt": "stPOS - data barang1",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stpos/screenshot-data-barang2.jpg",
            "alt": "stPOS - data barang2",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stpos/screenshot-kasir1.jpg",
            "alt": "stPOS - kasir1",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stpos/screenshot-kasir2.jpg",
            "alt": "stPOS - kasir2",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stpos/screenshot-login-awal.jpg",
            "alt": "stPOS - login awal",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stpos/screenshot-riwayat-transaksi.jpg",
            "alt": "stPOS - riwayat transaksi",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stpos/screenshot-akun.png",
            "alt": "stPOS - akun",
            "width": 1220,
            "height": 2712
      }
], changelog: [], licensePrice: null,
    tagline: 'Teman kerja untuk usaha dagang Anda.',
    description: 'Aplikasi kasir dan manajemen stok offline untuk toko, retail, dan usaha dagang.',
    audience: 'Toko, retail, dan usaha dagang',
    aboutTitle: "stPOS — Kasir dan Pengelolaan Stok dalam Satu Aplikasi",
    aboutParagraphs: [
    "stPOS adalah aplikasi kasir berbasis Android dari SamaTech yang membantu pemilik usaha mencatat penjualan, mengelola barang, dan memantau persediaan dengan lebih teratur.",
    "Mulai dari pemindaian barcode, pencatatan stok masuk, hingga pencetakan struk dan laporan penjualan, semuanya tersedia dalam satu aplikasi. Dashboard menyajikan ringkasan penjualan, laba kotor, dan kondisi stok untuk membantu Anda memahami perkembangan usaha.",
    "Setelah aktivasi berhasil, fitur utama kasir, stok, transaksi, dan laporan dapat digunakan secara offline, sehingga operasional tetap berjalan saat koneksi internet terbatas."
],
    audienceDetails: [
    "Toko kelontong dan sembako: Mencatat penjualan harian dan persediaan barang",
    "Toko kosmetik dan perawatan tubuh: Mengelola produk berdasarkan kategori, foto, dan barcode",
    "Toko aksesori dan perlengkapan ponsel: Memantau stok serta harga beli dan jual",
    "Toko alat tulis dan perlengkapan sekolah: Memudahkan transaksi banyak jenis barang",
    "Toko pakaian dan aksesori: Mencatat setiap ukuran atau warna sebagai produk tersendiri",
    "Toko perlengkapan rumah tangga: Mengelola katalog dan pergerakan stok",
    "Toko makanan ringan dan minuman kemasan: Mempercepat transaksi produk satuan",
    "Usaha rumahan, reseller, dan stan bazar: Menjalankan kasir melalui perangkat Android"
],
    audienceNote: "stPOS paling sesuai untuk UMKM penjualan barang. Fitur khusus seperti meja restoran, resep produksi, nomor batch, dan tanggal kedaluwarsa belum tersedia.",
    deviceCompatibility: [
    "Smartphone Android: Minimum Android 8.0, sesuai konfigurasi aplikasi",
    "Tablet Android: Memiliki penyesuaian tampilan untuk layar yang lebih lebar",
    "Mesin kasir/POS Android: Berpotensi digunakan jika memenuhi persyaratan Android; printer bawaan perlu diuji",
    "Kamera perangkat: Digunakan untuk memindai barcode; barcode juga dapat dimasukkan secara manual",
    "Printer thermal ESC/POS 58 mm Bluetooth Classic: Didukung melalui pengaturan printer aplikasi",
    "Printer thermal ESC/POS 58 mm USB: Memerlukan USB OTG dan printer yang mendukung USB Printer Class"
],
    deviceNote: "Kompatibilitas setiap model perangkat dan printer tetap perlu diuji. Printer Bluetooth BLE dan USB serial belum didukung. Versi native untuk iPhone/iPad, Windows, dan penggunaan melalui browser belum tersedia dalam proyek ini.",
    features: [
    "Kasir penjualan: pilih barang, masukkan jumlah, dan simpan transaksi.",
    "Pencatatan pembayaran: tunai, transfer, QRIS, kartu, serta status belum dibayar; dilengkapi nominal pembayaran dan perhitungan kembalian.",
    "Manajemen barang: nama barang, barcode, kategori, foto, harga beli, dan harga jual.",
    "Pemindaian barcode: mencari atau memasukkan barang menggunakan kamera.",
    "Pengelolaan stok: pencatatan stok awal, penambahan stok, dan pengurangan stok melalui penjualan.",
    "Pemantauan persediaan: pencarian barang dan filter barang yang stoknya habis.",
    "Dashboard usaha: ringkasan penjualan, restok, unit terjual, modal stok awal, dan laba kotor.",
    "Grafik penjualan: pemantauan berdasarkan hari ini, tujuh hari, bulan berjalan, atau rentang tanggal pilihan.",
    "Ringkasan metode pembayaran: melihat penjualan berdasarkan jenis pembayaran.",
    "Riwayat transaksi: pencarian dan penyaringan berdasarkan periode, pembayaran, serta status transaksi.",
    "Koreksi transaksi: mengedit transaksi dan melakukan pembatalan dengan alasan.",
    "Struk transaksi: pratinjau dan pencetakan melalui printer yang didukung.",
    "Ekspor laporan: menyimpan laporan penjualan dan riwayat ke Excel (.xlsx) atau PDF.",
    "Mode owner dan karyawan: PIN terpisah dengan pembatasan menu untuk karyawan.",
    "Backup terenkripsi: mencadangkan akun, barang, foto, serta transaksi dan memulihkannya kembali.",
    "Pemulihan akses: menggunakan kode pemulihan yang dapat disimpan melalui aplikasi email.",
    "Operasional offline: fitur utama tetap tersedia setelah aktivasi."
],
    featureNote: "QRIS, transfer, dan kartu merupakan pencatatan metode pembayaran; integrasi pemrosesan atau verifikasi pembayaran otomatis belum terlihat. Backup ke Google Drive dilakukan melalui pemilih file Android. Angka profit pada dashboard adalah laba kotor, belum memperhitungkan biaya operasional.",
    screenshot: '/images/stpos/screenshot-dashboard1.jpg',
    screenshotIsPlaceholder: false,
    screenshotAlt: 'Dashboard stPOS',
    downloadUrl: 'https://github.com/samatech-01/samatech-app-release/releases/download/stPOSv1-0.35.5/stPOS-0.35.5-release.apk',
    price: 'Rp300.000', priceNote: null,
    requirements: 'Versi minimum Android dan spesifikasi perangkat akan dikonfirmasi.',
  },
  {
    id: 'stfnb', name: 'stFNB', category: 'MAKANAN & MINUMAN', icon: '/images/stfnb/icon.png',
    developer: 'SamaTech', platform: 'Android',
    licenseDescription: 'Pembelian lisensi dilakukan satu kali untuk satu perangkat Android. Setelah pembayaran dikonfirmasi dan aktivasi berhasil, aplikasi dapat digunakan secara offline.',
    paymentType: 'Sekali bayar',
    licenseScope: '1 perangkat Android per pembelian',
    version: '1.0.0', minAndroid: null, fileSize: null, updatedAt: null,
    screenshots: [
      {
            "src": "/images/stfnb/screenshot-akun.png",
            "alt": "stFNB - akun",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stfnb/screenshot-dashboard.jpg",
            "alt": "stFNB - dashboard",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stfnb/screenshot-kasir.jpg",
            "alt": "stFNB - kasir",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stfnb/screenshot-kasir2.jpg",
            "alt": "stFNB - kasir2",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stfnb/screenshot-menu-form.jpg",
            "alt": "stFNB - menu form",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stfnb/screenshot-menu.jpg",
            "alt": "stFNB - menu",
            "width": 1220,
            "height": 2712
      },
      {
            "src": "/images/stfnb/screenshot-pesanan.jpg",
            "alt": "stFNB - pesanan",
            "width": 1220,
            "height": 2712
      }
], changelog: [], licensePrice: null,
    tagline: 'Dirancang untuk langkah usaha kuliner.',
    description: 'Aplikasi kasir untuk usaha makanan dan minuman, ditujukan untuk kafe, restoran, dan usaha kuliner.',
    audience: 'Usaha makanan dan minuman dengan kebutuhan kasir sederhana.',
    aboutTitle: "stFNB — Kelola Pesanan, Sajikan Kebaikan",
    aboutParagraphs: [
    "stFNB adalah aplikasi kasir Android dari SamaTech untuk membantu usaha makanan dan minuman mengelola menu, mencatat pesanan, menerima pencatatan pembayaran, serta memantau penjualan dalam satu aplikasi.",
    "Dengan tampilan yang praktis, stFNB membantu pemilik usaha dan karyawan menjalankan operasional harian lebih tertata. Data transaksi tersimpan di perangkat, sehingga kegiatan kasir dapat berjalan tanpa koneksi internet setelah aktivasi berhasil. Internet diperlukan untuk pendaftaran dan aktivasi aplikasi."
],
    audienceDetails: [
    "Warung makan dan rumah makan.",
    "Kedai kopi, kafe, dan angkringan.",
    "Kedai mi, bakso, soto, dan makanan sejenis.",
    "Gerai minuman, jus, boba, dan es.",
    "Toko roti, kue, serta camilan.",
    "Booth kuliner, kantin, dan usaha makanan rumahan."
],
    audienceNote: "Paling sesuai untuk pencatatan operasional pada satu perangkat. Sinkronisasi transaksi antarperangkat dan pengelolaan banyak cabang belum tersedia.",
    deviceCompatibility: [
    "Smartphone Android: Android 8.0 atau lebih baru.",
    "Tablet Android: Android 8.0 atau lebih baru, dengan navigasi yang menyesuaikan layar lebar.",
    "Mesin kasir berbasis Android: Berpotensi digunakan jika mendukung pemasangan APK dan persyaratan Android aplikasi; kompatibilitas perlu diperiksa per model.",
    "Printer struk Bluetooth: Mendukung printer yang menggunakan koneksi Bluetooth Classic SPP dan perintah cetak ESC/POS.",
    "Printer struk USB: Memerlukan perangkat Android dengan USB Host/OTG dan printer USB yang kompatibel."
],
    deviceNote: "Dukungan printer bergantung pada model dan protokol perangkat. Printer bawaan mesin kasir belum tentu dapat digunakan langsung. Versi khusus iPhone, iPad, Windows, dan macOS belum tersedia.",
    features: [
    "Pengelolaan menu: tambah dan ubah nama menu, kategori, harga modal, harga jual, serta foto dari kamera atau galeri.",
    "Ketersediaan menu: tandai menu tersedia atau habis.",
    "Kasir dan keranjang: pilih menu, atur jumlah, dan hitung total pesanan.",
    "Pesanan belum dibayar: simpan pesanan, ubah isinya, dan catat pembayaran kemudian.",
    "Pencatatan pembayaran: pilihan tunai, transfer, QRIS, dan kartu; pembayaran tunai dilengkapi perhitungan kembalian.",
    "Riwayat pesanan: lihat rincian transaksi dan saring daftar pesanan.",
    "Dashboard usaha: pantau penjualan lunas, jumlah pesanan, porsi terjual, perkiraan laba kotor, grafik penjualan, serta menu terlaris berdasarkan periode.",
    "Cetak struk: cetak dan cetak ulang struk melalui printer Bluetooth atau USB yang kompatibel.",
    "Ekspor laporan: simpan laporan penjualan dan pesanan dalam format Excel atau PDF.",
    "Backup dan pemulihan: cadangkan serta pulihkan data melalui berkas backup.",
    "Akses owner dan karyawan: gunakan PIN terpisah dengan akses karyawan terbatas pada kasir dan pesanan.",
    "Keamanan akun: PIN enam digit, penggantian PIN, dan kode pemulihan.",
    "Profil usaha: kelola nama usaha, nama pemilik, dan email."
],
    featureNote: "Metode QRIS, transfer, dan kartu digunakan untuk mencatat pembayaran. Aplikasi belum memverifikasi pembayaran secara otomatis melalui bank atau penyedia pembayaran. Laba yang ditampilkan adalah laba kotor sebelum biaya operasional.",
    screenshot: '/images/stfnb/screenshot-dashboard.jpg',
    screenshotIsPlaceholder: false,
    screenshotAlt: 'Dashboard stFNB',
    downloadUrl: 'https://github.com/samatech-01/samatech-app-release/releases/download/stFNBv1.1.0.0/stFNB-1.0.0-release.apk',
    price: 'Rp300.000', priceNote: null,
    requirements: 'Versi minimum Android dan spesifikasi perangkat akan dikonfirmasi.',
  },
];

// Ringkasan presentasi detail; alur aktivasi resmi tidak berubah.
export const activationGuide = [
  { title: 'Download & instal', description: 'Unduh APK resmi saat tersedia, lalu instal di perangkat Android.' },
  { title: 'Registrasi di aplikasi', description: 'Daftarkan pengguna dan usaha. Data dikirim oleh APK melalui Google Apps Script ke Google Sheets; lisensi berstatus Pending.' },
  { title: 'Pembayaran & verifikasi', description: 'Ikuti instruksi pembayaran admin. Admin memverifikasi pembayaran dan mengaktifkan lisensi.' },
  { title: 'Mulai menggunakan', description: 'Aplikasi memverifikasi aktivasi dan menuntaskan autentikasi sebelum menu utama terbuka. Koneksi internet diperlukan untuk proses ini.' },
];

// Only direct APK assets from GitHub Releases are accepted; empty values stay unavailable.
export function getDownloadUrl(value) {
  try {
    const url = new URL(value);
    const releaseAsset = /^\/[^/]+\/[^/]+\/releases\/download\/[^/]+\/[^/]+\.apk$/i.test(url.pathname);
    return url.protocol === 'https:' && url.hostname === 'github.com'
      && releaseAsset && !url.port && !url.username && !url.password
      && !url.search && !url.hash ? url.href : null;
  } catch { return null; }
}
