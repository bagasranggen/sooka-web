import React from 'react';
import { joinClassnameString } from '@/libs/utils';

type ButtonGroupProps = {
    className?: string;
    children: React.ReactNode;
};

const ButtonGroup = ({ className, children }: ButtonGroupProps): React.ReactElement => {
    let btnClass: string | string[] = ['btn-wrapper'];
    if (className) btnClass.push(className);
    btnClass = joinClassnameString(btnClass);

    return <div className={btnClass}>{children}</div>;
};

export { ButtonGroup };
