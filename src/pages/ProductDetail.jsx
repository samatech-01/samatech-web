import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, MessageCircle, Smartphone } from 'lucide-react';
import { products, activationGuide } from '../data/products';
import { getLicensePrice, getScreenshots, getTechnicalInfo } from '../data/productPresentation';
import { getWhatsAppUrl } from '../config/site';
import { DownloadButton, ProductIcon, Reveal } from '../components/UI';
import ScreenshotGallery from '../components/ScreenshotGallery';
import DetailAccordion from '../components/DetailAccordion';
import ShareApp from '../components/ShareApp';
import NotFound from './NotFound';
import './product-detail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(item => item.id === id);
  if (!product) return <NotFound />;
  const price = getLicensePrice(product);
  const whatsapp = getWhatsAppUrl();
  return <div className="app-marketplace" key={product.id}>
    <div className="container app-reference-container">
      <div className="app-reference-toolbar"><Link to="/produk" className="app-back" aria-label="Kembali ke aplikasi"><ArrowLeft size={24} /><span className="app-back-desktop">{product.name}</span><span className="app-back-mobile">Kembali</span></Link><ShareApp product={product} /></div>
      <Reveal><header className="app-header-card"><div className="app-summary"><ProductIcon product={product} size={61} /><div className="app-summary-copy"><h1>{product.name}</h1>{product.developer && <p className="app-developer">{product.developer}</p>}<nav className="app-breadcrumb" aria-label="Breadcrumb"><ol><li><Link to="/">Beranda</Link></li><li><ChevronRight size={14} aria-hidden="true" /><Link to="/produk">Aplikasi</Link></li><li><ChevronRight size={14} aria-hidden="true" /><span>{product.category}</span></li><li><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">{product.name}</span></li></ol></nav><div className="app-mobile-category">{product.category}</div>{price != null && price !== '' && <div className="app-header-pricing"><strong>{price}</strong><span>{product.paymentType} · {product.licenseScope}</span></div>}<div className="app-header-actions"><DownloadButton product={product} /><Link className="button secondary" to="/aktivasi">Lihat Cara Aktivasi</Link></div></div>{product.platform && <span className="app-platform"><Smartphone size={15} />{product.platform}</span>}</div></header></Reveal>
      <div className="app-reference-grid">
        <div className="app-main-column"><Reveal><ScreenshotGallery screenshots={getScreenshots(product)} name={product.name} /></Reveal><Reveal className="app-about-card"><h2>Tentang Aplikasi Ini</h2>{product.aboutTitle && <div className="app-about-block"><h3>{product.aboutTitle}</h3></div>}{(product.aboutParagraphs || [product.description]).map(paragraph => <p key={paragraph}>{paragraph}</p>)}{product.audience && <div className="app-about-block"><h3>Untuk usaha Anda</h3><p>{product.audience}</p>{product.audienceDetails?.map(item => <p key={item}>{item}</p>)}{product.audienceNote && <p>{product.audienceNote}</p>}</div>}{(product.deviceCompatibility?.length || product.requirements) && <div className="app-about-block"><h3>Kebutuhan perangkat</h3>{product.deviceCompatibility?.length ? <>{product.deviceCompatibility.map(item => <p key={item}>{item}</p>)}{product.deviceNote && <p>{product.deviceNote}</p>}</> : <p>{product.requirements}</p>}</div>}</Reveal>{product.changelog?.length > 0 && <Reveal className="app-about-card"><h2>Yang Baru</h2><ul className="app-changelog">{product.changelog.map((change, index) => <li key={index}>{change}</li>)}</ul></Reveal>}</div>
        <aside className="app-acquisition" aria-label="Spesifikasi dan lisensi">
          <div className="app-reference-card"><DetailAccordion title="Spesifikasi Teknis"><span className="sr-only">Informasi teknis</span><dl className="app-technical">{getTechnicalInfo(product).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></DetailAccordion></div>
          <div className="app-reference-card"><DetailAccordion title="Fitur Aplikasi"><ul className="app-features">{product.features.map(feature => <li key={feature}><span className="app-feature-check"><Check size={14} /></span><span>{feature}</span></li>)}</ul>{product.featureNote && <p className="app-license-note">{product.featureNote}</p>}</DetailAccordion></div>
          <div className="app-reference-card"><DetailAccordion title="Ketentuan Lisensi">{price != null && price !== '' && <div className="app-license-pricing"><strong className="app-license-price">{price}</strong><span>{product.paymentType}</span><span>{product.licenseScope}</span></div>}{product.licenseDescription && <p className="app-license-description">{product.licenseDescription}</p>}{product.priceNote && <p className="app-license-note">{product.priceNote}</p>}<Link className="text-link" to="/aktivasi">Panduan aktivasi <ArrowUpRight size={15} /></Link></DetailAccordion></div>
          <div className="app-reference-card app-mobile-activation"><DetailAccordion title="Cara Aktivasi"><ol className="app-activation-guide">{activationGuide.map((step, index) => <li key={step.title}><span>{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol><Link className="text-link" to="/aktivasi">Lihat panduan lengkap <ArrowUpRight size={15} /></Link></DetailAccordion></div>
          {whatsapp && <a className="app-whatsapp-help" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={25} /><span>Bantuan WhatsApp</span><ArrowUpRight size={17} /></a>}
        </aside>
      </div>
    </div>
    <div className="app-download-bar" aria-label={`Download ${product.name}`}><div><strong>{product.name}</strong><span>{price || 'Aktivasi Berbayar'}{price ? ` · ${product.paymentType}` : ''}</span></div><DownloadButton product={product} /></div>
  </div>;
}
