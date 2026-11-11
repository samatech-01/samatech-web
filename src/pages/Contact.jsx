import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Mail, MapPin, MessageCircle, Phone, Send, ArrowUpRight } from 'lucide-react';
import { site, getWhatsAppUrl } from '../config/site';
import { contactTopics, getContactMessageUrl, getContactEmailUrl } from '../data/contact';
import { Reveal } from '../components/UI';
import './contact.css';

export default function Contact() {
  const whatsapp = getWhatsAppUrl();
  const emailUrl = getContactEmailUrl();
  const [preparedUrl, setPreparedUrl] = useState('');
  const [status, setStatus] = useState('');
  function submitMessage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fields = Object.fromEntries(new FormData(form));
    const url = getContactMessageUrl(fields);
    if (!url) { setStatus('Lengkapi isian dan pastikan kontak admin sudah tersedia.'); return; }
    setPreparedUrl(url);
    setStatus('Pesan WhatsApp sudah disiapkan. Periksa lalu kirim dari WhatsApp; belum ada pesan yang terkirim dari website.');
    try { window.open(url, '_blank', 'noopener,noreferrer'); }
    catch { setStatus('Pesan sudah disiapkan. Gunakan tautan di bawah untuk membuka WhatsApp, lalu periksa dan kirim pesan Anda.'); }
  }
  return <div className="contact-reference container"><nav className="contact-reference-breadcrumb" aria-label="Breadcrumb kontak"><Link to="/">Beranda</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">Hubungi Kami</span></nav>
    <Reveal><header className="contact-reference-heading"><div><Link className="contact-mobile-back" to="/" aria-label="Kembali ke Beranda"><ArrowLeft size={22} /></Link><h1>Hubungi Kami</h1></div><p>Diskusikan aplikasi, aktivasi, atau kebutuhan pengembangan bisnis Anda.</p></header></Reveal>
    <div className="contact-reference-grid"><div className="contact-channel-list"><Reveal><section className="contact-whatsapp-card" aria-labelledby="contact-whatsapp-title"><div className="contact-whatsapp-summary"><span className="contact-channel-icon"><MessageCircle size={34} /></span><div><h2 id="contact-whatsapp-title">WhatsApp Chat</h2><p>Diskusikan kebutuhan Anda</p></div></div>{whatsapp ? <a className="button primary contact-chat-button" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} />Chat melalui WhatsApp<span className="sr-only"> (tab baru)</span></a> : <><button className="button unavailable contact-chat-button" type="button" disabled aria-describedby="contact-chat-note"><MessageCircle size={19} />Chat melalui WhatsApp</button><p className="contact-channel-note" id="contact-chat-note">Kontak WhatsApp admin belum tersedia.</p></>}</section></Reveal>
      <Reveal delay={.03}><section className="contact-reference-channel"><span className="contact-channel-icon"><Phone size={29} /></span><div><h2>Telepon</h2><a href={`tel:${site.phoneNumber}`}>{site.phoneDisplay}</a></div></section></Reveal>
      <Reveal delay={.06}><section className="contact-reference-channel"><span className="contact-channel-icon"><Mail size={29} /></span><div><h2>Email Support</h2>{emailUrl ? <a href={emailUrl}>{site.email}</a> : <p>Alamat email belum tersedia.</p>}</div></section></Reveal>
      <Reveal delay={.09}><section className="contact-reference-channel"><span className="contact-channel-icon"><MapPin size={29} /></span><div><h2>Kantor / Lokasi</h2><p>{site.officeAddress}</p></div></section></Reveal>
    </div><Reveal className="contact-form-card"><form className="contact-message-form" onSubmit={submitMessage} onChange={() => { setPreparedUrl(''); setStatus(''); }} aria-label="Formulir pesan WhatsApp"><div className="contact-field"><label htmlFor="contact-full-name">Nama Lengkap</label><input id="contact-full-name" name="name" autoComplete="name" placeholder="Nama Anda" required maxLength={100} /></div><div className="contact-field"><label htmlFor="contact-reply">Email / No. WhatsApp</label><input id="contact-reply" name="contact" autoComplete="off" placeholder="Email atau nomor WhatsApp" required maxLength={120} /></div><div className="contact-field"><label htmlFor="contact-topic">Kategori Kebutuhan</label><select id="contact-topic" name="category" defaultValue="" required><option value="" disabled>Aplikasi Siap Pakai / Jasa Custom</option>{contactTopics.map(topic => <option value={topic.id} key={topic.id}>{topic.label}</option>)}</select></div><div className="contact-field"><label htmlFor="contact-message">Pesan Anda</label><textarea id="contact-message" name="message" placeholder="Ceritakan kebutuhan Anda" rows={5} required maxLength={2000} aria-describedby="contact-form-notice" /></div><p id="contact-form-notice" className="contact-form-notice">Isian diteruskan ke WhatsApp untuk Anda periksa dan kirim. Website tidak menyimpan pesan.</p><button type="submit" className={`button ${whatsapp ? 'primary' : 'unavailable'} contact-submit-button`} disabled={!whatsapp} aria-describedby={!whatsapp ? 'contact-form-disabled-note' : 'contact-form-notice'}><Send size={17} />Lanjut ke WhatsApp</button>{!whatsapp && <p id="contact-form-disabled-note" className="contact-form-notice">Pengiriman belum tersedia sampai kontak WhatsApp admin dikonfigurasi.</p>}<div className="contact-message-result" role="status">{status}</div>{preparedUrl && <a className="text-link contact-prepared-link" href={preparedUrl} target="_blank" rel="noopener noreferrer">Buka pesan di WhatsApp <ArrowUpRight size={16} /></a>}</form></Reveal></div>
  </div>;
}
