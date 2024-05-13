import ListAdminNavigation from '@/components/common/list/listAdminNavigation/ListAdminNavigation';
import ListPoint from '@/components/common/list/listPoint/ListPoint';

export const LIST_VARIANTS = {
    ADMIN_NAVIGATION: 'admin-navigation',
    POINT: 'point',
} as const;

export const LIST_HANDLES = {
    [LIST_VARIANTS.ADMIN_NAVIGATION]: ListAdminNavigation,
    [LIST_VARIANTS.POINT]: ListPoint,
};
