import React from 'react';

import ButtonBase, { type ButtonBaseTypeProps } from '@/components/common/button/buttonBase/ButtonBase';
import { BUTTON_VARIANTS } from '@/libs/handles';
import type { ButtonColorsProps } from '@/libs/@types';

export type ButtonBlockProps = {
    variant: typeof BUTTON_VARIANTS.BLOCK | typeof BUTTON_VARIANTS.OUTLINE;
    color?: ButtonColorsProps;
} & ButtonBaseTypeProps;

const ButtonBlock = (props: ButtonBlockProps): React.ReactElement => {
    const btnVariant = ` btn--${props.variant}`;
    const btnColor = ` btn--${props?.color ?? 'primary'}`;
    const btnClass = `btn${btnVariant}${btnColor}${props.className ? ` ${props.className}` : ''}`;

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

export default ButtonBlock;
