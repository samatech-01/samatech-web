import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';

// Render komponen aktual tanpa browser; bukan pengganti uji interaksi/console.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const { products } = await server.ssrLoadModule('/src/data/products.js');
  const { services } = await server.ssrLoadModule('/src/data/services.js');
  const routes = ['/', '/produk', '/aktivasi', '/faq', '/kontak', '/jasa-custom', ...products.map(p => `/produk/${p.id}`), ...services.map(service => `/jasa-custom/${service.slug}`)];
  const render = path => renderToString(React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(App)));
  for (const route of [...routes, '/tidak-ditemukan', '/produk/tidak-ditemukan', '/jasa-custom/tidak-ditemukan']) {
    const html = render(route);
    assert.match(html, /<h1\b/, `${route}: heading utama`);
    const mobileNavigation = html.match(/<nav id="mobile-navigation"[\s\S]*?<\/nav>/)?.[0];
    assert.ok(mobileNavigation, 'Bottom navigation tersedia');
    assert.equal([...mobileNavigation.matchAll(/<a\b/g)].length, 4, 'Empat tujuan navigasi mobile');
    assert.match(html, /role="search"/);
    if (route.includes('tidak-ditemukan')) assert.match(html, /404/);
    const currentProduct = products.find(product => route === `/produk/${product.id}`);
    if (currentProduct) {
      assert.ok(html.includes(`href="${currentProduct.downloadUrl}" target="_blank" rel="noopener noreferrer"`), `${route}: tautan APK resmi`);
      assert.match(html, /aria-label="Breadcrumb"/);
      assert.match(html, /class="app-acquisition"/);
      assert.match(html, /Rp300\.000/);
      assert.match(html, /Sekali bayar/);
      assert.match(html, /1 perangkat Android per pembelian/);
      assert.match(html, /Pembelian lisensi dilakukan satu kali untuk satu perangkat Android\./);
      assert.match(html, /Informasi teknis/);
      assert.match(html, /class="screenshot-track"|class="gallery-empty"/);
      for (const [label, key] of [['Versi', 'version'], ['Ukuran APK', 'fileSize'], ['Diperbarui', 'updatedAt']]) {
        const pattern = new RegExp(`<dt>${label}</dt>`);
        if (currentProduct[key]) assert.match(html, pattern);
        else assert.doesNotMatch(html, pattern);
      }
      if (route === '/produk') {
        for (const product of products) {
          assert.ok(html.includes(`href="${product.downloadUrl}" target="_blank" rel="noopener noreferrer"`), `/produk: tautan APK ${product.id}`);
        }
      }
    }
    for (const [, attrs] of html.matchAll(/<img\b([^>]+)>/g)) {
      assert.match(attrs, /alt="[^"]+"/, `${route}: alt gambar`);
      const src = attrs.match(/src="([^"]+)"/)?.[1];
      assert.ok(src?.startsWith('/') && existsSync(resolve('public', src.slice(1))), `${route}: aset ${src}`);
    }
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      if (href.startsWith('/')) assert.ok((routes.includes(href) || (href.startsWith('/images/') && existsSync(resolve('public', href.slice(1))))), `${route}: tautan internal ${href}`);
    }
  }
  // Membuktikan katalog dan footer/detail menerima produk baru dari data yang sama.
  const sample = { ...products[0], id: 'audit-product', name: 'Audit Product', screenshotIsPlaceholder: false, version: 'test-only-version', fileSize: 'test-only-size', updatedAt: 'test-only-date', changelog: ['test-only-change'], downloadUrl: 'https://github.com/test-owner/test-distribution/releases/download/test-v1/test-app.apk' };
  products.push(sample);
  try {
    const catalogue = render('/produk');
    assert.match(catalogue, /href="\/produk\/audit-product"/);
    assert.ok(catalogue.includes(`href="${sample.downloadUrl}" target="_blank" rel="noopener noreferrer"`));
    assert.match(catalogue, /Download APK/);
    const detail = render('/produk/audit-product');
    assert.match(detail, /<h1>Audit Product<\/h1>/);
    assert.doesNotMatch(detail, /Placeholder visual/);
    assert.match(detail, /test-only-version/);
    assert.match(detail, /test-only-size/);
    assert.match(detail, /test-only-date/);
    assert.match(detail, /test-only-change/);
  } finally { products.pop(); }
  console.log(`Audit render lulus: ${routes.length} halaman, 3 fallback, link lokal, gambar/alt, serta produk baru dari data.`);
} finally {
  await server.close();
}
