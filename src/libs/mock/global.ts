export const CONTACT_NUMBER = process.env.NEXT_PUBLIC_CP;

export const FOOTER_ADDRESS = {
    ADDRESS: '8655 S BLACKSTONE AVENUE, CHICAGO, IL',
    OPEN_HOUR: 'FRIDAY - SUNDAY, 9 AM-5 PM'
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
        href: `mailto:${process.env.NEXT_PUBLIC_SC_MAIL}`
    },
];