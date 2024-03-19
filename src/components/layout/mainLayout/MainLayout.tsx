'use client';

import React, { Suspense, useState } from 'react';

import { Init } from '@/libs/animations/init';
import { NavigationEvents } from '@/libs/utils';

import Preloader from '@/components/common/preloader/Preloader';

export type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps): React.ReactElement => {
    const [pageCount, setPageCount] = useState<number>(0);

    return (
        <>
            <Suspense fallback={null}>
                <NavigationEvents
                    endHandler={() => {
                        Init();
                        setPageCount((prevState: number) => prevState + 1);
                    }}
                />
                <Preloader isOpen={pageCount <= 2} />
            </Suspense>
            <main>{children}</main>
        </>
    );
};

export default MainLayout;
