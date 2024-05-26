import { ReduxState } from '@/libs/@types';

export const selectGlobalInfo = (state: ReduxState) => state.globalInfo;
export const selectLayout = (state: ReduxState) => state.layout;
export const selectModal = (state: ReduxState) => state.modal;
export const selectPageTransition = (state: ReduxState) => state.pageTransition;
