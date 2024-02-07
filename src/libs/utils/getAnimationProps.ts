import { COMMON_ANIMATIONS } from '@/libs/handles';

export const getAnimationProps = (element: HTMLElement) => ({
    ...element?.getAttribute(COMMON_ANIMATIONS.ATTRIBUTES.DELAY) ? { delay: element?.getAttribute(COMMON_ANIMATIONS.ATTRIBUTES.DELAY) } : {},
});