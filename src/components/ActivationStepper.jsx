import { Download, ClipboardList, CreditCard, BadgeCheck, Smartphone } from 'lucide-react';
import { Reveal } from './UI';

const steps = [
  [Download, 'Download', 'Pilih APK resmi saat tersedia, lalu instal di Android.'],
  [ClipboardList, 'Registrasi', 'Daftarkan pengguna dan usaha di aplikasi. Lisensi Pending.'],
  [CreditCard, 'Pembayaran', 'Ikuti instruksi pembayaran dari admin resmi.'],
  [BadgeCheck, 'Aktivasi', 'Admin memverifikasi pembayaran dan mengaktifkan lisensi.'],
  [Smartphone, 'Mulai Menggunakan', 'Aplikasi memverifikasi aktivasi dan menuntaskan autentikasi.'],
];

export default function ActivationStepper() {
  return <ol className="activation-stepper" aria-label="Ringkasan proses aktivasi">{steps.map(([Icon, title, copy], index) => <li key={title}><Reveal delay={index * 0.06}><div className="stepper-node"><Icon size={23} /><span>{String(index + 1).padStart(2, '0')}</span></div><h3>{title}</h3><p>{copy}</p></Reveal></li>)}</ol>;
}
