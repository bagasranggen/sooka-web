import HeadingSection from '@/components/common/heading/headingSection/HeadingSection';

export const HEADING_VARIANTS = {
    SECTION: 'section',
} as const;

export const HEADING_HANDLES = {
    [HEADING_VARIANTS.SECTION]: HeadingSection,
};
