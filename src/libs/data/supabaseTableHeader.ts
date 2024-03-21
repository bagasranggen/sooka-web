import { INPUT_TYPE } from '@/libs/handles';

export type SupabaseHeaderProps = {
    slug: string;
    label: string;
    size?: string;
    align?: 'left' | 'center' | 'right';
    editType?: typeof INPUT_TYPE.TEXT | typeof INPUT_TYPE.SWITCH;
    isDetail?: boolean;
};

export const SUPABASE_HEADER_NAVIGATION: SupabaseHeaderProps[] = [
    {
        slug: 'label',
        label: 'Label',
        editType: 'text',
    },
    {
        slug: 'href',
        label: 'Href',
        editType: 'text',
    },
    {
        slug: 'target',
        label: 'Open New Tab',
        size: '130px',
        editType: 'switch',
        align: 'center',
    },
    {
        slug: 'is_show',
        label: 'Show',
        size: '80px',
        editType: 'switch',
        align: 'center',
    },
];

export const SUPABASE_HEADER_CATEGORIES: SupabaseHeaderProps[] = [
    {
        slug: 'label',
        label: 'Label',
        editType: 'text',
    },
    {
        slug: 'slug',
        label: 'Slug',
        editType: 'text',
    },
];

export const SUPABASE_HEADER_PAGES: SupabaseHeaderProps[] = [
    {
        slug: 'slug',
        label: 'Slug',
        editType: 'text',
        size: '20%',
    },
    {
        slug: 'title',
        label: 'Title',
        editType: 'text',
        size: '20%',
    },
    {
        slug: 'short_description',
        label: 'Short Description',
        editType: 'text',
        size: '50%',
    },
];

export const SUPABASE_HEADER_HOMEPAGE_CAROUSEL: SupabaseHeaderProps[] = [
    {
        slug: 'title',
        label: 'Title',
        editType: 'text',
        size: '30%',
    },
    {
        slug: 'href',
        label: 'Link',
        editType: 'text',
        size: '10%',
    },
    {
        slug: 'target',
        label: 'Open New Tab',
        editType: 'switch',
        align: 'center',
        size: '130px',
    },
    {
        slug: 'is_show',
        label: 'Show',
        editType: 'switch',
        align: 'center',
        size: '80px',
    },
    {
        slug: 'images',
        label: 'Images',
        editType: 'text',
        align: 'center',
        size: '30%',
    },
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
    {
        slug: 'images',
        label: 'Images',
        editType: 'text',
        size: '35%',
    },
];
