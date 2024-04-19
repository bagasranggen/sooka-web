import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { getAnimationElement } from '@/libs/utils';
import { BaseAnimationProps } from '@/libs/@types';

gsap.registerPlugin(ScrollTrigger);

export const parallax = ({ element }: BaseAnimationProps) => {
    const el = getAnimationElement(element);
    const media = el.querySelector('img');

    const scale = 1.2;
    const start = 25;
    const end = -25;

    gsap.set(media, { scale: scale });

    gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: '70% 30%',
            scrub: true,
            // markers: ANIMATION.PARALLAX.MARKER && process.env.NODE_ENV === 'development',
        },
        defaults: {
            ease: 'Power1.easeInOut',
        },
    }).fromTo(media, { y: start }, { y: end });
};
