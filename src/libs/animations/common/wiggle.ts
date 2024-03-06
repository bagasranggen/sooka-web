import { gsap } from 'gsap';

import type { BaseAnimationProps } from '@/libs/@types';

export const baseWiggleAnimation = ({ element, config }: BaseAnimationProps) => {
    const tl = gsap.timeline({ onComplete: () => gsap.set(element, { clearProps: true }) as unknown as void });

    tl
    .to(element, { rotate: '10deg' })
    .to(element, { rotate: '-10deg' })
    .to(element, { rotate: '20deg' })
    .to(element, { rotate: '-5deg' })
    .to(element, { rotate: '0deg' })
    .then(() => {
        config?.events?.onFinish && config.events.onFinish();
    });

    // gsap.fromTo(element, { rotate: '10deg' }, { rotate: '-10deg' })
    // .then(() => gsap.fromTo(element, { rotate: '-10deg' }, { rotate: '20deg' }))
    // .then(() => gsap.fromTo(element, { rotate: '20deg' }, { rotate: '-5deg' }))
    // .then(() => gsap.fromTo(element, { rotate: '-5deg' }, { rotate: '0deg' }));
};