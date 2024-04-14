import { gsap } from 'gsap';

import { BaseAnimationProps } from '@/libs/@types';
import { getAnimationElement } from '@/libs/utils';

export const preloaderAnimation = ({ element, config }: BaseAnimationProps) => {
    const el = getAnimationElement(element);
    const icon = el.querySelector('.preloader__icon');
    const text = el.querySelector('.preloader__text');
    const isLooping = (config?.loop as unknown as string) === 'true' ?? false;

    const tl = gsap.timeline();

    const animationEndHandler = () => {
        el.classList.remove('preloader--is-open');
    };

    const animationEventsProps = isLooping ? { loop: isLooping } : { events: { onFinish: animationEndHandler } };

    tl.add(gsap.effects.fade(icon))
        .add(gsap.effects.wiggle(icon, animationEventsProps), '-=.015')
        .add(gsap.effects.fade(text), '-=.35');
};
