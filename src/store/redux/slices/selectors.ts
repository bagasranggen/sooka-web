import { ReduxState } from '@/libs/@types';

export const selectGlobalInfo = (state: ReduxState) => state.globalInfo;
export const selectLayout = (state: ReduxState) => state.layout;
export const selectPageTransition = (state: ReduxState) => state.pageTransition;
