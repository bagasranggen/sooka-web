import RateMeter from '@/components/common/rate/rateMeter/RateMeter';

export const RATE_VARIANTS = {
    METER: 'meter',
} as const;

export const RATE_HANDLES = {
    [RATE_VARIANTS.METER]: RateMeter,
};
