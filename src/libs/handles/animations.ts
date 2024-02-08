import { buttonRipple } from '@/libs/animations/buttons/ButtonRipple';

import { BUTTON_VARIANTS } from '@/libs/handles/button';
import { getObjectByValue } from '@/libs/utils/getObjectByValue';
import { createAnimationHandles } from '@/libs/factory/createAnimationHandles';

export const COMMON_ANIMATIONS = {
    TYPE: {
        FADE_IN: 'fade-in',
        IMAGE_ZOOM: 'image-zoom',
    } as const,
    BUTTON: {
        RIPPLE: 'ripple',
        // ...getObjectByValue(BUTTON_VARIANTS, BUTTON_VARIANTS.RIPPLE),
    } as const,
    ATTRIBUTES: {
        TYPE: 'data-animation',
        DELAY: 'data-animation-delay',
    }
};

export const ANIMATION_HANDLES = {
    ...createAnimationHandles({ handles: BUTTON_VARIANTS.RIPPLE, animation: buttonRipple }),
};