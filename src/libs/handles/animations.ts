import { BUTTON_VARIANTS } from '@/libs/handles/button';
import { createAnimationHandles } from '@/libs/factory/createAnimationHandles';

import { baseFadeInAnimation, fadeIn } from '@/libs/animations/common/fade';
import { buttonRipple } from '@/libs/animations/buttons/ButtonRipple';
import { baseWiggleAnimation } from '@/libs/animations/common/wiggle';
import { preloaderAnimation } from '@/libs/animations/sections/preloader';

export const COMMON_ANIMATIONS = {
    TYPE: {
        FADE: 'fade',
        FADE_IN: 'fade-in',
        WIGGLE: 'wiggle',
        IMAGE_ZOOM: 'image-zoom',
    } as const,
    SECTION: {
        PRELOADER: 'preloader',
    } as const,
    BUTTON: {
        RIPPLE: 'ripple',
    } as const,
    ATTRIBUTES: {
        TYPE: 'data-animation',
        DELAY: 'data-animation-delay',
    }
};

export const ANIMATION_HANDLES = {
    ...createAnimationHandles({ handles: COMMON_ANIMATIONS.TYPE.FADE, animation: baseFadeInAnimation, extendTimeline: true }),
    ...createAnimationHandles({ handles: COMMON_ANIMATIONS.TYPE.FADE_IN, animation: fadeIn }),

    ...createAnimationHandles({ handles: COMMON_ANIMATIONS.TYPE.WIGGLE, animation: baseWiggleAnimation }),

    // Section
    ...createAnimationHandles({ handles: COMMON_ANIMATIONS.SECTION.PRELOADER, animation: preloaderAnimation }),

    // Button
    ...createAnimationHandles({ handles: BUTTON_VARIANTS.RIPPLE, animation: buttonRipple }),
};