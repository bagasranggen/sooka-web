'use client';

import React, { Suspense, useRef, useState } from 'react';

import type { ClassnameArrayProps } from '@/libs/@types';
import { Init } from '@/libs/animations/init';
import { joinClassnameString, NavigationEvents } from '@/libs/utils';
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
    const section = useRef<string>('');

    const [pageCount, setPageCount] = useState<number>(0);

    // Initialize progress bar
    nProgress.configure({ showSpinner: false });

    return (
        <>
            <Suspense fallback={<div className="preloader preloader--is-open" />}>
                <NavigationEvents
                    startHandler={() => nProgress.start()}
                    endHandler={() => nProgress.done()}
                />
                <NavigationEvents
                    startHandler={() => nProgress.start()}
                    endHandler={({ pathname }) => {
                        let currentSection: ClassnameArrayProps = ['section'];
                        if (pathname !== '/') currentSection.push(`section-${pathname.replace(/\//g, '-')}`);
                        currentSection = joinClassnameString(currentSection);

                        if (pathname !== '/') section.current = currentSection;
                    }}
                />
                <NavigationEvents
                    endHandler={({ pathname }) => {
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
            <main {...(section.current ? { className: section.current } : {})}>{children}</main>
        </>
    );
};

export default MainLayout;
