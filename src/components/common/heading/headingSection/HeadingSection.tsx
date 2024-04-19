import React from 'react';

import { HEADING_VARIANTS } from '@/libs/handles';
import { joinClassnameString } from '@/libs/utils';
import { ClassnameArrayProps } from '@/libs/@types';

type HeadingTagProps = keyof Pick<React.JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'>;

export type HeadingSectionProps = {
    variant: typeof HEADING_VARIANTS.SECTION;
    className?: string;
    children: React.ReactNode;
    subTitle?: string | React.ReactNode;
    options?: {
        headingTag?: HeadingTagProps;
        subHeading?: HeadingTagProps;
    };
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
        <div className={headingClass}>
            <Heading className={titleClass}>{children}</Heading>
            {subTitle && <SubHeading className="heading__sub-title">{subTitle}</SubHeading>}
        </div>
    );
};

export default HeadingSection;
