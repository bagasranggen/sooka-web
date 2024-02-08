import React from 'react';

import type { AnimationProps, ImageZoomAnimationProps, Prettify } from '@/libs/@types';
import { COMMON_ANIMATIONS } from '@/libs/handles';

type CreateAnimationProps = Prettify<(AnimationProps | ImageZoomAnimationProps)>;

export const createAnimation = (props: CreateAnimationProps) => {
    switch (props.type) {
        // case 'blending-background':
        //     return {
        //         [COMMON_ANIMATIONS.ATTRIBUTES.BLENDING]: COMMON_COLOR?.[props.background as keyof typeof COMMON_COLOR] ?? props.background
        //     };
        //
        // case 'marquee':
        //     return {
        //         [COMMON_ANIMATIONS.ATTRIBUTES.TYPE]: props.type,
        //         ...props?.variant ? { [COMMON_ANIMATIONS.ATTRIBUTES.MARQUEE]: props.variant } : {},
        //         ...props?.speed ? { [COMMON_ANIMATIONS.ATTRIBUTES.MARQUEE_SPEED]: props.speed } : {},
        //         ...props?.spacing ? { style: { '--spacing': `${props.spacing}px` } } : {},
        //     } as React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

        case 'image-zoom':
            return {
                [COMMON_ANIMATIONS.ATTRIBUTES.TYPE]: props.type,
            };

        default:
            return {
                [COMMON_ANIMATIONS.ATTRIBUTES.TYPE]: props.type,
                ...props.delay ? { [COMMON_ANIMATIONS.ATTRIBUTES.DELAY]: props.delay } : {},
            };
    }
};