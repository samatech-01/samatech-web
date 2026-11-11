import { Link } from 'react-router-dom';
export default function NotFound() { return <section className="container section not-found"><span className="eyebrow">404 · HALAMAN TIDAK DITEMUKAN</span><h1>Mari kembali ke jalur yang tepat.</h1><p>Halaman atau produk yang Anda cari belum tersedia.</p><Link className="button primary" to="/">Kembali ke Beranda</Link></section>; }
