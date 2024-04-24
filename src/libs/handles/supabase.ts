import {
    SUPABASE_HEADER_CATEGORIES,
    SUPABASE_HEADER_HOMEPAGE_CAROUSEL,
    SUPABASE_HEADER_NAVIGATION,
    SUPABASE_HEADER_PAGES,
    SUPABASE_HEADER_PRODUCT_LISTING,
} from '@/libs/data';

export const SUPABASE_VARIANTS = {
    NAVIGATION: 'navigation',
    CATEGORIES: 'categories',
    PAGES: 'pages',
    HOMEPAGE_CAROUSEL: 'homepageCarousel',
    HOMEPAGE_HIGHLIGHT: 'homepageHighlight',
    PRODUCT_LISTING: 'productListing',
} as const;

export const SUPABASE_HANDLES = {
    [SUPABASE_VARIANTS.NAVIGATION]: 'Navigation',
    [SUPABASE_VARIANTS.CATEGORIES]: 'Categories',
    [SUPABASE_VARIANTS.PAGES]: 'Pages',
    [SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL]: 'Homepage Carousel',
    [SUPABASE_VARIANTS.HOMEPAGE_HIGHLIGHT]: 'Homepage Highlight',
    [SUPABASE_VARIANTS.PRODUCT_LISTING]: 'Product Listing',
};

export const SUPABASE_HEADER_HANDLES = {
    [SUPABASE_VARIANTS.CATEGORIES]: SUPABASE_HEADER_CATEGORIES,
    [SUPABASE_VARIANTS.NAVIGATION]: SUPABASE_HEADER_NAVIGATION,
    [SUPABASE_VARIANTS.PAGES]: SUPABASE_HEADER_PAGES,
    [SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL]: SUPABASE_HEADER_HOMEPAGE_CAROUSEL,
    [SUPABASE_VARIANTS.HOMEPAGE_HIGHLIGHT]: SUPABASE_HEADER_HOMEPAGE_CAROUSEL,
    [SUPABASE_VARIANTS.PRODUCT_LISTING]: SUPABASE_HEADER_PRODUCT_LISTING,
};
