import { HOMEPAGE_ENTRY } from '@/libs/data/adminEntryType';

export const ADMIN_ENTRY_VARIANTS = {
    HOMEPAGE: 'homepage',
} as const;

export const ADMIN_ENTRY_HANDLES = {
    [ADMIN_ENTRY_VARIANTS.HOMEPAGE]: HOMEPAGE_ENTRY,
};
