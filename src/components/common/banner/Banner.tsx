import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { BANNER_HANDLES } from '@/libs/handles';
import type { BannerSectionProps } from '@/components/common/banner/bannerSection/BannerSection';

export type BannerProps = BannerSectionProps;

const Banner = (props: BannerProps): React.ReactElement =>
    createDynamicElement({
        handles: BANNER_HANDLES,
        selector: props.variant,
        props,
    });

export default Banner;
