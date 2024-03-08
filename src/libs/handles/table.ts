import { SUPABASE_VARIANTS } from '@/libs/handles/supabase';

import TableAdmin from '@/components/common/table/tableAdmin/TableAdmin';
import TableAdminAdd from '@/components/common/table/tableAdminAdd/TableAdminAdd';
import TableNavigationForm from '@/components/common/table/tableAdminAdd/components/TableNavigationForm';

export const TABLE_VARIANTS = {
    ADMIN: 'admin',
    ADMIN_ADD: 'admin-add',
} as const;

export const TABLE_HANDLES = {
    [TABLE_VARIANTS.ADMIN]: TableAdmin,
    [TABLE_VARIANTS.ADMIN_ADD]: TableAdminAdd,
};

export const TABLE_FORM_HANDLES = {
    [SUPABASE_VARIANTS.NAVIGATION]: TableNavigationForm,
    [SUPABASE_VARIANTS.CATEGORIES]: TableNavigationForm,
};
