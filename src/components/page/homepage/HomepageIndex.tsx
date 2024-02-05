import React from 'react';

import Slider from '@/components/common/slider/Slider';
import { BANNER_CAROUSELS } from '@/libs/mock';

export type HomepageIndexProps = {};

const HomepageIndex = ({}: HomepageIndexProps): React.ReactElement => {
    return <>
        <Slider
            variant="image"
            items={BANNER_CAROUSELS} />
    </>;
};

export default HomepageIndex;