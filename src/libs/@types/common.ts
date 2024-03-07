import React from 'react';

import { LinkProps as NextLinkProps } from 'next/link';
import type { NumericRange, CreateArrayWithLengthX } from '@/libs/@types';

export type NavigationItemProps = NextLinkProps & { label: string; target?: '_blank' | '_self' };
export type NavigationProps = NavigationItemProps[];
export type PageProps = { entries: { [key: string]: string | number } };
export type DynamicPageProps = {
    params: Partial<{ slug: string; [key: string]: string }>;
    searchParams?: { [key: string]: string | string[] | undefined };
};
export type LinkProps = NextLinkProps & { openNewTab?: boolean };
export type ButtonColorsProps = 'dark' | 'light' | 'primary';
export type ButtonSizesProps = 'sm' | 'md' | 'lg';
export type ScreenProps = { width: number; height: number; orientation: 'landscape' | 'portrait' };
export type BreakpointsProps = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type SpacingDirectionProps = 'top' | 'bottom';
export type SpacingItemProps = NumericRange<CreateArrayWithLengthX<0>, 15>;
export type SpacingBreakpointsProps = Partial<Record<BreakpointsProps, SpacingItemProps>>;
export type SpacingProps = {
    spacing?: Partial<Record<SpacingDirectionProps, SpacingItemProps | SpacingBreakpointsProps>>;
};
export type ResponsiveClassProps = Partial<
    Record<'sm' | 'md' | 'lg' | 'xl' | 'xxl', NumericRange<CreateArrayWithLengthX<0>, 12>>
>;
export type PageParamsProps = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
};
export type WrapperProps = React.ExoticComponent<{ children?: React.ReactNode }>;
