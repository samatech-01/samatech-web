import test from 'node:test';
import assert from 'node:assert/strict';
import { products, getDownloadUrl } from '../src/data/products.js';
import { getWhatsAppUrl, site } from '../src/config/site.js';
import { getContactEmailUrl } from '../src/data/contact.js';

test('APK hanya menerima aset APK langsung dari GitHub Releases HTTPS', () => {
  assert.equal(getDownloadUrl(''), null);
  for (const value of [
    'javascript:alert(1)',
    'https://example.com/app.apk',
    'https://github.com.evil.test/owner/repo/releases/download/v1/app.apk',
    'http://github.com/owner/repo/releases/download/v1/app.apk',
    'https://github.com:8443/owner/repo/releases/download/v1/app.apk',
    'https://github.com/owner/repo/releases/tag/v1',
    'https://github.com/owner/repo/releases/download/v1/source.zip',
    'https://github.com/owner/repo/releases/download/v1/app.apk?download=1',
  ]) assert.equal(getDownloadUrl(value), null);
  const stposAsset = 'https://github.com/samatech-01/samatech-app-release/releases/download/stPOSv1-0.35.5/stPOS-0.35.5-release.apk';
  const stfnbAsset = 'https://github.com/samatech-01/samatech-app-release/releases/download/stFNBv1.1.0.0/stFNB-1.0.0-release.apk';
  assert.equal(getDownloadUrl(stposAsset), stposAsset);
  assert.equal(getDownloadUrl(stfnbAsset), stfnbAsset);
  assert.equal(products.find(product => product.id === 'stpos').downloadUrl, stposAsset);
  assert.equal(products.find(product => product.id === 'stfnb').downloadUrl, stfnbAsset);
});
test('Kontak resmi membentuk tautan telepon, WhatsApp, dan email yang benar', () => {
  assert.equal(site.phoneNumber, '+6281345458212');
  assert.equal(site.whatsappNumber, '6281345458212');
  assert.equal(site.email, 'admin@samatech.sbs');
  assert.equal(getWhatsAppUrl(), `https://wa.me/6281345458212?text=${encodeURIComponent(site.whatsappMessage)}`);
  assert.equal(getContactEmailUrl(), 'mailto:admin@samatech.sbs');
  assert.equal(getContactEmailUrl('unsafe?to@example.com'), null);
});
test('Katalog memiliki ID unik, konfigurasi valid, dan aset berteks alternatif', () => {
  assert.equal(new Set(products.map(p => p.id)).size, products.length);
  assert.equal(products.find(product => product.id === 'stpos').version, '0.35.5');
  assert.equal(products.find(product => product.id === 'stfnb').version, '1.0.0');
  for (const product of products) {
    assert.match(product.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(typeof product.price === 'string' && product.price.trim().length > 0);
    assert.equal(product.price, 'Rp300.000');
    assert.equal(product.paymentType, 'Sekali bayar');
    assert.equal(product.licenseScope, '1 perangkat Android per pembelian');
    assert.equal(typeof product.downloadUrl, 'string');
    if (product.downloadUrl) assert.ok(getDownloadUrl(product.downloadUrl));
    assert.ok(product.features.length);
    assert.ok(product.screenshotAlt.trim());
  }
  assert.notEqual(products[0], products[1], 'Each product has independent download configuration');
});
