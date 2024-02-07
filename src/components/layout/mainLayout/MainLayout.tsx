'use client';

import React from 'react';

import { Init } from '@/libs/animations/init';

export type MainLayoutProps = {
    children: React.ReactNode
};

const MainLayout = ({ children }: MainLayoutProps): React.ReactElement => {
    Init();

    return <>
        <main>
            {children}
        </main>
    </>;
};

export default MainLayout;