import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { COMMON_ANIMATIONS } from '@/libs/handles';
import { registerAnimation } from '@/libs/animations/register';
import { getAnimationProps } from '@/libs/utils';

import { gsap } from 'gsap';

registerAnimation();

export const Init = (selector?: string) => {
    const pathname = usePathname();

    useEffect(() => {
        // console.log('run init anim');

        const context = gsap.context(() => {
            // Common Animation
            gsap.utils
                .toArray(`${selector ?? ''}[${COMMON_ANIMATIONS.ATTRIBUTES.TYPE}]`)
                .forEach((element: any, i: number) => {
                    const type: string = element.getAttribute(COMMON_ANIMATIONS.ATTRIBUTES.TYPE);
                    const config = getAnimationProps(element);

                    gsap.effects?.[type] && gsap.effects?.[type](element, config, i);
                });
        });

        return () => context.revert();
    }, [selector, pathname]);
};

export const InitAnimations = () => {
    // const pathname = usePathname();
    // const searchParams = useSearchParams();

    // Re-run on first load and  every page change
    Init();
};
