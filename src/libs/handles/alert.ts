import dynamic from 'next/dynamic';

const AlertRounded = dynamic(() => import('@/components/common/alert/alertRounded/AlertRounded'));

export const ALERT_VARIANTS = {
    ROUNDED: 'rounded',
} as const;

export const ALERT_HANDLES = {
    [ALERT_VARIANTS.ROUNDED]: AlertRounded,
};
