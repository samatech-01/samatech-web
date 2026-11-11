import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { site } from '../config/site';

export default function ShareApp({ product }) {
  const [message, setMessage] = useState('');
  const [manual, setManual] = useState(false);
  const url = `https://${site.domain}/#/produk/${product.id}`;
  async function share() {
    try {
      if (navigator.share) { await navigator.share({ title: `${product.name} — SamaTech`, url }); return; }
      if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); setMessage('Tautan disalin.'); return; }
    } catch (error) { if (error.name === 'AbortError') return; }
    setManual(true);
    setMessage('Salin tautan aplikasi di bawah.');
  }
  return <div className="app-share"><button type="button" className="gallery-control" onClick={share} aria-label={`Bagikan ${product.name}`}><Share2 size={19} /></button><span role="status">{message}</span>{manual && <label className="app-share-fallback">Tautan aplikasi<input readOnly value={url} onFocus={event => event.target.select()} /></label>}</div>;
}
