import { HOMEPAGE_ENTRY } from '@/libs/data/adminEntryType';

import formProductListing from '@/components/admin/form/formProductListing/FormProductListing';

import { default as categories } from '@/components/admin/form/formCategories/FormCategoriesData';
import { default as homepageHighlight } from '@/components/admin/form/formHomepageHighlight/FormHomepageHighlightData';
import { default as homepageCarousel } from '@/components/admin/form/formHomepageCarousel/FormHomepageCarouselData';
import { default as productListing } from '@/components/admin/form/formProductListing/FormProductListingData';

export const ADMIN_ENTRY_VARIANTS = {
    HOMEPAGE: 'homepage',
    CATEGORIES: 'categories',
    HOMEPAGE_CAROUSEL: 'homepageCarousel',
    HOMEPAGE_HIGHLIGHT: 'homepageHighlight',
    PRODUCT_LISTING: 'productListing',
} as const;

export const ADMIN_ENTRY_HANDLES = {
    [ADMIN_ENTRY_VARIANTS.HOMEPAGE]: HOMEPAGE_ENTRY,
};

export const ADMIN_ENTRY_DATA_HANDLES = {
    categories,
    homepageCarousel,
    homepageHighlight,
    productListing,
};

export const ADMIN_ENTRY_EDIT_HANDLES = {
    [ADMIN_ENTRY_VARIANTS.HOMEPAGE]: formProductListing,
};
