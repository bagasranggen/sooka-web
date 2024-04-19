import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { HEADING_HANDLES } from '@/libs/handles';

import type { HeadingSectionProps } from '@/components/common/heading/headingSection/HeadingSection';

export type HeadingProps = HeadingSectionProps;

const Heading = (props: HeadingProps): React.ReactElement =>
    createDynamicElement({
        handles: HEADING_HANDLES,
        selector: props.variant,
        props,
    });

export default Heading;
export type * from '@/components/common/heading/headingSection/HeadingSection';
