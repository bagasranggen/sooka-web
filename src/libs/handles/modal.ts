import dynamic from 'next/dynamic';

const ModalConfirmation = dynamic(() => import('@/components/common/modal/modalConfirmation/ModalConfirmation'));

export const MODAL_VARIANTS = {
    CONFIRM: 'confirm',
} as const;

export const MODAL_HANDLES = {
    [MODAL_VARIANTS.CONFIRM]: ModalConfirmation,
};
