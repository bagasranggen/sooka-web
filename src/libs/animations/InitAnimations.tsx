import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { COMMON_ANIMATIONS } from '@/libs/handles';
import { registerAnimation } from '@/libs/animations/register';
import { getAnimationProps } from '@/libs/utils';

import { gsap } from 'gsap';

registerAnimation();

export const Init = (selector?: string) => {
    // const pathname = usePathname();

    // useEffect(() => {
    const context = gsap.context(() => {
        // Common Animation
        gsap.utils
            .toArray(`${selector ?? ''}[${COMMON_ANIMATIONS.ATTRIBUTES.TYPE}]`)
            .forEach((element: any, i: number) => {
                console.log(element);

                const type: string = element.getAttribute(COMMON_ANIMATIONS.ATTRIBUTES.TYPE);
                const config = getAnimationProps(element);

                gsap.effects?.[type] && gsap.effects?.[type](element, config, i);
            });
    });

    return () => context.revert();
    // }, [selector, pathname]);
};
