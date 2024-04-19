import ButtonNavToggle from '@/components/common/button/buttonNavToggle/ButtonNavToggle';
import ButtonRipple from '@/components/common/button/buttonRipple/ButtonRipple';
import ButtonBlock from '@/components/common/button/buttonBlock/ButtonBlock';
import ButtonBase from '@/components/common/button/buttonBase/ButtonBase';
import ButtonRounded from '@/components/common/button/buttonRounded/ButtonRounded';

export const BUTTON_TYPES = {
    BUTTON: 'button',
    SUBMIT: 'submit',
    RESET: 'reset',
    ANCHOR: 'anchor',
} as const;

export const BUTTON_VARIANTS = {
    BASE: 'base',
    BLOCK: 'block',
    OUTLINE: 'outline',
    RIPPLE: 'ripple',
    ROUNDED: 'rounded',
    NAV_TOGGLE: 'nav-toggle',
} as const;

export const BUTTON_HANDLES = {
    [BUTTON_VARIANTS.BASE]: ButtonBase,
    [BUTTON_VARIANTS.BLOCK]: ButtonBlock,
    [BUTTON_VARIANTS.OUTLINE]: ButtonBlock,
    [BUTTON_VARIANTS.NAV_TOGGLE]: ButtonNavToggle,
    [BUTTON_VARIANTS.RIPPLE]: ButtonRipple,
    [BUTTON_VARIANTS.ROUNDED]: ButtonRounded,
};
