import * as slices from './slices';

export const reducer = {
    layout: slices.layoutSlice.reducer,
    globalInfo: slices.globalInfoSlice.reducer,
};
