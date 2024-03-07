import { COMMON_ANIMATIONS } from '@/libs/handles';

import { gsap } from 'gsap';

export const getFadeOffset = ({ element, offset = 0 }: { element: Element | Element[] | any; offset?: number }) => {
    const fadeAttribute = `[${COMMON_ANIMATIONS.ATTRIBUTES.TYPE}=${COMMON_ANIMATIONS.TYPE.FADE_IN}]`;
    const el: Element = element?.length ? element[0].closest(fadeAttribute) : element;
    const fadeOffset = (gsap?.getProperty(el, 'y') as number) ?? 0;

    return fadeOffset + offset;
};
