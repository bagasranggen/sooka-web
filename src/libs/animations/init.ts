'use client';

import { Init as InitAnimations } from '@/libs/animations/InitAnimations';

export const Init = (selector?: string) => {
    // Run data-attribute-animation
    InitAnimations(selector ?? '');
};
