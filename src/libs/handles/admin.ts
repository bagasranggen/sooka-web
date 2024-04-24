import { HOMEPAGE_ENTRY } from '@/libs/data/adminEntryType';

import formProductListing from '@/components/admin/form/formProductListing/FormProductListing';

import { default as productListing } from '@/components/admin/form/formProductListing/FormProductListingData';
import { default as homepageHighlight } from '@/components/admin/form/formHomepageHighlight/FormHomepageHighlightData';

export const ADMIN_ENTRY_VARIANTS = {
    HOMEPAGE: 'homepage',
    HOMEPAGE_HIGHLIGHT: 'homepageHighlight',
    PRODUCT_LISTING: 'productListing',
} as const;

export const ADMIN_ENTRY_HANDLES = {
    [ADMIN_ENTRY_VARIANTS.HOMEPAGE]: HOMEPAGE_ENTRY,
};

export const ADMIN_ENTRY_DATA_HANDLES = {
    productListing,
    homepageHighlight,
};

export const ADMIN_ENTRY_EDIT_HANDLES = {
    [ADMIN_ENTRY_VARIANTS.HOMEPAGE]: formProductListing,
};
