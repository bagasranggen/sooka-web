import ButtonNavToggle from '@/components/common/button/buttonNavToggle/ButtonNavToggle';
import ButtonRipple from '@/components/common/button/buttonRipple/ButtonRipple';

export const BUTTON_TYPES = {
    BUTTON: 'button',
    SUBMIT: 'submit',
    RESET: 'reset',
    ANCHOR: 'anchor',
} as const;

export const BUTTON_VARIANTS = {
    RIPPLE: 'ripple',
    NAV_TOGGLE: 'nav-toggle',
} as const;

export const BUTTON_HANDLES = {
    // [BUTTON_VARIANTS.BLOCK]: ButtonBlock,
    [BUTTON_VARIANTS.NAV_TOGGLE]: ButtonNavToggle,
    [BUTTON_VARIANTS.RIPPLE]: ButtonRipple,
};
