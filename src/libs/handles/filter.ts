import FilterProduct from '@/components/common/filter/filterProduct/FilterProduct';

export const FILTER_VARIANTS = {
    PRODUCT: 'product',
} as const;

export const FILTER_HANDLES = {
    [FILTER_VARIANTS.PRODUCT]: FilterProduct,
};