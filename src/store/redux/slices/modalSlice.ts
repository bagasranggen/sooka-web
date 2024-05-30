import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { MODAL_VARIANTS } from '@/libs/handles';

export type ModalConfirmState = {
    id: number;
    // title: string;
};

export type ModalState = {
    isShow?: (typeof MODAL_VARIANTS)[keyof typeof MODAL_VARIANTS];
    data?: {
        confirm?: ModalConfirmState;
    };
};

const initialState: ModalState = {
    isShow: undefined,
    data: {},
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        modalActive: (state, action: PayloadAction<ModalState['isShow']>) => {
            state.isShow = action.payload;
        },
        modalConfirmSetData: (state, action: PayloadAction<ModalConfirmState>) => {
            state.data = { confirm: action.payload };
        },
        modalReset: (state) => {
            state.isShow = initialState.isShow;
            state.data = initialState.data;
        },
    },
});
