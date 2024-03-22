'use client';

import React, { Suspense, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Init } from '@/libs/animations/init';
import { NavigationEvents } from '@/libs/utils';

import Preloader from '@/components/common/preloader/Preloader';

export type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps): React.ReactElement => {
    const pathname = usePathname();
    const section = `section section-${pathname.replace(/\//g, '-')}`;

    const [pageCount, setPageCount] = useState<number>(0);

    return (
        <>
            <Suspense fallback={<div className="preloader preloader--is-open" />}>
                <NavigationEvents
                    endHandler={() => {
                        Init();
                        setPageCount((prevState: number) => prevState + 1);
                    }}
                />
                <Preloader isOpen={pageCount <= 2} />
            </Suspense>
            <main className={section}>{children}</main>
        </>
    );
};

export default MainLayout;
