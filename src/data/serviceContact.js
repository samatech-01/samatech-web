import { site, getWhatsAppUrl } from '../config/site.js';
import { serviceConsultationMessage } from './services.js';

export function getServiceWhatsAppUrl(message = serviceConsultationMessage, number = site.whatsappNumber) {
  const base = getWhatsAppUrl(number);
  if (!base) return null;
  const url = new URL(base);
  url.searchParams.set('text', message || serviceConsultationMessage);
  return url.href;
}
