import ButtonNavToggle from '@/components/common/button/buttonNavToggle/ButtonNavToggle';

export const BUTTON_TYPES = {
    BUTTON: 'button',
    ANCHOR: 'anchor',
} as const;

export const BUTTON_VARIANTS = {
    NAV_TOGGLE: 'nav-toggle',
} as const;

export const BUTTON_HANDLES = {
    [BUTTON_VARIANTS.NAV_TOGGLE]: ButtonNavToggle,
};