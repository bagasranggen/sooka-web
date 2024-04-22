import { HOMEPAGE_ENTRY } from '@/libs/data/adminEntryType';

import formProductListing from '@/components/admin/form/formProductListing/FormProductListing';

import { default as productListing } from '@/components/admin/form/formProductListing/FormProductListingData';

export const ADMIN_ENTRY_VARIANTS = {
    HOMEPAGE: 'homepage',
    PRODUCT_LISTING: 'productListing',
} as const;

export const ADMIN_ENTRY_HANDLES = {
    [ADMIN_ENTRY_VARIANTS.HOMEPAGE]: HOMEPAGE_ENTRY,
};

export const ADMIN_ENTRY_DATA_HANDLES = {
    productListing,
};

export const ADMIN_ENTRY_EDIT_HANDLES = {
    [ADMIN_ENTRY_VARIANTS.HOMEPAGE]: formProductListing,
};
