import type { LinkProps } from 'next/link';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CONTACT, FOOTER_ADDRESS, FOOTER_SOCIAL_MEDIA } from '@/libs/mock';

export interface GlobalInfoSocialState {
    icon: string;
    label: string;
    href: LinkProps['href'] | undefined;
}

export interface GlobalInfoSliceState {
    isComingSoon: boolean;
    isDev: boolean;
    storeInfo: Record<'address' | 'openHour', string>;
    ffSpecialEvents: boolean;
    socialMedia: GlobalInfoSocialState[];
    contactNumber: string | undefined;
}

const initialState: GlobalInfoSliceState = {
    isComingSoon: process.env.NEXT_PUBLIC_IS_COMING_SOON === '1',
    isDev: process.env.NODE_ENV === 'development',
    storeInfo: {
        address: FOOTER_ADDRESS.ADDRESS,
        openHour: FOOTER_ADDRESS.OPEN_HOUR,
    },
    ffSpecialEvents: process.env.NEXT_PUBLIC_FF_SPECIAL_EVENTS === '1',
    socialMedia: FOOTER_SOCIAL_MEDIA,
    contactNumber: CONTACT.NUMBER,
};

export const globalInfoSlice = createSlice({
    name: 'globalInfo',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
});
