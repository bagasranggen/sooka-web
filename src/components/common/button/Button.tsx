import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { BUTTON_HANDLES } from '@/libs/handles';

import type { ButtonBaseProps } from '@/components/common/button/buttonBase/ButtonBase';
import type { ButtonNavToggleProps } from '@/components/common/button/buttonNavToggle/ButtonNavToggle';
import type { ButtonRippleProps } from '@/components/common/button/buttonRipple/ButtonRipple';
import type { ButtonBlockProps } from '@/components/common/button/buttonBlock/ButtonBlock';
import type { ButtonRoundedProps } from '@/components/common/button/buttonRounded/ButtonRounded';

export type ButtonProps =
    | ButtonBaseProps
    | ButtonNavToggleProps
    | ButtonRippleProps
    | ButtonRoundedProps
    | ButtonBlockProps;

export type ButtonWrapperProps = {
    className?: string;
    children: React.ReactNode;
};

export const ButtonWrapper = ({ className, children }: ButtonWrapperProps): React.ReactElement => (
    <div className={`btn-group${className ? ` ${className}` : ''}`}>{children}</div>
);

const Button = (props: ButtonProps): React.ReactElement =>
    createDynamicElement({
        handles: BUTTON_HANDLES,
        selector: props.variant,
        props,
    });

export default Button;

export * from './buttonGroup/ButtonGroup';

export type * from '@/components/common/button/buttonBase/ButtonBase';
export type * from '@/components/common/button/buttonNavToggle/ButtonNavToggle';
export type * from '@/components/common/button/buttonRipple/ButtonRipple';
export type * from '@/components/common/button/buttonBlock/ButtonBlock';
export type * from '@/components/common/button/buttonRounded/ButtonRounded';
