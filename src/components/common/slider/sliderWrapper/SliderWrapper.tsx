import React from 'react';
import { joinClassnameString } from '@/libs/utils';

export type SliderWrapperProps = {
    className?: string;
    children: React.ReactNode;
    option?: {
        nested?: boolean;
    };
};

const SliderWrapper = ({ className, children, option }: SliderWrapperProps): React.ReactElement => {
    let sliderClass: string | string[] = ['slider-wrapper'];
    if (className) sliderClass.push(className);
    if (option?.nested) sliderClass.push('slider-wrapper--nested');
    sliderClass = joinClassnameString(sliderClass);

    return <div className={sliderClass}>{children}</div>;
};

export default SliderWrapper;
