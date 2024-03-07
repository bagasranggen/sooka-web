import { gsap } from 'gsap';
import { getAnimationElement } from '@/libs/utils/getAnimationElement';

export const getSpacingValue = ({ element }: { element: Element }) => {
    const el = getAnimationElement(element);
    const top = (gsap?.getProperty(el, 'margin-top') as number) ?? 0;
    const bottom = (gsap?.getProperty(el, 'margin-bottom') as number) ?? 0;

    return {
        top,
        bottom,
    };
};
