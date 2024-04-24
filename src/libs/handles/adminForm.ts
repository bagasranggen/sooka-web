import dynamic from 'next/dynamic';

import { SUPABASE_VARIANTS } from '@/libs/handles/supabase';

const FormPages = dynamic(() => import('@/components/admin/form/formPages/FormPages'));
const FormHomepageCarousel = dynamic(() => import('@/components/admin/form/formHomepageCarousel/FormHomepageCarousel'));
const FormHomepageHighlight = dynamic(
    () => import('@/components/admin/form/formHomepageHighlight/FormHomepageHighlight')
);
const FormProductListing = dynamic(() => import('@/components/admin/form/formProductListing/FormProductListing'));

export const ADMIN_FORM_VARIANTS = {} as const;

export const ADMIN_FORM_HANDLES = {
    [SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL]: FormHomepageCarousel,
    [SUPABASE_VARIANTS.HOMEPAGE_HIGHLIGHT]: FormHomepageHighlight,
    [SUPABASE_VARIANTS.PAGES]: FormPages,
    [SUPABASE_VARIANTS.PRODUCT_LISTING]: FormProductListing,
};
