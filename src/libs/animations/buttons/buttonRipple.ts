import { BaseAnimationProps } from '@/libs/@types';
import { getAnimationElement } from '@/libs/utils';

import { gsap } from 'gsap';

export const buttonRipple = ({ element }: BaseAnimationProps) => {
    const el = getAnimationElement(element);
    const ripple = el.querySelector('.btn__ripple');

    const mouseHandler = (e: MouseEvent, type: 'enter' | 'leave') => {
        gsap.set(ripple, {
            top: e.offsetY,
            left: e.offsetX,
        });

        gsap.to(ripple, {
            scale: type === 'enter' ? 30 : 0,
            duration: 0.45,
        });
    };

    el.addEventListener('mouseenter', (e: MouseEvent) => mouseHandler(e, 'enter'));
    el.addEventListener('mouseout', (e: MouseEvent) => mouseHandler(e, 'leave'));
};
