import { CONTACT } from '@/libs/mock';

export const getWhatsappEncoded = (product?: string) => {
    let encoded = `https://wa.me/${CONTACT?.NUMBER ?? ''}`;

    const message = (product: string) => `Hai, Sooka!

Saya ingin pesan *${product}*, apakah masih tersedia?`;

    if (product) {
        const text = encodeURI(message(product));
        encoded += `?text=${text}`;
    }

    return encoded;
};
