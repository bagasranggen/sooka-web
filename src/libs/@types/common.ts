import React from 'react';

import { LinkProps as NextLinkProps } from "next/link";
import type { NumericRange, CreateArrayWithLengthX } from '@/libs/@types';

export type NavigationItemProps = { url: string, label: string };
export type LinkProps = NextLinkProps & { openNewTab?: boolean }
export type ScreenProps = { width: number; height: number; orientation: 'landscape' | 'portrait'; };
export type BreakpointsProps = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type SpacingDirectionProps = 'top' | 'bottom';
export type SpacingItemProps = NumericRange<CreateArrayWithLengthX<0>, 15>;
export type SpacingBreakpointsProps = Partial<Record<BreakpointsProps, SpacingItemProps>>
export type SpacingProps = {
    spacing?: Partial<Record<SpacingDirectionProps, SpacingItemProps | SpacingBreakpointsProps>>
};
export type PageParamsProps = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}
export type WrapperProps = React.ExoticComponent<{ children?: React.ReactNode; }>