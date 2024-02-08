import CardImage from '@/components/common/card/cardImage/CardImage';

export const CARD_VARIANTS = {
    IMAGE: 'image',
} as const;

export const CARD_HANDLES = {
    [CARD_VARIANTS.IMAGE]: CardImage,
};