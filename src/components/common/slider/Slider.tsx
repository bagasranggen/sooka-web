import React from 'react';

import type { SliderImageProps } from "@/components/common/slider/sliderImage/SliderImage";
import { createDynamicElement } from "@/libs/factory";
import { SLIDER_HANDLES } from "@/libs/handles";

export type SliderProps = SliderImageProps;

const Slider = (props: SliderProps): React.ReactElement => createDynamicElement({
    handles: SLIDER_HANDLES,
    selector: props.variant,
    props,
});

export default Slider;