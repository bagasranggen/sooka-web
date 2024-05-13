import React from 'react';
import { createDynamicElement } from '@/libs/factory';

import { RATE_HANDLES } from '@/libs/handles';

import type { RateMeterProps } from '@/components/common/rate/rateMeter/RateMeter';

export type RateProps = RateMeterProps;

const Rate = (props: RateProps): React.ReactElement =>
    createDynamicElement({ handles: RATE_HANDLES, selector: props.variant, props });

export default Rate;
export type * from '@/components/common/rate/rateMeter/RateMeter';
