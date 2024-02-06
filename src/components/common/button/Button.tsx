import React from 'react';

import { ButtonNavToggleProps } from '@/components/common/button/buttonNavToggle/ButtonNavToggle';
import { createDynamicElement } from '@/libs/factory';
import { BUTTON_HANDLES } from '@/libs/handles';

export type ButtonProps = ButtonNavToggleProps;

const Button = (props: ButtonProps): React.ReactElement => createDynamicElement({
    handles: BUTTON_HANDLES,
    selector: props.variant,
    props,
});

export default Button;