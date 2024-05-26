import * as slices from './slices';

export const reducer = {
    layout: slices.layoutSlice.reducer,
    globalInfo: slices.globalInfoSlice.reducer,
    modal: slices.modalSlice.reducer,
    pageTransition: slices.pageTransitionSlice.reducer,
};
