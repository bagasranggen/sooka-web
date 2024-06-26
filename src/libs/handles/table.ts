import { SUPABASE_VARIANTS } from '@/libs/handles/supabase';

import TableAdmin from '@/components/common/table/tableAdmin/TableAdmin';
import TableAdminAdd from '@/components/common/table/tableAdminAdd/TableAdminAdd';
import TableAdminView from '@/components/common/table/tableAdminView/TableAdminView';

import TableNavigationForm from '@/components/common/table/sharedTable/TableNavigationForm';
import TableCategoriesForm from '@/components/common/table/sharedTable/TableCategoriesForm';
import TablePagesForm from '@/components/common/table/sharedTable/TablePagesForm';
import TableProductListingForm from '@/components/common/table/sharedTable/TableProductListingForm';
import TableHomepageCarouselForm from '@/components/common/table/sharedTable/TableHomepageCarouselForm';

export const TABLE_VARIANTS = {
    ADMIN: 'admin',
    ADMIN_ADD: 'admin-add',
    ADMIN_VIEW: 'admin-view',
} as const;

export const TABLE_HANDLES = {
    [TABLE_VARIANTS.ADMIN]: TableAdmin,
    [TABLE_VARIANTS.ADMIN_ADD]: TableAdminAdd,
    [TABLE_VARIANTS.ADMIN_VIEW]: TableAdminView,
};

export const TABLE_FORM_HANDLES = {
    [SUPABASE_VARIANTS.NAVIGATION]: TableNavigationForm,
    [SUPABASE_VARIANTS.CATEGORIES]: TableCategoriesForm,
    [SUPABASE_VARIANTS.PAGES]: TablePagesForm,
    [SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL]: TableHomepageCarouselForm,
    [SUPABASE_VARIANTS.PRODUCT_LISTING]: TableProductListingForm,
};
