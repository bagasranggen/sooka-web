'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { COMMON_ANIMATIONS } from '@/libs/handles';
import { registerAnimation } from '@/libs/animations/register';
import { getAnimationProps } from '@/libs/utils';

import { gsap } from 'gsap';

registerAnimation();

export const initAnimations = (selector?: string) => {
    return gsap.context(() => {
        // Common Animation
        gsap.utils
            .toArray(`${selector ?? ''}[${COMMON_ANIMATIONS.ATTRIBUTES.TYPE}]`)
            .forEach((element: any, i: number) => {
                const type: string = element.getAttribute(COMMON_ANIMATIONS.ATTRIBUTES.TYPE);
                const config = getAnimationProps(element);

                gsap.effects?.[type] && gsap.effects?.[type](element, config, i);
            });
    });
};

export const useAnimations = () => {
    const pathname = usePathname();

    useEffect(() => {
        const context = initAnimations();

        return () => context.revert();
    }, [pathname]);
};
