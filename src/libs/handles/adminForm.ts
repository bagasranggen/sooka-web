import { SUPABASE_VARIANTS } from '@/libs/handles/supabase';

import FormPages from '@/components/admin/form/formPages/FormPages';
import FormHomepageCarousel from '@/components/admin/form/formHomepageCarousel/FormHomepageCarousel';

export const ADMIN_FORM_HANDLES = {
    [SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL]: FormHomepageCarousel,
    [SUPABASE_VARIANTS.PAGES]: FormPages,
};
