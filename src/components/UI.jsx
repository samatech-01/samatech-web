import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Download, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { getDownloadUrl } from '../data/products';
import { getLicensePrice } from '../data/productPresentation';
import { getWhatsAppUrl } from '../config/site';

export function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: reduced ? 0 : 0.24, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
export function Brand() {
  return <Link className="brand" to="/" aria-label="SamaTech, Beranda"><img className="brand-logo" src="/images/samatech/logo-96.png" srcSet="/images/samatech/logo-96.png 1x, /images/samatech/logo-192.png 2x" width="36" height="36" alt="Logo SamaTech" decoding="async" /><span>Sama<span className="brand-accent">Tech</span></span></Link>;
}
export function DownloadButton({ product, label = 'Download APK' }) {
  const url = getDownloadUrl(product.downloadUrl);
  return url ? <a className="button primary" href={url} target="_blank" rel="noopener noreferrer"><Download size={17} /> {label}<span className="sr-only"> {product.name} (GitHub Releases, tab baru)</span></a>
    : <button className="button unavailable" disabled><Download size={17} /> Segera Tersedia<span className="sr-only"> — APK {product.name}</span></button>;
}
export function ContactButton({ className = 'button primary', children = 'Hubungi Admin' }) {
  const url = getWhatsAppUrl();
  return url ? <a className={className} href={url} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />{children}</a>
    : <span className="contact-unavailable">Kontak resmi segera tersedia</span>;
}
export function ProductIcon({ product, size = 26 }) {
  return <span className={`product-icon ${product.id}`}><img src={product.icon} alt={`Ikon ${product.name}`} width="512" height="512" decoding="async" /></span>;
}
export function ProductCard({ product, delay = 0 }) {
  const price = getLicensePrice(product);
  return <Reveal className="product-card-reveal" delay={delay}><article className="product-card"><div className="product-card-identity"><ProductIcon product={product} size={33} /><div><h3>{product.name}</h3><span className="product-category">{product.category}</span></div></div><p>{product.description}</p><div className="product-license-status"><span>Lisensi</span><strong>{price || 'Harga belum diumumkan'}</strong><small>{product.paymentType} · {product.licenseScope}</small></div><div className="product-actions"><Link className="button secondary" to={`/produk/${product.id}`}>Detail <ArrowUpRight size={16} /><span className="sr-only"> {product.name}</span></Link><DownloadButton product={product} /></div></article></Reveal>;
}
export function PageHeading({ eyebrow, title, children }) {
  return <div className="page-heading"><Reveal className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{children && <p>{children}</p>}</Reveal></div>;
}
export function ActivationCTA() {
  return <section className="container cta-section"><Reveal><div className="activation-cta"><div className="cta-orbit" aria-hidden="true" /><div className="cta-copy"><span className="eyebrow">LANGKAH KECIL. AWAL YANG BERARTI.</span><h2>Siap untuk langkah<br />usaha berikutnya?</h2><p>Kenali proses registrasi, pembayaran, dan aktivasi lisensi aplikasi Anda.</p></div><Link className="button white" to="/aktivasi">Panduan aktivasi <ArrowRight size={18} /></Link></div></Reveal></section>;
}
