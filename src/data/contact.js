import { site, getWhatsAppUrl } from '../config/site.js';

export const contactTopics = [
  { id: 'ready-app', label: 'Aplikasi Siap Pakai' },
  { id: 'custom-project', label: 'Jasa Custom' },
  { id: 'activation', label: 'Aktivasi Lisensi' },
  { id: 'general', label: 'Pertanyaan Umum' },
];

export function getContactMessageUrl(fields, number = site.whatsappNumber) {
  const base = getWhatsAppUrl(number);
  const topic = contactTopics.find(item => item.id === fields.category);
  const name = String(fields.name || '').trim();
  const contact = String(fields.contact || '').trim();
  const message = String(fields.message || '').trim();
  if (!base || !topic || !name || !contact || !message) return null;
  const url = new URL(base);
  url.searchParams.set('text', `Halo SamaTech,\n\nNama: ${name}\nKontak: ${contact}\nKebutuhan: ${topic.label}\n\nPesan:\n${message}`);
  return url.href;
}

export function getContactEmailUrl(email = site.email) {
  if (typeof email !== 'string' || !/^[^\s@?/#]+@[^\s@?/#]+\.[^\s@?/#]+$/.test(email.trim())) return null;
  const [local, domain] = email.trim().split('@');
  return `mailto:${encodeURIComponent(local)}@${domain.split('.').map(encodeURIComponent).join('.')}`;
}
