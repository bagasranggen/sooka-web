import React from 'react';
import { BUTTON_VARIANTS } from '@/libs/handles';
import ButtonBase, { ButtonEventProps, ButtonRegularProps } from '@/components/common/button/buttonBase/ButtonBase';

export type ButtonNavToggleProps = {
    variant: typeof BUTTON_VARIANTS.NAV_TOGGLE;
    isOpen: boolean;
} & Omit<ButtonRegularProps, 'type' | 'children'>;

const ButtonNavToggle = ({ className, isOpen, event }: ButtonNavToggleProps): React.ReactElement => (
    <ButtonBase type="button" className={`btn btn--unstyled btn--nav-toggle ${isOpen ? ' btn--open' : ''}${className ? ` ${className}` : ''}`} event={event}>
        <span className="btn__icon btn__icon--left" />
        <span className="btn__icon btn__icon--right" />
    </ButtonBase>
);

export default ButtonNavToggle;