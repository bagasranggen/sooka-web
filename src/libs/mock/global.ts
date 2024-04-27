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
