import SliderImage from '@/components/common/slider/sliderImage/SliderImage';
import SliderVertical from '@/components/common/slider/sliderVertical/SliderVertical';

export const SLIDER_VARIANTS = {
    IMAGE: 'image',
    VERTICAL: 'vertical',
} as const;

export const SLIDER_HANDLES = {
    [SLIDER_VARIANTS.IMAGE]: SliderImage,
    [SLIDER_VARIANTS.VERTICAL]: SliderVertical,
};
