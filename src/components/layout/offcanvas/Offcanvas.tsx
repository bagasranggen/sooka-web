import React from 'react';
import { OffcanvasNavigationProps } from "@/components/layout/offcanvas/offcanvasNavigation/OffcanvasNavigation";
import { createDynamicElement } from "@/libs/factory";
import { OFFCANVAS_HANDLES } from "@/libs/handles/offcanvas";

export type OffcanvasProps = OffcanvasNavigationProps;

const Offcanvas = (props: OffcanvasProps): React.ReactElement => createDynamicElement({
    handles: OFFCANVAS_HANDLES,
    selector: props.variant,
    props
});

export default Offcanvas;