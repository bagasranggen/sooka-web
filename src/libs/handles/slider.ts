import SliderImage from '@/components/common/slider/sliderImage/SliderImage';

export const SLIDER_VARIANTS = {
    IMAGE: 'image',
} as const;

export const SLIDER_HANDLES = {
    [SLIDER_VARIANTS.IMAGE]: SliderImage,
};
