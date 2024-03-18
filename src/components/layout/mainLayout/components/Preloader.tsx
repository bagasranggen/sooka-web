import React, { useState } from 'react';
import { NavigationEvents } from '@/libs/utils';

import { default as PreloaderComponent } from '@/components/common/preloader/Preloader';

export type PreloaderProps = {};

const Preloader = ({}: PreloaderProps): React.ReactElement => {
    const [pageCount, setPageCount] = useState<number>(0);

    return (
        <>
            <NavigationEvents endHandler={() => setPageCount((prevState: number) => prevState + 1)} />
            <PreloaderComponent isOpen={pageCount <= 2} />
        </>
    );
};

export default Preloader;
