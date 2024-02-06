import React from 'react';

import type { IconSookaProps } from "@/components/common/icon/iconSooka/IconSooka";
import { ICON_HANDLES } from "@/libs/handles/icon";
import { createDynamicElement } from "@/libs/factory";
import { IconCakeProps } from "@/components/common/icon/iconCake/IconCake";

export type IconProps = IconSookaProps | IconCakeProps;

const Icon = (props: IconProps): React.ReactElement => createDynamicElement({
    handles: ICON_HANDLES,
    selector: props.variant,
    props,
});

export default Icon;

