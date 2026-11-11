import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, ChevronRight, ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import { ServiceIcon, ConsultationButton } from '../components/ServicesUI';
import { Reveal } from '../components/UI';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find(item => item.slug === slug);
  if (!service) return <NotFound />;
  return <div className="custom-services-page service-detail-page container" key={service.id}><nav className="service-breadcrumb" aria-label="Breadcrumb layanan"><Link to="/jasa-custom"><ArrowLeft size={16} />Jasa Custom</Link><ChevronRight size={14} /><span aria-current="page">{service.title}</span></nav>
    <Reveal><header className="service-detail-header"><ServiceIcon service={service} size={36} /><div><span className="eyebrow">LAYANAN PENGEMBANGAN SAMATECH</span><h1>{service.title}</h1><p>{service.shortDescription}</p></div></header></Reveal>
    <div className="service-detail-grid"><div><Reveal className="service-detail-card"><h2>Tentang layanan</h2><p>{service.description}</p></Reveal><Reveal className="service-detail-card"><h2>Contoh kebutuhan proyek</h2><p>Contoh cakupan untuk dibahas sesuai kebutuhan Anda.</p><ul className="service-examples">{service.examples.map(example => <li key={example}><Check size={17} /><span>{example}</span></li>)}</ul><p className="service-detail-note">Fitur dan hasil akhir ditentukan dalam ruang lingkup proyek, bukan paket fitur yang otomatis termasuk.</p></Reveal></div><aside className="service-detail-card service-consultation-card"><span className="eyebrow">MULAI DARI KONSULTASI</span><h2>Bahas proyek Anda.</h2><p>Biaya, jadwal, dan ketentuan pengerjaan disesuaikan dengan kebutuhan proyek.</p><ConsultationButton service={service} /><Link className="text-link" to="/jasa-custom">Lihat alur & FAQ layanan <ArrowUpRight size={15} /></Link></aside></div>
    <section className="services-section"><div className="section-heading"><h2>Layanan lainnya</h2></div><div className="services-related">{services.filter(item => item.id !== service.id).map(item => <Link key={item.id} to={`/jasa-custom/${item.slug}`}><ServiceIcon service={item} size={22} /><span>{item.title}</span><ArrowUpRight size={16} /></Link>)}</div></section>
  </div>;
}
