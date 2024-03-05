import { gsap } from 'gsap';

import { BaseAnimationProps } from '@/libs/@types';
import { getAnimationElement } from '@/libs/utils';

export const preloaderAnimation = ({ element }: BaseAnimationProps) => {
    const el = getAnimationElement(element);
    const icon = el.querySelector('.preloader__icon');

    const tl = gsap.timeline();

    const animationEndHandler = () => {
        el.classList.remove('preloader--is-open');
    };

    tl
    .add(gsap.effects.fade(icon))
    .add(gsap.effects.wiggle(icon, {
        events: { onFinish: animationEndHandler }
    }));
};