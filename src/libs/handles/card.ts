import CardImage from '@/components/common/card/cardImage/CardImage';
import CardRounded from '@/components/common/card/cardRounded/CardRounded';

export const CARD_VARIANTS = {
    IMAGE: 'image',
    ROUNDED: 'rounded',
} as const;

export const CARD_HANDLES = {
    [CARD_VARIANTS.IMAGE]: CardImage,
    [CARD_VARIANTS.ROUNDED]: CardRounded,
};
