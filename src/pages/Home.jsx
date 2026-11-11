import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, WifiOff, ShieldCheck, Store, Utensils, Download } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard, ProductIcon, Reveal } from '../components/UI';
import { ServicesBanner } from '../components/ServicesUI';

export default function Home() {
  return <div className="store-home container">
    <Reveal><section className="store-hero"><div className="store-hero-copy"><span className="eyebrow">SAMATECH · APLIKASI BISNIS</span><h1>Solusi Aplikasi<br />Bisnis Anda</h1><p>Dari toko retail hingga usaha kuliner. Temukan aplikasi Android yang sesuai untuk langkah usaha Anda.</p><Link className="button primary" to="/produk">Jelajahi Aplikasi <ArrowRight size={17} /></Link><span className="store-hero-note"><Download size={15} /> Download APK gratis · Lisensi terpisah</span></div><div className="store-hero-art" aria-label="Pilihan aplikasi SamaTech"><div className="store-art-window"><div className="store-art-title"><span /><span /><span /><strong>SamaTech Apps</strong></div><div className="store-art-apps">{products.slice(0, 2).map(product => <Link to={`/produk/${product.id}`} className="store-art-app" key={product.id}><ProductIcon product={product} size={37} /><strong>{product.name}</strong><span>{product.category}</span><span className="store-art-platform"><Smartphone size={12} />Android</span></Link>)}</div></div></div></section></Reveal>
    <section className="store-popular"><Reveal className="section-heading"><div><h2>Aplikasi populer</h2><p>Kenali pilihan aplikasi SamaTech untuk usaha Anda.</p></div><Link className="text-link" to="/produk">Lihat semua <ArrowRight size={16} /></Link></Reveal><div className="products-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} delay={index * .04} />)}</div><p className="store-editorial-note">Pilihan katalog SamaTech · Bukan peringkat berdasarkan jumlah download.</p></section>
    <ServicesBanner />
    <section className="store-benefits"><Reveal className="section-heading"><div><h2>Teknologi untuk langkah usaha Anda</h2><p>Aplikasi yang sesuai, dengan proses aktivasi yang jelas.</p></div></Reveal><div className="store-benefits-grid">{[
      [WifiOff, 'Tetap berjalan secara offline', 'stPOS mendukung kasir dan stok offline. Registrasi dan verifikasi aktivasi memerlukan koneksi internet.'],
      [Store, 'Untuk usaha dagang', 'stPOS ditujukan untuk toko, retail, dan usaha dagang.'],
      [Utensils, 'Untuk usaha kuliner', 'stFNB adalah aplikasi kasir untuk kafe, restoran, dan usaha makanan serta minuman.'],
      [ShieldCheck, 'Aktivasi dibantu admin', 'Registrasi di APK, ikuti instruksi pembayaran, lalu tunggu verifikasi dan aktivasi lisensi dari admin.'],
    ].map(([Icon, title, copy], index) => <Reveal key={title} delay={index % 2 * .04}><article><Icon size={25} /><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div></section>
    <Reveal><div className="store-activation-banner"><div><span className="eyebrow">BARU PERTAMA KALI?</span><h2>Download gratis. Aktivasi dengan jelas.</h2><p>Pelajari registrasi, pembayaran, dan persetujuan admin sebelum mulai menggunakan aplikasi.</p></div><Link className="button secondary" to="/aktivasi">Cara Aktivasi <ArrowRight size={16} /></Link></div></Reveal>
  </div>;
}
