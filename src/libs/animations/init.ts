'use client';

import { initAnimations } from '@/libs/animations/initAnimations';

type InitProps = {
    selector?: string;
    callback?: () => void;
};

export const Init = ({ selector, callback }: InitProps) => {
    // Run data-attribute-animation
    initAnimations(selector ?? '');

    callback && callback();
};
