import dynamic from 'next/dynamic';

import { SUPABASE_VARIANTS } from '@/libs/handles/supabase';

const FormPages = dynamic(() => import('@/components/admin/form/formPages/FormPages'));
const FormHomepageCarousel = dynamic(() => import('@/components/admin/form/formHomepageCarousel/FormHomepageCarousel'));

export const ADMIN_FORM_HANDLES = {
    [SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL]: FormHomepageCarousel,
    [SUPABASE_VARIANTS.PAGES]: FormPages,
};
