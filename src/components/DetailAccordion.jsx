import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function DetailAccordion({ title, children }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setOpen(!media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return <details className="app-detail-accordion" open={open} onToggle={event => setOpen(event.currentTarget.open)}><summary><h2>{title}</h2><ChevronDown size={19} /></summary><div className="app-accordion-body">{children}</div></details>;
}
