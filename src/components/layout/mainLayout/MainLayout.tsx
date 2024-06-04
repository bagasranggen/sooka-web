'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';

import type { ClassnameArrayProps } from '@/libs/@types';
import { joinClassnameString, NavigationEvents } from '@/libs/utils';
import { initAnimations, useAnimations } from '@/libs/animations';
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

    const [pageCount, setPageCount] = useState<number>(0);

    const section = useRef<string>('');

    // Initialize progress bar
    nProgress.configure({ showSpinner: false });

    // Initialize animations
    useAnimations();

    // Make sure animation preloader run
    useEffect(() => {
        if (pageCount <= 2) {
            const context = initAnimations('.preloader--is-open');
            return () => context.revert();
        }
    }, [pageCount]);

    return (
        <>
            <Suspense fallback={<div className="preloader preloader--is-open" />}>
                {/* Progress bar */}
                <NavigationEvents
                    startHandler={() => nProgress.start()}
                    endHandler={() => nProgress.done()}
                />
                {/* Set page section */}
                <NavigationEvents
                    endHandler={({ pathname }) => {
                        let currentSection: ClassnameArrayProps = ['section'];
                        if (pathname !== '/') currentSection.push(`section-${pathname.replace(/\//g, '-')}`);
                        currentSection = joinClassnameString(currentSection);

                        if (pathname !== '/') section.current = currentSection;
                    }}
                />
                {/* Detect page change count */}
                <NavigationEvents
                    endHandler={({ pathname }) => {
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
