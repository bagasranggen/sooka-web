import React from 'react';
import { ButtonColorsProps, ClassnameArrayProps } from '@/libs/@types';
import { joinClassnameString } from '@/libs/utils';

export type RateMeterProps = {
    variant: 'meter';
    value: number;
    start: string;
    end: string;
    options?: {
        color?: Omit<ButtonColorsProps, 'dark'>;
    };
};

const RateMeter = ({ value, start, end, options }: RateMeterProps): React.ReactElement => {
    let rateClass: ClassnameArrayProps = ['rate rate--meter'];
    rateClass.push(`rate--${options?.color ?? 'primary'}`);
    rateClass = joinClassnameString(rateClass);

    const rateStyle: React.CSSProperties = { '--rate-level': `${value}%` } as React.CSSProperties;

    return (
        <div
            className={rateClass}
            style={rateStyle}>
            <div className="rate__label">{start}</div>
            <div className="rate__slider" />
            <div className="rate__label">{end}</div>
        </div>
    );
};

export default RateMeter;
