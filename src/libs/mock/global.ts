import type { ListPointItemProps } from '@/components/common/list/listPoint/ListPoint';

export const CONTACT = {
    NUMBER: process.env.NEXT_PUBLIC_CP,
    GREETINGS: (product: string) => {
        if (!product) return '';

        return `Hai, Sooka!

Saya ingin pesan *${product}*, apakah masih tersedia?`;
    },
};

export const FOOTER_ADDRESS = {
    ADDRESS: 'Sleman, Daerah Istimewa Yogyakarta',
    OPEN_HOUR: 'Open Daily, 9 AM - 4 PM',
};

export const FOOTER_SOCIAL_MEDIA = [
    {
        icon: 'CiInstagram',
        label: 'instagram',
        href: process.env.NEXT_PUBLIC_SC_INSTAGRAM,
    },
    {
        icon: 'CiMail',
        label: 'mail',
        href: `mailto:${process.env.NEXT_PUBLIC_SC_MAIL}`,
    },
];

export const HOW_TO_ORDER: ListPointItemProps[] = [
    {
        title: 'Choose your treats',
        content: `<p>Please note that orders must be made <strong>2 days in advance</strong>.<br  />Why 2 days? We need to make sure the treats are being prepared just right! Sooka is made with the finest ingredients and it has been loved by many of our friends and families.</p>`,
    },
    {
        title: 'Choose your pick up method',
        content: `<p>Choose your delivery method or opt for self-pick up. <br class="d-none d-xl-block"/> Delivery options are available in Yogyakarta, and surrounding areas only.</p>`,
    },
    {
        title: 'Payment & order confirmation',
        content: `<p>When you place an order, you will receive an automatic WhatsApp message with a receipt confirmation. Full payment must be made before we can start processing the order.</p>`,
    },
];
