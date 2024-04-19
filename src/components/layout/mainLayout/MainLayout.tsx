'use client';

import React, { Suspense, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Init } from '@/libs/animations/init';
import { NavigationEvents } from '@/libs/utils';
import { selectGlobalInfo, useSelector } from '@/store/redux';

import Preloader from '@/components/common/preloader/Preloader';

import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '@/assets/styles/css/nprogress.css';

export type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps): React.ReactElement => {
    const { isDev } = useSelector(selectGlobalInfo);

    const animationRun = useRef<any>(null);
    const page = useRef<any>(null);

    const pathname = usePathname();
    const section = `section section-${pathname.replace(/\//g, '-')}`;

    const [pageCount, setPageCount] = useState<number>(0);

    nProgress.configure({ showSpinner: false });

    return (
        <>
            <Suspense fallback={<div className="preloader preloader--is-open" />}>
                <NavigationEvents
                    startHandler={() => nProgress.start()}
                    endHandler={() => nProgress.done()}
                />
                <NavigationEvents
                    endHandler={() => {
                        if (page.current !== pathname) {
                            animationRun.current = false;
                            page.current = pathname;
                        }

                        if (!animationRun.current) {
                            Init({
                                callback: () => {
                                    animationRun.current = true;
                                },
                            });
                        }

                        setPageCount((prevState: number) => prevState + 1);
                    }}
                />
                {!isDev && <Preloader isOpen={pageCount <= 2} />}
            </Suspense>
            <main className={section}>{children}</main>
        </>
    );
};

export default MainLayout;
