export function getProductCategories(products) {
  return [...new Set(products.map(product => product.category).filter(category => typeof category === 'string' && category.trim()))];
}

export function filterProducts(products, query = '', category = '') {
  const terms = query.toLocaleLowerCase('id-ID').trim().split(/\s+/).filter(Boolean);
  return products.filter(product => {
    const content = [product.name, product.description].join(' ').toLocaleLowerCase('id-ID');
    return (!category || product.category === category) && terms.every(term => content.includes(term));
  });
}
