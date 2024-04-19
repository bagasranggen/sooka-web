import React from 'react';

import type { ClassnameArrayProps, CreateArrayWithLengthX, NumericRange } from '@/libs/@types';
import { HEADING_VARIANTS } from '@/libs/handles';
import { joinClassnameString } from '@/libs/utils';
import { createAnimation } from '@/libs/factory';

import { Col, ColProps, Row } from 'react-bootstrap';

type HeadingTagProps = keyof Pick<React.JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'>;

export type HeadingSectionOffset = {
    offset: NumericRange<CreateArrayWithLengthX<0>, 2>;
    offsetAlign: 'left' | 'center' | 'right';
    children: React.ReactNode;
};

export type HeadingSectionProps = {
    variant: typeof HEADING_VARIANTS.SECTION;
    className?: string;
    children: React.ReactNode;
    subTitle?: string | React.ReactNode;
    options?: {
        headingTag?: HeadingTagProps;
        subHeading?: HeadingTagProps;
    } & Partial<Omit<HeadingSectionOffset, 'children'>>;
};

const HeadingSectionOffset = ({ offset, offsetAlign, children }: HeadingSectionOffset): React.ReactElement => {
    let rowClass: ClassnameArrayProps = [];
    if (offsetAlign === 'center') rowClass.push('justify-content-center');
    if (offsetAlign === 'right') rowClass.push('justify-content-end');
    rowClass = joinClassnameString(rowClass);

    let colProps: ColProps = {
        xl: 12 - offset * 2,
        md: 12 - offset,
    };

    if (offset > 0)
        return (
            <Row {...(rowClass ? { className: rowClass } : {})}>
                <Col {...colProps}>{children}</Col>
            </Row>
        );

    return <>{children}</>;
};

const HeadingSection = ({ className, children, subTitle, options }: HeadingSectionProps): React.ReactElement => {
    let Heading: keyof React.JSX.IntrinsicElements = 'h1';
    if (options?.headingTag) Heading = options.headingTag;

    let SubHeading: keyof React.JSX.IntrinsicElements | React.ExoticComponent = 'p';
    if (options?.subHeading) SubHeading = options.subHeading;
    if (typeof subTitle === 'object') SubHeading = React.Fragment;

    let headingClass: ClassnameArrayProps = ['heading', 'heading--section'];
    if (className) headingClass.push(className);
    headingClass = joinClassnameString(headingClass);

    let titleClass: ClassnameArrayProps = ['heading__title'];
    if (subTitle) titleClass.push('mb-lg-1');
    titleClass = joinClassnameString(titleClass);

    return (
        <HeadingSectionOffset
            offset={options?.offset ?? 0}
            offsetAlign={options?.offsetAlign ?? 'left'}>
            <div className={headingClass}>
                <Heading
                    className={titleClass}
                    {...createAnimation({ type: 'fade-in' })}>
                    {children}
                </Heading>
                {subTitle && (
                    <SubHeading
                        className="heading__sub-title"
                        {...createAnimation({ type: 'fade-in', delay: 0.075 })}>
                        {subTitle}
                    </SubHeading>
                )}
            </div>
        </HeadingSectionOffset>
    );
};

export default HeadingSection;
