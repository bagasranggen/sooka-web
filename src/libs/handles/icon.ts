import IconSooka from '@/components/common/icon/iconSooka/IconSooka';
import IconCake from '@/components/common/icon/iconCake/IconCake';

export const ICON_VARIANTS = {
    SOOKA: 'sooka',
    CAKE: 'cake',
} as const;

export const ICON_HANDLES = {
    [ICON_VARIANTS.SOOKA]: IconSooka,
    [ICON_VARIANTS.CAKE]: IconCake,
};
