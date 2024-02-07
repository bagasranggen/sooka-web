import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { OFFCANVAS_HANDLES } from '@/libs/handles/';
import type { OffcanvasNavigationProps } from '@/components/layout/offcanvas/offcanvasNavigation/OffcanvasNavigation';

export type OffcanvasProps = OffcanvasNavigationProps;

const Offcanvas = (props: OffcanvasProps): React.ReactElement => createDynamicElement({
    handles: OFFCANVAS_HANDLES,
    selector: props.variant,
    props
});

export default Offcanvas;