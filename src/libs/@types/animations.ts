import { COMMON_ANIMATIONS } from '@/libs/handles';

export type BaseAnimationProps = {
    element: HTMLElement[] | Element[] | any;
    config?: any;
    id?: number | string;
}

export type AnimationTypeProps = typeof COMMON_ANIMATIONS.TYPE[keyof typeof COMMON_ANIMATIONS.TYPE];

export type AnimationButtonProps = typeof COMMON_ANIMATIONS.BUTTON[keyof typeof COMMON_ANIMATIONS.BUTTON];

export type AnimationProps = {
    type: AnimationTypeProps | AnimationButtonProps;
    delay?: number;
}
//
// export type BlendingAnimationColorProps = typeof COMMON_COLOR[keyof typeof COMMON_COLOR];
//
// export type MarqueeAnimationProps = {
//     type: typeof COMMON_ANIMATIONS.TYPE['marquee'];
//     variant?: typeof MARQUEE_ANIMATION.VARIANTS[keyof typeof MARQUEE_ANIMATION.VARIANTS];
//     spacing?: number;
//     speed?: number;
// };
//
// export type BlendingAnimationProps = {
//     type: typeof COMMON_ANIMATIONS.TYPE['blendingBackground'];
//     background: BlendingAnimationColorProps | string;
// }
//
// export type AnimationParameterProps = {
//     animation?: AnimationProps;
//     background?: BlendingAnimationProps['background'];
// }