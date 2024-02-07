import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface LayoutSliceState {
    height: Partial<Record<'--navigation-height' | '--footer-height', string>>;
}

const initialState: LayoutSliceState = {
    height: {},
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        layoutHeight: (state, action: PayloadAction<LayoutSliceState['height']>) => {

            const updatedStyle: any = { ...state.height, ...action.payload };

            if (typeof document !== 'undefined') {
                const body = document.querySelector('body');
                Object.keys(updatedStyle).map((key: string) => {
                    body?.style.setProperty(key, updatedStyle[key]);
                });
            }

            state.height = updatedStyle;
        },
    },
});