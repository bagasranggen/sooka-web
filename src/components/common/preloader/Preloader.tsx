import React from 'react';

import Icon from "@/components/common/icon/Icon";
import { createAnimation } from "@/libs/factory";

export type PreloaderProps = {
    isOpen: boolean;
};

const Preloader = ({ isOpen }: PreloaderProps): React.ReactElement => {
    const preloaderIsOpen = isOpen ? ' preloader--is-open' : '';
    const preloaderClass = `preloader${preloaderIsOpen}`;

    return <div
        className={preloaderClass}
        {...createAnimation({ type: 'preloader' })}>
        <div className="preloader__icon">
            <Icon
                variant="cake"
                id="preloader"
                color="light" />
        </div>
    </div>;
};

export default Preloader;