// Presentation fallbacks only. Product facts remain in products.js.
export function getScreenshots(product) {
  if (Array.isArray(product.screenshots) && product.screenshots.length) {
    return product.screenshots.filter(item => item?.src).map((item, index) => ({
      ...item,
      alt: item.alt || `${product.name} — screenshot ${index + 1}`,
    }));
  }
  return product.screenshot ? [{
    src: product.screenshot,
    alt: product.screenshotAlt || `Visual ${product.name}`,
    isPlaceholder: Boolean(product.screenshotIsPlaceholder),
    width: 640, height: 440,
  }] : [];
}

export function getLicensePrice(product) {
  return product.licensePrice ?? product.price ?? null;
}

export function getTechnicalInfo(product) {
  return [
    ['Developer', product.developer], ['Platform', product.platform],
    ['Kategori', product.category], ['Versi', product.version],
    ['Minimum Android', product.minAndroid], ['Ukuran APK', product.fileSize],
    ['Diperbarui', product.updatedAt],
  ].filter(([, value]) => value != null && value !== '');
}
