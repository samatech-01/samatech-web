export const site = {
  name: 'SamaTech',
  domain: 'samatech.sbs',
  phoneNumber: '+6281345458212',
  phoneDisplay: '081345458212',
  whatsappNumber: '6281345458212',
  whatsappMessage: 'Halo SamaTech, saya ingin mengetahui aplikasi dan aktivasi lisensi.',
  email: 'admin@samatech.sbs',
  officeAddress: 'Sepinggan Baru, Balikpapan Selatan, Kota Balikpapan, Kalimantan Timur.',
};

export function getWhatsAppUrl(number = site.whatsappNumber) {
  return /^[1-9]\d{7,14}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent(site.whatsappMessage)}`
    : null;
}
