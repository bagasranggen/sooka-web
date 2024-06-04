import React from 'react';

import { ALERT_VARIANTS } from '@/libs/handles';
import type { ClassnameArrayProps } from '@/libs/@types';
import { joinClassnameString } from '@/libs/utils';

export type AlertRoundedProps = {
    variant: typeof ALERT_VARIANTS.ROUNDED;
    className?: string;
    children?: React.ReactNode;
};

const AlertRounded = ({ className, children }: AlertRoundedProps): React.ReactElement | null => {
    if (!children) return null;

    let alertClass: ClassnameArrayProps = ['alert alert--rounded'];
    if (className) alertClass.push(className);
    alertClass = joinClassnameString(alertClass);

    return (
        <div
            className={alertClass}
            role="alert">
            {children}
        </div>
    );
};

export default AlertRounded;
