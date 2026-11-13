import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Smartphone, SearchX, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { filterProducts, getProductCategories } from '../data/catalogSearch';
import { getLicensePrice } from '../data/productPresentation';
import { ProductIcon, DownloadButton } from '../components/UI';
import './products.css';

function ReadyAppCard({ product }) {
  const price = getLicensePrice(product);
  return <div className="ready-card-shell"><article className="product-card ready-app-card"><div className="ready-app-identity"><ProductIcon product={product} size={40} /><div className="ready-app-copy"><h2><Link to={`/produk/${product.id}`}>{product.name}</Link></h2><p className="ready-app-category">{product.category}</p>{product.platform && <span className="ready-app-platform"><Smartphone size={13} />{product.platform}</span>}</div></div><div className="ready-app-license"><span>{product.paymentType} · {product.licenseScope}</span>{price != null && price !== '' && <strong>{price}</strong>}</div><div className="ready-app-actions"><DownloadButton product={product} /><Link className="button secondary" to={`/produk/${product.id}`}>Detail<span className="sr-only"> {product.name}</span></Link></div></article></div>;
}

export default function Products() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const categories = getProductCategories(products);
  const requestedCategory = params.get('kategori') || '';
  const selectedCategory = categories.includes(requestedCategory) ? requestedCategory : '';
  const results = filterProducts(products, query, selectedCategory);
  const selectCategory = category => {
    const next = new URLSearchParams(params);
    if (category) next.set('kategori', category); else next.delete('kategori');
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const clearSearch = () => { const next = new URLSearchParams(params); next.delete('q'); setParams(next, { replace: true, preventScrollReset: true }); };
  const resetAll = () => { const next = new URLSearchParams(params); next.delete('q'); next.delete('kategori'); setParams(next, { replace: true, preventScrollReset: true }); };
  return <div className="ready-catalog container">
    <nav className="ready-breadcrumb" aria-label="Breadcrumb katalog"><Link to="/">Beranda</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">Aplikasi Siap Pakai</span></nav>
    <header className="ready-catalog-heading"><h1>Aplikasi Siap Pakai</h1></header>
    <div className="ready-category-filters" role="group" aria-label="Filter kategori aplikasi"><button type="button" aria-pressed={!selectedCategory} onClick={() => selectCategory('')}>Semua</button>{categories.map(category => <button type="button" key={category} aria-pressed={selectedCategory === category} onClick={() => selectCategory(category)}>{category}</button>)}</div>
    <p className="ready-result-status" role="status">{results.length} aplikasi{selectedCategory ? ` · ${selectedCategory}` : ''}{query ? ` · Hasil untuk “${query}”` : ''}</p>
    {results.length ? <div className="ready-app-grid" key={`${query}\u0000${selectedCategory}`}>{results.map(product => <ReadyAppCard key={product.id} product={product} />)}</div> : <section className="ready-empty-state"><SearchX size={34} /><h2>Tidak ada aplikasi yang sesuai</h2><p>{selectedCategory ? 'Coba kata kunci lain atau pilih kategori Semua.' : 'Coba cari nama atau deskripsi aplikasi yang lain.'}</p><div>{query && <button type="button" className="button secondary" onClick={clearSearch}>Hapus pencarian</button>}<button type="button" className="button primary" onClick={resetAll}>Lihat semua aplikasi <ArrowRight size={16} /></button></div></section>}
  </div>;
}
