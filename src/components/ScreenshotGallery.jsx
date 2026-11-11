import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, X, Image } from 'lucide-react';

function ScreenshotLightbox({ screenshots, index, onChange, onClose, trigger }) {
  const dialog = useRef(null);
  const image = screenshots[index];
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [trigger]);
  const navigate = direction => onChange((index + direction + screenshots.length) % screenshots.length);
  return createPortal(<dialog ref={dialog} className="screenshot-dialog" aria-labelledby="screenshot-dialog-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={event => {
    if (screenshots.length < 2 || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); navigate(event.key === 'ArrowRight' ? 1 : -1); }
  }}>
    <div className="lightbox-shell"><header className="lightbox-heading"><div><h2 id="screenshot-dialog-title">{image.isPlaceholder ? 'Preview ilustrasi' : 'Screenshot aplikasi'}</h2><p aria-live="polite">{index + 1} / {screenshots.length}</p></div><button type="button" className="gallery-control lightbox-close" onClick={onClose} aria-label="Tutup screenshot" autoFocus><X size={23} /></button></header>
      <div className="lightbox-image"><img src={image.src} alt={image.alt} width={image.width || 640} height={image.height || 440} /></div>
      <footer className="lightbox-footer"><button type="button" className="gallery-control" disabled={screenshots.length < 2} onClick={() => navigate(-1)} aria-label="Screenshot sebelumnya"><ChevronLeft size={22} /></button><p>{image.isPlaceholder ? 'Placeholder · Bukan tampilan aplikasi final' : image.alt}<span>Escape untuk menutup{screenshots.length > 1 ? ' · ← → untuk berpindah' : ''}</span></p><button type="button" className="gallery-control" disabled={screenshots.length < 2} onClick={() => navigate(1)} aria-label="Screenshot berikutnya"><ChevronRight size={22} /></button></footer>
    </div>
  </dialog>, document.body);
}

export default function ScreenshotGallery({ screenshots, name }) {
  const rail = useRef(null);
  const trigger = useRef(null);
  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState(null);
  const reduced = useReducedMotion();
  const trackId = useId();
  const goTo = index => {
    const slide = rail.current?.children[index];
    if (slide) rail.current.scrollTo({ left: slide.offsetLeft, behavior: reduced ? 'instant' : 'smooth' });
  };
  const navigate = direction => goTo(Math.max(0, Math.min(screenshots.length - 1, current + direction)));
  const updateCurrent = () => {
    const element = rail.current;
    if (!element) return;
    if (element.scrollLeft + element.clientWidth >= element.scrollWidth - 2) {
      setCurrent(screenshots.length - 1);
      return;
    }
    let nearest = 0;
    let distance = Infinity;
    Array.from(element.children).forEach((child, index) => {
      const delta = Math.abs(child.offsetLeft - element.scrollLeft);
      if (delta < distance) { nearest = index; distance = delta; }
    });
    setCurrent(nearest);
  };
  return <section className="app-gallery" aria-labelledby="app-gallery-title">
    <div className="app-section-title"><h2 id="app-gallery-title">Tampilan aplikasi</h2></div>
    {screenshots.length ? <><div className="app-gallery-frame"><div id={trackId} ref={rail} className="screenshot-track" onScroll={updateCurrent} aria-label={`Galeri screenshot ${name}`}>
      {screenshots.map((image, index) => <button type="button" key={`${image.src}-${index}`} className={`screenshot-slide${image.isPlaceholder ? ' is-placeholder' : ''}`} style={{ '--screenshot-ratio': `${image.width || 640} / ${image.height || 440}` }} aria-label={`Perbesar ${image.isPlaceholder ? 'ilustrasi' : 'screenshot'} ${name}, ${index + 1} dari ${screenshots.length}`} onClick={event => { trigger.current = event.currentTarget; setActive(index); }}><img src={image.src} alt={image.alt} loading="lazy" width={image.width || 640} height={image.height || 440} /><span className="screenshot-expand"><Expand size={16} /><span>Perbesar</span></span>{image.isPlaceholder && <span className="screenshot-placeholder-label">Placeholder ? Screenshot resmi menyusul</span>}</button>)}
    </div>{screenshots.length > 1 && <div className="gallery-controls"><button type="button" className="gallery-control" onClick={() => navigate(-1)} disabled={current === 0} aria-label="Geser screenshot sebelumnya" aria-controls={trackId}><ChevronLeft size={20} /></button><button type="button" className="gallery-control" onClick={() => navigate(1)} disabled={current === screenshots.length - 1} aria-label="Geser screenshot berikutnya" aria-controls={trackId}><ChevronRight size={20} /></button></div>}</div><div className="gallery-pagination" role="group" aria-label="Pilih screenshot">{screenshots.map((image, index) => <button type="button" className="gallery-dot" key={`${image.src}-${index}`} aria-label={`Screenshot ${index + 1}`} aria-current={current === index ? 'true' : undefined} aria-controls={trackId} onClick={() => goTo(index)} />)}</div><div className="gallery-caption"><p>{screenshots.some(image => image.isPlaceholder) ? 'Visual placeholder. Bukan tampilan aplikasi final.' : 'Pilih screenshot untuk melihat gambar secara utuh.'}</p><span aria-live="polite">{current + 1} / {screenshots.length}</span></div></> : <div className="gallery-empty"><Image size={32} /><p>Screenshot resmi belum tersedia.</p></div>}
    {active !== null && <ScreenshotLightbox screenshots={screenshots} index={active} onChange={setActive} onClose={() => setActive(null)} trigger={trigger.current} />}
  </section>;
}
