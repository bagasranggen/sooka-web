import ListAdminNavigation from '@/components/common/list/listAdminNavigation/ListAdminNavigation';

export const LIST_VARIANTS = {
    ADMIN_NAVIGATION: 'admin-navigation',
} as const;

export const LIST_HANDLES = {
    [LIST_VARIANTS.ADMIN_NAVIGATION]: ListAdminNavigation,
};
