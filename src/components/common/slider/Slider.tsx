import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { SLIDER_HANDLES } from '@/libs/handles';

import type { SliderImageProps } from '@/components/common/slider/sliderImage/SliderImage';
import type { SliderVerticalProps } from '@/components/common/slider/sliderVertical/SliderVertical';

export type SliderProps = SliderImageProps | SliderVerticalProps;

const Slider = (props: SliderProps): React.ReactElement =>
    createDynamicElement({
        handles: SLIDER_HANDLES,
        selector: props.variant,
        props,
    });

export default Slider;

export type * from '@/components/common/slider/sliderImage/SliderImage';
export type * from '@/components/common/slider/sliderVertical/SliderVertical';
