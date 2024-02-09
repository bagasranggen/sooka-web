import { CONTACT } from '@/libs/mock';

export const getWhatsappEncoded = (product: string) => {
    const message = (product: string) => `Hai, Sooka!

Saya ingin pesan *${product}*, apakah masih tersedia?`;

    const text = encodeURI(message(product));

    return `https://wa.me/${CONTACT?.NUMBER ?? ''}?text=${text}`;
};
