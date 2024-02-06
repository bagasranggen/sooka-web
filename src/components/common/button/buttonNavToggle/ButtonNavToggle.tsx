import React from 'react';

import { BUTTON_VARIANTS } from '@/libs/handles';
import type { ButtonColorsProps } from "@/libs/@types";

import ButtonBase, { type ButtonRegularProps } from '@/components/common/button/buttonBase/ButtonBase';

export type ButtonNavToggleProps = {
    variant: typeof BUTTON_VARIANTS.NAV_TOGGLE;
    isOpen: boolean;
    color: ButtonColorsProps;
} & Omit<ButtonRegularProps, 'type' | 'children'>;

const ButtonNavToggle = ({ className, color, isOpen, event }: ButtonNavToggleProps): React.ReactElement => {
    const btnIsOpen = isOpen ? ' btn--open' : '';
    const btnColor = color ? ` btn--${color}` : '';
    const btnBaseClass = 'btn btn--unstyled btn--nav-toggle';
    const btnClass = `${btnBaseClass}${btnIsOpen}${btnColor}${className ? ` ${className}` : ''}`;

    return <ButtonBase
        type="button"
        className={btnClass}
        event={event}>
        <span className="btn__icon btn__icon--left" />
        <span className="btn__icon btn__icon--right" />
    </ButtonBase>;
};

export default ButtonNavToggle;