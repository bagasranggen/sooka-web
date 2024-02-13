import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { BUTTON_HANDLES } from '@/libs/handles';
import type { ButtonNavToggleProps } from '@/components/common/button/buttonNavToggle/ButtonNavToggle';
import type { ButtonRippleProps } from '@/components/common/button/buttonRipple/ButtonRipple';

export type ButtonProps = ButtonNavToggleProps | ButtonRippleProps;

export type ButtonWrapperProps = {
    className?: string;
    children: React.ReactNode;
}

export const ButtonWrapper = ({ className, children }: ButtonWrapperProps): React.ReactElement => (
    <div className={`btn-group${className ? ` ${className}` : ''}`}>{children}</div>
);

const Button = (props: ButtonProps): React.ReactElement => createDynamicElement({
    handles: BUTTON_HANDLES,
    selector: props.variant,
    props,
});

export default Button;