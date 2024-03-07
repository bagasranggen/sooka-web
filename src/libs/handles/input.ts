import InputFloating from '@/components/common/input/inputFloating/InputFloating';

export const INPUT_VARIANTS = {
    FLOATING: 'floating',
} as const;

export const INPUT_HANDLES = {
    [INPUT_VARIANTS.FLOATING]: InputFloating,
};
