'use client';

import React, { Suspense } from 'react';

import { Init } from '@/libs/animations/init';
import { NavigationEvents } from '@/libs/utils';

import Preloader from '@/components/common/preloader/Preloader';

export type ComingSoonLayoutProps = {};

const ComingSoonLayout = ({}: ComingSoonLayoutProps): React.ReactElement => {
    return (
        <Suspense fallback={<div className="preloader preloader--is-open" />}>
            <NavigationEvents endHandler={Init} />
            <Preloader
                isOpen={true}
                options={{ loop: true }}>
                <h1 className="fw-light text-light">Coming Soon</h1>
            </Preloader>
        </Suspense>
    );
};

export default ComingSoonLayout;
