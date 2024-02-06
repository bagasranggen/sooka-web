import IconSooka from "@/components/common/icon/iconSooka/IconSooka";

export const ICON_VARIANTS = {
    SOOKA: 'sooka'
} as const;

export const ICON_HANDLES = {
    [ICON_VARIANTS.SOOKA]: IconSooka,
};