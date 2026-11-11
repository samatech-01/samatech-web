import { ArrowUpRight, Smartphone, Check, WifiOff } from 'lucide-react';
import { products } from '../data/products';

function PhoneMockup({ product, index }) {
  return <div className={`showcase-phone phone-position-${index}`}>
    <div className="showcase-phone-screen">
      <div className="showcase-island" aria-hidden="true" />
      {!product.screenshotIsPlaceholder ? <img className="official-hero-screen" src={product.screenshot} alt={product.screenshotAlt} width={product.screenshots?.[0]?.width} height={product.screenshots?.[0]?.height} /> : <>
        <div className="mock-status" aria-hidden="true"><span>9:41</span><span>••• ▰</span></div>
        <div className="mock-brand">Sama<span>Tech.</span><span className="mock-avatar">st</span></div>
        <div className={`mock-app-icon ${product.id}`}><img src={product.icon} alt={`Ikon ${product.name}`} width="29" height="29" /></div>
        <strong className="mock-app-name">{product.name}</strong>
        <span className="mock-category">{product.category}</span>
        <div className="mock-panel"><span className="mock-panel-heading">Untuk usaha Anda <ArrowUpRight size={14} /></span><div className="mock-abstract" aria-hidden="true"><i /><i /><i /><i /><i /></div></div>
        <div className="mock-feature">{product.features.slice(0, 2).map(feature => <span key={feature}><Check size={12} />{feature}</span>)}</div>
        <span className="mock-placeholder">ILUSTRASI · BUKAN SCREENSHOT</span>
      </>}
      <span className="mock-home" aria-hidden="true" />
    </div>
  </div>;
}

export default function HeroShowcase() {
  const featured = ['stpos', 'stfnb'].map(id => products.find(product => product.id === id)).filter(Boolean);
  return <div className="showcase-scene">
    <div className="showcase-halo" aria-hidden="true" />
    <div className="showcase-ring ring-outer" aria-hidden="true" /><div className="showcase-ring ring-inner" aria-hidden="true" />
    <div className="showcase-particles" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    <div className="showcase-badge"><span className="badge-icon"><Smartphone size={18} /></span><div>Aplikasi usaha Anda<strong>Dalam genggaman.</strong></div></div>
    <div className="showcase-float">{featured.map((product, index) => <PhoneMockup product={product} index={index} key={product.id} />)}</div>
    <div className="showcase-offline"><span><WifiOff size={17} /></span><div>stPOS<strong>Kasir & stok offline</strong></div><span className="tiny-check"><Check size={12} /></span></div>
    <div className="showcase-caption"><span />Screenshot aplikasi stPOS dan stFNB.</div>
  </div>;
}
