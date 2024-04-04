import { INPUT_TYPE } from '@/libs/handles';

export type SupabaseHeaderProps = {
    slug: string;
    label: string;
    size?: string;
    align?: 'left' | 'center' | 'right';
    editType?: typeof INPUT_TYPE.TEXT | typeof INPUT_TYPE.SWITCH;
    isDetail?: boolean;
    isHidden?: boolean;
} & Pick<SupabaseCommonProps, 'relation'>;

export type SupabaseCommonKeyProps = 'SLUG' | 'IS_SHOW' | 'TARGET' | 'LINK' | 'IMAGES' | 'TITLE' | 'LABEL';

type SupabaseCommonProps = {
    size?: string;
    relation?: string;
    aliasLabel?: string;
};

export const SUPABASE_COMMON = ({
    size,
    relation,
    aliasLabel,
}: SupabaseCommonProps): Record<SupabaseCommonKeyProps, SupabaseHeaderProps[]> => ({
    SLUG: [
        {
            slug: 'slug',
            label: aliasLabel ?? 'Slug',
            editType: 'text',
            ...(size ? { size: size } : {}),
            ...(relation ? { relation: relation } : {}),
        },
    ],
    IS_SHOW: [{ slug: 'is_show', label: 'Show', size: '80px', editType: 'switch', align: 'center' }],
    TARGET: [{ slug: 'target', label: 'Open New Tab', size: '130px', editType: 'switch', align: 'center' }],
    LINK: [{ slug: 'href', label: 'Link', editType: 'text', ...(size ? { size: size } : {}) }],
    IMAGES: [{ slug: 'images', label: 'Images', editType: 'text', ...(size ? { size: size } : {}) }],
    TITLE: [{ slug: 'title', label: 'Title', editType: 'text', ...(size ? { size: size } : {}) }],
    LABEL: [{ slug: 'label', label: 'Label', editType: 'text', ...(relation ? { relation: relation } : {}) }],
});

export const SUPABASE_HEADER_NAVIGATION: SupabaseHeaderProps[] = [
    ...SUPABASE_COMMON({ relation: 'categories_label' }).LABEL,
    ...SUPABASE_COMMON({ relation: 'categories_slug', aliasLabel: 'Link' }).SLUG,
    ...SUPABASE_COMMON({}).TARGET,
    ...SUPABASE_COMMON({}).IS_SHOW,
    {
        slug: 'categories_label',
        label: 'Categories Label',
        editType: 'text',
        isHidden: true,
    },
];

export const SUPABASE_HEADER_CATEGORIES: SupabaseHeaderProps[] = [
    ...SUPABASE_COMMON({}).LABEL,
    ...SUPABASE_COMMON({}).SLUG,
];

export const SUPABASE_HEADER_PAGES: SupabaseHeaderProps[] = [
    ...SUPABASE_COMMON({ size: '16%' }).SLUG,
    ...SUPABASE_COMMON({ size: '20%' }).TITLE,
    {
        slug: 'short_description',
        label: 'Short Description',
        editType: 'text',
        size: '50%',
    },
];

export const SUPABASE_HEADER_HOMEPAGE_CAROUSEL: SupabaseHeaderProps[] = [
    ...SUPABASE_COMMON({ size: '30%' }).TITLE,
    ...SUPABASE_COMMON({ size: '10%' }).LINK,
    ...SUPABASE_COMMON({}).TARGET,
    ...SUPABASE_COMMON({}).IS_SHOW,
    ...SUPABASE_COMMON({ size: '30%' }).IMAGES,
];

export const SUPABASE_HEADER_PRODUCT_LISTING: SupabaseHeaderProps[] = [
    {
        slug: 'name',
        label: 'Name',
        editType: 'text',
        size: '35%',
    },
    {
        slug: 'category',
        label: 'Category',
        editType: 'text',
        size: '12%',
    },
    {
        slug: 'ingredients',
        label: 'Ingredients',
        editType: 'text',
        size: '30%',
        isDetail: true,
    },
    {
        slug: 'package',
        label: 'Package',
        editType: 'text',
        size: '30%',
        isDetail: true,
    },
    ...SUPABASE_COMMON({ size: '35%' }).IMAGES,
];
