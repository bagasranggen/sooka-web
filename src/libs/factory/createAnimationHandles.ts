import { BaseAnimationProps } from '@/libs/@types';

type CreateAnimationHandlesProps = {
    handles: string;
    animation: ({ element, config, id }: BaseAnimationProps) => void;
    extendTimeline?: boolean;
};

export const createAnimationHandles = ({ handles, animation, extendTimeline }: CreateAnimationHandlesProps) => {
    return {
        [handles]: {
            animation,
            extendTimeline: !!extendTimeline,
        },
    };
};
