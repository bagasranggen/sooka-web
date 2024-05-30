import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PageTransitionState {
    page: {
        count: number;
        isTransitioning: boolean;
    };
}

const initialState: PageTransitionState = {
    page: {
        count: 0,
        isTransitioning: false,
    },
};

export const pageTransitionSlice = createSlice({
    name: 'pageTransition',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        pageTransition: (state, action: PayloadAction<Partial<PageTransitionState['page']>>) => {
            state.page = { ...state.page, ...action.payload };
        },
    },
});
