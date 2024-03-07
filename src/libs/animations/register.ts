import { ANIMATION_HANDLES } from '@/libs/handles';
import { gsap } from 'gsap';

export const registerAnimation = () => {
    Object.keys(ANIMATION_HANDLES).map((key) => {
        const handle = ANIMATION_HANDLES?.[key as keyof Object];

        gsap.registerEffect({
            name: key,
            effect: (targets: HTMLElement, config: any, id: number) => {
                return handle.animation({ element: targets, config, id });
            },
            extendTimeline: handle?.extendTimeline,
        });
    });
};
