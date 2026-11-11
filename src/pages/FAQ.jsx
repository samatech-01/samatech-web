import { Plus } from 'lucide-react';
import { faqs } from '../data/faqs';
import { Link } from 'react-router-dom';
import { PageHeading } from '../components/UI';
export default function FAQ() {
 return <><PageHeading eyebrow="PUSAT INFORMASI" title="Ada yang ingin ditanyakan?">Jawaban untuk pertanyaan seputar aplikasi, download, dan aktivasi SamaTech.</PageHeading><section className="container section faq-layout"><div><span className="eyebrow">PERTANYAAN UMUM</span><h2>Kami bantu<br />Anda memahami.</h2><p>Belum menemukan jawaban?</p><Link className="text-link" to="/kontak">Lihat kontak SamaTech →</Link></div><div className="faq-list">{faqs.map(([question,answer]) => <details key={question}><summary>{question}<Plus size={20} /></summary><p>{answer}</p></details>)}</div></section></>;
}
