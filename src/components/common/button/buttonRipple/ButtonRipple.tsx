import React from 'react';

import { BUTTON_VARIANTS } from '@/libs/handles/button';
import { createAnimation } from '@/libs/factory';
import ButtonBase, { type ButtonBaseProps } from '@/components/common/button/buttonBase/ButtonBase';
import type { ButtonColorsProps } from '@/libs/@types';

export type ButtonRippleProps = {
    variant: typeof BUTTON_VARIANTS.RIPPLE;
    color?: ButtonColorsProps;
} & ButtonBaseProps;

const ButtonRipple = (props: ButtonRippleProps): React.ReactElement => {
    // let btnProps = {};

    const btnColor = props.color ? ` btn--${props.color}` : '';
    const btnClass = `btn btn--${props.variant}${btnColor}`;

    return <ButtonBase
        className={btnClass}
        {...createAnimation({ type: props.variant })}
        {...props}
        data-title={props.children}>
        <div className="btn__ripple" />
        {props.children}</ButtonBase>;
};

export default ButtonRipple;