import React from 'react';

import Icon from '@/components/common/icon/Icon';
import { createAnimation } from '@/libs/factory';
import type { PreloaderAnimationProps } from '@/libs/@types';

export type PreloaderProps = {
    id?: string;
    isOpen: boolean;
    children?: React.ReactNode;
    options?: Pick<PreloaderAnimationProps, 'loop'>;
};

const Preloader = ({ id, isOpen, children, options }: PreloaderProps): React.ReactElement => {
    const preloaderIsOpen = isOpen ? ' preloader--is-open' : '';
    const preloaderClass = `preloader${preloaderIsOpen}`;

    return (
        <div
            {...(id ? { id: id } : {})}
            className={preloaderClass}
            {...createAnimation({
                type: 'preloader',
                ...(options?.loop ? { loop: options.loop } : {}),
            })}
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
            {children ? <div className="preloader__text">{children}</div> : null}
        </div>
    );
};

export default Preloader;
