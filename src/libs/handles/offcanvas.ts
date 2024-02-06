import OffcanvasNavigation from "@/components/layout/offcanvas/offcanvasNavigation/OffcanvasNavigation";

export const OFFCANVAS_VARIANTS = {
    NAVIGATION: 'navigation',
} as const;

export const OFFCANVAS_HANDLES = {
    [OFFCANVAS_VARIANTS.NAVIGATION]: OffcanvasNavigation,
};