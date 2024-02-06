'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const NavigationEvents = ({ startHandler, endHandler }: {
    startHandler?: () => void;
    endHandler?: () => void
}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleStart = () => {
            // console.log('start');
            startHandler && startHandler();
        };
        const handleStop = () => {
            // console.log('end');
            endHandler && endHandler();
        };

        handleStop();

        return () => {
            handleStart();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ pathname, searchParams ]);

    return null;
};