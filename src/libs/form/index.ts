import FormContact from '@/components/common/form/formContact/FormContact';
import FormUserLogin from '@/components/common/form/formUserLogin/FormUserLogin';

export const FORM_VARIANTS = {
    CONTACT: 'contact',
    USER_LOGIN: 'user-login',
} as const;

export const FORM_HANDLES = {
    [FORM_VARIANTS.CONTACT]: FormContact,
    [FORM_VARIANTS.USER_LOGIN]: FormUserLogin,
};

export * from './formContact';
