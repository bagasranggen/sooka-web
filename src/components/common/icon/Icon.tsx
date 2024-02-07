import React from 'react';

import { ICON_HANDLES } from '@/libs/handles';
import { createDynamicElement } from '@/libs/factory';
import type { IconSookaProps } from '@/components/common/icon/iconSooka/IconSooka';
import type { IconCakeProps } from '@/components/common/icon/iconCake/IconCake';

export type IconProps = IconSookaProps | IconCakeProps;

const Icon = (props: IconProps): React.ReactElement => createDynamicElement({
    handles: ICON_HANDLES,
    selector: props.variant,
    props,
});

export default Icon;

