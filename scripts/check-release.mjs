import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, relative, sep, posix } from 'node:path';
import { products } from '../src/data/products.js';

const walk = directory => readdirSync(directory).flatMap(name => {
  const path = resolve(directory, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});
const files = directory => new Set(walk(directory).map(path => relative(directory, path).split(sep).join('/')));
const publicFiles = files('public');
const outputFiles = files('dist');
const text = path => readFileSync(path, 'utf8');
const outputAssetPath = (from, url) => url.startsWith('/')
  ? url.slice(1).split(/[?#]/)[0]
  : posix.normalize(posix.join(posix.dirname(from), url.split(/[?#]/)[0]));
const sensitivePath = /(?:^|\/)(?:\.env(?:\..*)?|\.npmrc|\.netrc|credentials\.json|keystore\.properties|local\.properties|id_rsa.*|id_ed25519.*)$|\.(?:jks|keystore|p12|pfx|pem|key|apk|aab|sqlite3?|db|backup|bak)$/i;
const secret = /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|AKIA[A-Z0-9]{16}|AIza[A-Za-z0-9_-]{35}|sk-(?:proj-)?[A-Za-z0-9_-]{40,})\b/;

assert.equal(text('public/CNAME').trim(), 'samatech.sbs');
assert.equal(text('dist/CNAME').trim(), 'samatech.sbs');
assert.match(text('vite.config.js'), /base:\s*['"]\.\/['"]/);
assert.match(text('src/main.jsx'), /<HashRouter>/);
assert.match(text('index.html'), /rel="canonical" href="https:\/\/samatech\.sbs\/"/);
for (const app of ['stpos', 'stfnb']) {
  assert.ok(!publicFiles.has(`images/${app}/screenshot-akun.jpg`), `${app}: unredacted account JPEG must stay private`);
  assert.ok(!outputFiles.has(`images/${app}/screenshot-akun.jpg`), `${app}: original account JPEG in build`);
  for (const root of ['public', 'dist']) {
    const png = readFileSync(`${root}/images/${app}/screenshot-akun.png`);
    for (let offset = 8; offset < png.length;) {
      const length = png.readUInt32BE(offset);
      const type = png.toString('ascii', offset + 4, offset + 8);
      assert.ok(!['eXIf', 'tEXt', 'zTXt', 'iTXt'].includes(type), `${app}: private metadata in ${root} PNG`);
      offset += 12 + length;
    }
  }
}
for (const path of outputFiles) {
  assert.ok(!/placeholder/i.test(path), `Unused placeholder shipped: ${path}`);
  if (/\.(?:html|css)$/.test(path)) {
    for (const match of text(resolve('dist', path)).matchAll(/(?:src|href)=["']([^"']+)["']|url\(["']?([^)'"\s]+)["']?\)/g)) {
      const url = match[1] || match[2];
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) continue;
      const asset = outputAssetPath(path, url);
      assert.ok(outputFiles.has(asset), `${path}: missing exact-case asset ${url} -> ${asset}`);
    }
  }
}
for (const product of products) {
  assert.equal(product.screenshotIsPlaceholder, false, `${product.id}: placeholder`);
  assert.ok(product.screenshots.length, `${product.id}: missing screenshots`);
  for (const image of [{ src: product.icon }, { src: product.screenshot }, ...product.screenshots]) {
    assert.ok(image.src.startsWith('./'), `${product.id}: asset must use a deploy-relative URL`);
    const path = image.src.slice(2);
    assert.ok(publicFiles.has(path), `${image.src}: exact-case public asset`);
    assert.ok(outputFiles.has(path), `${image.src}: exact-case built asset`);
    assert.ok(!/placeholder/i.test(path), `${image.src}: placeholder asset`);
  }
  for (const image of product.screenshots) assert.ok(image.width > 0 && image.height > 0 && image.alt);
}
for (const path of outputFiles) {
  assert.ok(!sensitivePath.test(path), `Sensitive output filename: ${path}`);
  assert.ok(!/^(?:\.private-assets|\.audit-local|\.git|src|node_modules)\//.test(path), `Private/build input in output: ${path}`);
  if (/\.(?:js|css|html|json|xml|txt|svg)$/.test(path)) assert.ok(!secret.test(text(resolve('dist', path))), `Possible secret in output: ${path}`);
}
// Inspect upload candidates, including files that have not been staged yet.
const candidates = execFileSync('git', ['-c', `safe.directory=${process.cwd().split(sep).join('/')}`, 'ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
for (const path of candidates) {
  assert.ok(!sensitivePath.test(path), `Sensitive Git candidate: ${path}`);
  assert.ok(!/^(?:node_modules|dist|\.audit-cache|\.audit-local|\.private-assets|\.asset-tools)\//.test(path), `Local-only Git candidate: ${path}`);
  if (/\.(?:js|jsx|mjs|css|html|json|xml|txt|svg|yml|md)$/.test(path)) assert.ok(!secret.test(text(path)), `Possible secret in Git candidate: ${path}`);
}
console.log(`Release checks passed: ${candidates.length} Git candidates, ${outputFiles.size} build files; domain, hash routing, case-sensitive asset paths and common credential patterns.`);
console.log('Limit: pattern scanning does not establish privacy or publication rights for screenshot contents.');
