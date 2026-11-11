import { Plus } from 'lucide-react';
import { services, serviceOrderSteps, serviceFaqs } from '../data/services';
import { ServiceCard, ConsultationButton } from '../components/ServicesUI';
import { Reveal } from '../components/UI';

export default function Services() {
  return <div className="custom-services-page container"><Reveal><header className="services-hero"><span className="eyebrow">JASA CUSTOM SAMATECH</span><h1>Aplikasi yang mengikuti<br />kebutuhan bisnis Anda.</h1><p>Mulai dari proses kerja yang ingin Anda sederhanakan. Kita bahas solusi, fitur, dan cakupan proyek yang sesuai.</p><ConsultationButton /><span className="services-scope-note">Biaya dan jadwal dibahas berdasarkan kebutuhan proyek.</span></header></Reveal>
    <section className="services-section" aria-labelledby="services-list-title"><div className="section-heading"><div><h2 id="services-list-title">Pilih jenis layanan</h2><p>Empat pilihan untuk mendukung langkah digital usaha Anda.</p></div></div><div className="services-cards-grid">{services.map((service, index) => <ServiceCard service={service} index={index} key={service.id} />)}</div></section>
    <section className="services-section" aria-labelledby="services-process-title"><Reveal className="section-heading"><div><h2 id="services-process-title">Alur pengerjaan proyek</h2><p>Dimulai dari konsultasi, dilanjutkan dengan kesepakatan yang jelas.</p></div></Reveal><ol className="services-process">{serviceOrderSteps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></section>
    <section className="services-section services-faq-section" aria-labelledby="services-faq-title"><div><span className="eyebrow">PERTANYAAN UMUM</span><h2 id="services-faq-title">Sebelum memulai proyek.</h2><p>Kenali hal yang perlu dibahas dalam konsultasi awal.</p></div><div className="services-faq">{serviceFaqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18} /></summary><p>{answer}</p></details>)}</div></section>
    <Reveal><div className="services-consultation-panel"><div><h2>Mari bahas kebutuhan Anda.</h2><p>Ceritakan gambaran proyek Anda untuk memulai pembahasan.</p></div><ConsultationButton /></div></Reveal>
  </div>;
}
