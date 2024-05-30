'use client';

import React, { Suspense } from 'react';

import { useAnimations } from '@/libs/animations';

import Preloader from '@/components/common/preloader/Preloader';

export type ComingSoonLayoutProps = {};

const ComingSoonLayout = ({}: ComingSoonLayoutProps): React.ReactElement => {
    // Initialize animations
    useAnimations();

    return (
        <Suspense fallback={<div className="preloader preloader--is-open" />}>
            <Preloader
                isOpen={true}
                options={{ loop: true }}>
                <h1 className="fw-light text-light">Coming Soon</h1>
            </Preloader>
        </Suspense>
    );
};

export default ComingSoonLayout;
