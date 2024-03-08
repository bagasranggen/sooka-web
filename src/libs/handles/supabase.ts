export const SUPABASE_VARIANTS = {
    NAVIGATION: 'navigation',
    CATEGORIES: 'categories',
} as const;

export const SUPABASE_HANDLES = {
    [SUPABASE_VARIANTS.NAVIGATION]: 'Navigation',
    [SUPABASE_VARIANTS.CATEGORIES]: 'Categories',
};
