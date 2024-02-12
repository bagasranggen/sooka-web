import FormContact from '@/components/common/form/formContact/FormContact';

export const FORM_VARIANTS = {
    CONTACT: 'contact'
} as const;

export const FORM_HANDLES = {
    [FORM_VARIANTS.CONTACT]: FormContact,
};

export * from './formContact';