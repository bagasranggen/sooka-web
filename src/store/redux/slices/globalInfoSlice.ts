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
    storeInfo: Record<'address' | 'openHour', string>;
    socialMedia: GlobalInfoSocialState[];
    contactNumber: string | undefined;
}

const initialState: GlobalInfoSliceState = {
    isComingSoon: process.env.NEXT_PUBLIC_IS_COMING_SOON === '1',
    storeInfo: {
        address: FOOTER_ADDRESS.ADDRESS,
        openHour: FOOTER_ADDRESS.OPEN_HOUR,
    },
    socialMedia: FOOTER_SOCIAL_MEDIA,
    contactNumber: CONTACT.NUMBER,
};

export const globalInfoSlice = createSlice({
    name: 'globalInfo',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
});
