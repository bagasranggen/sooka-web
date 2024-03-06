import { gsap } from 'gsap';

import { BaseAnimationProps } from '@/libs/@types';
import { getFadeOffset, getSpacingValue } from '@/libs/utils';

export const baseFadeInAnimation = ({ element, config }: BaseAnimationProps) => {
    const options = {
        ease: 'Power1.easeInOut',
        // duration: FADE_IN_ANIMATION.DURATION,
        ...config?.delay ? { delay: config.delay } : {},
        onComplete: () => {
            gsap.set(element, { clearProps: 'y,opacity' });
        }
    };

    return gsap.from(element, {
        opacity: 0,
        y: 60,
        ...options,
    });
};

export const fadeIn = ({ element, config, id }: BaseAnimationProps) => {
    const fadeTl = gsap.timeline({
        scrollTrigger: {
            ...id ? { id: `fade-in-${id}` } : {},
            trigger: element,
            start: () => `top-=${getFadeOffset({ element }) + getSpacingValue({ element }).top} 80%`,
            toggleActions: 'play pause play pause',
            // once: true,
            // markers: ANIMATION.FADE_IN.MARKER && process.env.NODE_ENV === 'development',
            // markers: true,
        },
    });

    fadeTl.fade(element, config);
};