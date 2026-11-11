import { Link } from 'react-router-dom';
import { ArrowUpRight, Info } from 'lucide-react';
import { PageHeading, ContactButton } from '../components/UI';
const steps = [
 ['Buka website SamaTech', 'Kenali aplikasi dan informasi resminya melalui website ini.'],
 ['Pilih aplikasi', 'Pilih stPOS atau stFNB sesuai dengan bidang usaha Anda.'],
 ['Download APK gratis', 'Unduh file APK melalui GitHub Releases resmi saat tersedia.'],
 ['Instal di perangkat Android', 'Buka APK resmi dan ikuti petunjuk instalasi Android. Izinkan instalasi dari sumber tersebut hanya jika Anda mempercayainya.'],
 ['Registrasi pengguna dan usaha', 'Lengkapi pendaftaran di aplikasi Android. Tidak ada formulir registrasi di website.'],
 ['Data pendaftaran dikirim', 'APK mengirim data melalui Google Apps Script ke Google Sheets. Pastikan koneksi internet tersedia.'],
 ['Lisensi berstatus Pending', 'Pendaftaran belum berarti lisensi sudah aktif. Tunggu instruksi pembayaran dari admin.'],
 ['Lakukan pembayaran', 'Ikuti instruksi admin resmi. Website tidak menyediakan pembayaran online.'],
 ['Admin memverifikasi dan mengaktifkan', 'Admin memeriksa pembayaran, kemudian mengaktifkan lisensi.'],
 ['Verifikasi aktivasi di aplikasi', 'Aplikasi memverifikasi aktivasi dan menyelesaikan autentikasi sebelum membuka menu utama. Pastikan perangkat terhubung ke internet.'],
];
export default function Activation() {
 return <><PageHeading eyebrow="PANDUAN AKTIVASI" title="Dari download hingga aktif.">Ikuti alur resmi SamaTech. Pendaftaran dilakukan di aplikasi, sedangkan aktivasi lisensi dibantu oleh admin.</PageHeading><section className="container section activation-layout"><aside><div className="sticky-aside"><span className="eyebrow">SEBELUM MEMULAI</span><h2>Download gratis.<br />Lisensi diaktifkan admin.</h2><p>Siapkan perangkat Android dan koneksi internet untuk pendaftaran serta verifikasi aktivasi.</p><Link className="text-link" to="/produk">Pilih aplikasi <ArrowUpRight size={17} /></Link><div className="info-note"><Info size={21} /><p>Website ini hanya menyajikan informasi dan tautan download. Tidak terhubung ke sistem aktivasi.</p></div><ContactButton /></div></aside><ol className="activation-list">{steps.map(([title,copy],i) => <li key={title}><span className="number">{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{copy}</p>{i===6 && <span className="pending-status">Pending · Menunggu aktivasi</span>}</div></li>)}</ol></section></>;
}
