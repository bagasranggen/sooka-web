import { configureStore } from '@reduxjs/toolkit';
import {
    useSelector as useReduxSelector,
    useDispatch as useReduxDispatch,
    type TypedUseSelectorHook,
} from 'react-redux';

import { reducer } from './rootReducer';
import { middleware } from './middleware';
import { ReduxDispatch, ReduxState } from '@/libs/@types';

export const reduxStore = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(middleware);
    },
});
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;
