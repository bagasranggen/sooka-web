import { ReduxState } from '@/libs/@types';

export const selectLayout = (state: ReduxState) => state.layout;
export const selectGlobalInfo = (state: ReduxState) => state.globalInfo;
