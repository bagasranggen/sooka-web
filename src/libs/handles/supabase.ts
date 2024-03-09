export const SUPABASE_VARIANTS = {
    NAVIGATION: 'navigation',
    CATEGORIES: 'categories',
} as const;

export const SUPABASE_HANDLES = {
    [SUPABASE_VARIANTS.NAVIGATION]: 'Navigation',
    [SUPABASE_VARIANTS.CATEGORIES]: 'Categories',
};

export const SUPABASE_COLUMN_NAME_HANDLES = {
    label: { label: 'Label' },
    slug: { label: 'Slug' },
    href: { label: 'Href' },
    target: { label: 'Open new tab', size: '120px' },
    is_show: { label: 'Show', size: '80px' },
};
