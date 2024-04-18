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
    let btnClass: string | string[] = ['btn', 'btn--rounded'];

    btnClass = joinClassnameString(btnClass);

    const { className, variant, ...rest } = props;

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
