'use client';

import React, { Suspense, useState } from 'react';

import { Init } from '@/libs/animations/init';
import { NavigationEvents } from '@/libs/utils';

// import Preloader from '@/components/layout/mainLayout/components/Preloader';
import Preloader from '@/components/common/preloader/Preloader';

export type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps): React.ReactElement => {
    Init();

    const [pageCount, setPageCount] = useState<number>(0);

    console.log(pageCount);

    return (
        <>
            <Suspense fallback={null}>
                <NavigationEvents
                    startHandler={() => {
                        console.log('start');
                        Init('#test');
                    }}
                    endHandler={() => setPageCount((prevState: number) => prevState + 1)}
                />
                <Preloader
                    id="test"
                    isOpen={pageCount <= 2}
                />
                {/*<Preloader />*/}
            </Suspense>
            <main>{children}</main>
        </>
    );
};

export default MainLayout;
