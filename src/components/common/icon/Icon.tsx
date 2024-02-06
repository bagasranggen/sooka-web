import React from 'react';

import type { IconSookaProps } from "@/components/common/icon/iconSooka/IconSooka";
import { ICON_HANDLES } from "@/libs/handles/icon";
import { createDynamicElement } from "@/libs/factory";

export type IconProps = IconSookaProps;

const Icon = (props: IconProps): React.ReactElement => createDynamicElement({
    handles: ICON_HANDLES,
    selector: props.variant,
    props,
});

export default Icon;

