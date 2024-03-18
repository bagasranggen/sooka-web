import React from 'react';

import Icon from '@/components/common/icon/Icon';
import { createAnimation } from '@/libs/factory';

export type PreloaderProps = {
    id?: string;
    isOpen: boolean;
};

const Preloader = ({ id, isOpen }: PreloaderProps): React.ReactElement => {
    const preloaderIsOpen = isOpen ? ' preloader--is-open' : '';
    const preloaderClass = `preloader${preloaderIsOpen}`;

    return (
        <div
            {...(id ? { id: id } : {})}
            className={preloaderClass}
            {...createAnimation({ type: 'preloader' })}
            suppressHydrationWarning={true}>
            <div
                className="preloader__icon"
                suppressHydrationWarning={true}>
                <Icon
                    variant="cake"
                    id="preloader"
                    color="light"
                />
            </div>
        </div>
    );
};

export default Preloader;
