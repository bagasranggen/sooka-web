'use client';

import React, { useState } from 'react';

import { Init } from '@/libs/animations/init';
import { NavigationEvents } from '@/libs/utils';

import Preloader from '@/components/common/preloader/Preloader';

export type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps): React.ReactElement => {
    Init();

    const [pageCount, setPageCount] = useState<number>(0);

    return (
        <>
            <NavigationEvents endHandler={() => setPageCount((prevState: number) => prevState + 1)} />
            <Preloader isOpen={pageCount <= 2} />
            <main>{children}</main>
        </>
    );
};

export default MainLayout;
