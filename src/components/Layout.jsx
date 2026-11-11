import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid2X2, BadgeCheck, MessageCircle, Search, X, HelpCircle, ArrowUpRight, Code2 } from 'lucide-react';
import { Brand } from './UI';
import { getWhatsAppUrl, site } from '../config/site';
import { getContactEmailUrl } from '../data/contact';
import { products } from '../data/products';
import { services } from '../data/services';

const links = [
  { path: '/', label: 'Beranda', mobile: 'Beranda', icon: Home },
  { path: '/produk', label: 'Aplikasi', mobile: 'Aplikasi', icon: Grid2X2 },
  { path: '/aktivasi', label: 'Cara Aktivasi', mobile: 'Aktivasi', icon: BadgeCheck },
  { path: '/kontak', label: 'Kontak', mobile: 'Kontak', icon: MessageCircle },
];
const sidebarLinks = links.map(link => link.path === '/aktivasi'
  ? { path: '/jasa-custom', label: 'Jasa Custom', icon: Code2 }
  : link);
export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(location.pathname);
  const [query, setQuery] = useState(new URLSearchParams(location.search).get('q') || '');
  const product = products.find(item => location.pathname === `/produk/${item.id}`);
  const service = services.find(item => location.pathname === `/jasa-custom/${item.slug}`);
  const title = product?.name || service?.title || ({ '/': 'Beranda', '/produk': 'Aplikasi', '/aktivasi': 'Cara Aktivasi', '/kontak': 'Kontak', '/faq': 'Bantuan & FAQ', '/jasa-custom': 'Jasa Custom' }[location.pathname] || 'SamaTech');
  useEffect(() => { setQuery(new URLSearchParams(location.search).get('q') || ''); }, [location.pathname, location.search]);
  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      document.getElementById('main-content')?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);
  const whatsapp = getWhatsAppUrl();
  const emailUrl = getContactEmailUrl();
  const updateCatalogueQuery = value => {
    setQuery(value);
    if (location.pathname !== '/produk') return;
    const params = new URLSearchParams(location.search);
    if (value) params.set('q', value); else params.delete('q');
    navigate({ pathname: '/produk', search: params.toString() ? `?${params}` : '' }, { replace: true, preventScrollReset: true });
  };
  const search = event => {
    event.preventDefault();
    if (location.pathname === '/produk') { updateCatalogueQuery(query.trim()); return; }
    const value = query.trim();
    navigate(value ? `/produk?q=${encodeURIComponent(value)}` : '/produk');
  };
  return <div className="store-shell"><a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Lewati ke konten</a>
    <aside className="store-sidebar"><Brand /><span className="sidebar-caption">APLIKASI UNTUK USAHA ANDA</span><nav aria-label="Navigasi utama">{sidebarLinks.map(({ path, label, icon: Icon }) => <NavLink key={path} to={path} end={path === '/'}><Icon size={20} /><span>{label}</span></NavLink>)}</nav><div className="sidebar-bottom"><div className="sidebar-help"><HelpCircle size={23} /><h2>Butuh bantuan?</h2><p>Kenali aplikasi dan proses aktivasi SamaTech.</p><Link to="/faq">Pusat bantuan <ArrowUpRight size={15} /></Link></div><span className="sidebar-domain">samatech.sbs</span></div></aside>
    <div className="store-workspace"><header className="store-topbar"><div className="store-topbar-title"><span className="mobile-brand"><Brand /></span><span className="desktop-page-title">{title}</span><span className="mobile-page-title">{title}</span></div><form className="store-search" role="search" onSubmit={search}><Search size={18} aria-hidden="true" /><input type="search" aria-label="Cari aplikasi SamaTech" placeholder="Cari aplikasi untuk usaha Anda" value={query} onChange={event => updateCatalogueQuery(event.target.value)} />{query && <button type="button" aria-label="Hapus pencarian" onClick={() => updateCatalogueQuery('')}><X size={16} /></button>}<button type="submit" className="search-submit" aria-label="Jalankan pencarian"><ArrowUpRight size={17} /></button></form><Link className="topbar-help" to="/faq" aria-label="Bantuan dan FAQ"><HelpCircle size={21} /></Link></header>
      <main id="main-content" tabIndex={-1}><Outlet /></main><footer className="store-footer"><span>© {new Date().getFullYear()} SamaTech</span><div className="store-footer-links"><Link to="/jasa-custom">Jasa Custom</Link><Link to="/faq">FAQ</Link><Link to="/kontak">Kontak</Link><span>{site.domain}</span></div><address className="store-footer-contact"><a href={`tel:${site.phoneNumber}`}>{site.phoneDisplay}</a>{emailUrl && <a href={emailUrl}>{site.email}</a>}{whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>}<span>{site.officeAddress}</span></address></footer>
    </div>
    <nav id="mobile-navigation" className="store-bottom-nav" aria-label="Navigasi seluler">{links.map(({ path, mobile, icon: Icon }) => <NavLink key={path} to={path} end={path === '/'}><Icon size={21} /><span>{mobile}</span></NavLink>)}</nav>
    {whatsapp && <a className="whatsapp-float" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Hubungi SamaTech melalui WhatsApp (tab baru)"><MessageCircle size={24} /></a>}
  </div>;
}
