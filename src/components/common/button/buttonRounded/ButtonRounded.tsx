import React from 'react';

import { BUTTON_VARIANTS } from '@/libs/handles';

import ButtonBase, { type ButtonBaseTypeProps } from '@/components/common/button/buttonBase/ButtonBase';
import { joinClassnameString } from '@/libs/utils';
import type { ButtonColorsProps } from '@/libs/@types';

export type ButtonRoundedProps = {
    variant: typeof BUTTON_VARIANTS.ROUNDED;
    color?: ButtonColorsProps;
} & ButtonBaseTypeProps;

const ButtonRounded = (props: ButtonRoundedProps): React.ReactElement => {
    const { className, variant, ...rest } = props;

    let btnClass: string | string[] = ['btn', 'btn--rounded'];
    if (props.color) {
        btnClass.push(`btn--${props.color}`);
    } else {
        btnClass.push(`btn--primary`);
    }
    if (className) btnClass.push(className);
    btnClass = joinClassnameString(btnClass);

    return (
        <ButtonBase
            variant="base"
            className={btnClass}
            {...rest}>
            {props.children}
        </ButtonBase>
    );
};

export default ButtonRounded;
