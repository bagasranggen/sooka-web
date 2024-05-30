'use client';

import { useEffect } from 'react';
import { type ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import { pageTransitionSlice, selectPageTransition, useDispatch, useSelector } from '@/store/redux';

type NavigationEventUrlProp = {
    pathname: string;
    searchParams: ReadonlyURLSearchParams;
};

export const NavigationEvents = ({
    startHandler,
    endHandler,
}: {
    startHandler?: ({ pathname, searchParams }: NavigationEventUrlProp) => void;
    endHandler?: ({ pathname, searchParams }: NavigationEventUrlProp) => void;
}) => {
    const { page } = useSelector(selectPageTransition);
    const dispatch = useDispatch();

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleStart = () => {
            // console.log('start');
            startHandler && startHandler({ pathname, searchParams });
        };

        if (page.isTransitioning) handleStart();
    }, [page]);

    useEffect(() => {
        const handleStop = () => {
            // console.log('end');
            if (page.isTransitioning) {
                dispatch(pageTransitionSlice.actions.pageTransition({ count: page.count + 1, isTransitioning: false }));
            }
            endHandler && endHandler({ pathname, searchParams });
        };

        handleStop();
    }, [pathname, searchParams]);

    // useEffect(() => {
    //     const handleStart = () => {
    //         console.log('start');
    //         startHandler && startHandler();
    //     };
    //
    //     const handleStop = () => {
    //         console.log('end');
    //         endHandler && endHandler();
    //     };
    //
    //     handleStop();
    //
    //     return () => {
    //         handleStart();
    //     };
    //
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [pathname, searchParams]);

    return null;
};
