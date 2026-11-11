import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Activation from './pages/Activation';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { products } from './data/products';
import { services } from './data/services';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';

function Metadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const titles = { '/': 'Teknologi untuk Langkah Usaha Anda', '/produk': 'Aplikasi Android untuk Usaha', '/aktivasi': 'Cara Aktivasi Lisensi', '/faq': 'Pertanyaan Umum', '/kontak': 'Kontak Resmi', '/jasa-custom': 'Jasa Pembuatan Aplikasi' };
    const product = products.find(p => pathname === `/produk/${p.id}`);
    const service = services.find(item => pathname === `/jasa-custom/${item.slug}`);
    const title = service ? service.title : product ? `${product.name} — ${product.audience}` : titles[pathname] || 'Halaman Tidak Ditemukan';
    document.title = `SamaTech — ${title}`;
    const description = service?.shortDescription || (pathname === '/jasa-custom' ? 'Layanan pembuatan aplikasi Android, aplikasi web, Google AppSheet, website dan landing page sesuai kebutuhan proyek.' : null) || product?.description || 'Kenali aplikasi Android SamaTech untuk toko, retail, dan usaha kuliner. Informasi produk, download APK gratis, dan panduan aktivasi lisensi.';
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = description;
  }, [pathname]);
  return null;
}
export default function App() {
  return <MotionConfig reducedMotion="user"><Metadata /><Routes><Route element={<Layout />}><Route index element={<Home />} /><Route path="produk" element={<Products />} /><Route path="produk/:id" element={<ProductDetail />} /><Route path="aktivasi" element={<Activation />} /><Route path="jasa-custom" element={<Services />} /><Route path="jasa-custom/:slug" element={<ServiceDetail />} /><Route path="faq" element={<FAQ />} /><Route path="kontak" element={<Contact />} /><Route path="*" element={<NotFound />} /></Route></Routes></MotionConfig>;
}
