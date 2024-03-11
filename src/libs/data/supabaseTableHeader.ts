import { INPUT_TYPE } from '@/libs/handles';

export type SupabaseHeaderProps = {
    slug: string;
    label: string;
    size?: string;
    editType?: typeof INPUT_TYPE.TEXT | typeof INPUT_TYPE.SWITCH;
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
        label: 'Open new Tab',
        size: '130px',
        editType: 'switch',
    },
    {
        slug: 'is_show',
        label: 'Show',
        size: '80px',
        editType: 'switch',
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
