import { useId } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Monitor, Workflow, Globe, MessageCircle, ArrowUpRight, ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import { getServiceWhatsAppUrl } from '../data/serviceContact';
import { Reveal } from './UI';
import '../styles/services.css';

const icons = { smartphone: Smartphone, monitor: Monitor, workflow: Workflow, globe: Globe };
export function ServiceIcon({ service, size = 27 }) {
  const Icon = icons[service.icon] || Monitor;
  return <span className="service-icon"><Icon size={size} aria-hidden="true" /></span>;
}
export function ConsultationButton({ service, children = 'Konsultasi Proyek' }) {
  const noteId = useId();
  const url = getServiceWhatsAppUrl(service?.whatsappMessage);
  return <div className="service-consultation">{url ? <a className="button primary" href={url} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />{children}<span className="sr-only"> melalui WhatsApp (tab baru)</span></a> : <><button type="button" className="button unavailable" disabled aria-describedby={noteId}><MessageCircle size={17} />{children}</button><p id={noteId} className="service-contact-note">Kontak WhatsApp admin belum tersedia.</p></>}</div>;
}
export function ServiceCard({ service, index = 0 }) {
  return <Reveal delay={index % 2 * .04}><Link className="service-card" to={`/jasa-custom/${service.slug}`}><ServiceIcon service={service} /><h3>{service.title}</h3><p>{service.shortDescription}</p><span className="service-card-link">Lihat detail layanan <ArrowUpRight size={16} /></span></Link></Reveal>;
}
export function ServicesBanner() {
  return <section className="services-home-section" aria-labelledby="services-banner-title"><Reveal><div className="services-banner"><div className="services-banner-copy"><span className="eyebrow">DIBUAT SESUAI KEBUTUHAN ANDA</span><h2 id="services-banner-title">Jasa Pembuatan<br />Aplikasi</h2><p>Wujudkan kebutuhan bisnis Anda melalui aplikasi Android, aplikasi web, AppSheet, atau website.</p></div><div className="services-banner-types">{services.map(service => <Link to={`/jasa-custom/${service.slug}`} key={service.id}><ServiceIcon service={service} size={25} /><span>{service.title}</span></Link>)}</div><div className="services-banner-actions"><ConsultationButton /><Link className="text-link" to="/jasa-custom">Jelajahi layanan <ArrowRight size={16} /></Link></div></div></Reveal></section>;
}
