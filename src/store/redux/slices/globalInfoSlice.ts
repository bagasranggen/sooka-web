import type { IconType } from 'react-icons';
import type { LinkProps } from 'next/link';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CONTACT_NUMBER, FOOTER_ADDRESS, FOOTER_SOCIAL_MEDIA } from '@/libs/mock';

export interface GlobalInfoSocialState {
    icon: string;
    label: string;
    href: LinkProps['href'] | undefined;
}

export interface GlobalInfoSliceState {
    storeInfo: Record<'address' | 'openHour', string>;
    socialMedia: GlobalInfoSocialState[];
    contactNumber: string | undefined;
}

const initialState: GlobalInfoSliceState = {
    storeInfo: {
        address: FOOTER_ADDRESS.ADDRESS,
        openHour: FOOTER_ADDRESS.OPEN_HOUR
    },
    socialMedia: FOOTER_SOCIAL_MEDIA,
    contactNumber: CONTACT_NUMBER,
};

export const globalInfoSlice = createSlice({
    name: 'globalInfo',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
});