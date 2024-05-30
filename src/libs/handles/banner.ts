import bannerSection from '@/components/common/banner/bannerSection/BannerSection';

export const BANNER_VARIANTS = {
    SECTION: 'section',
} as const;

export const BANNER_HANDLES = {
    [BANNER_VARIANTS.SECTION]: bannerSection,
};
