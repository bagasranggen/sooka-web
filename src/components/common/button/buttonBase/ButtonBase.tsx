import React from 'react';

import type { LinkProps } from '@/libs/@types';
import { BUTTON_TYPES, BUTTON_VARIANTS } from '@/libs/handles';
import { joinClassnameString } from '@/libs/utils';

import Link from '@/components/common/link/Link';

export type ButtonCommonProps = {
    children: React.ReactNode;
    className?: string;
    title?: string;
    disabled?: boolean;
};

export type ButtonAnchorProps = {
    type: typeof BUTTON_TYPES.ANCHOR;
} & (LinkProps & ButtonCommonProps);

export type ButtonRegularProps = {
    type: typeof BUTTON_TYPES.BUTTON | typeof BUTTON_TYPES.SUBMIT | typeof BUTTON_TYPES.RESET;
    events?: React.DOMAttributes<HTMLButtonElement>;
} & ButtonCommonProps;

export type ButtonBaseTypeProps = ButtonAnchorProps | ButtonRegularProps;

export type ButtonBaseProps = {
    variant: typeof BUTTON_VARIANTS.BASE;
} & ButtonBaseTypeProps;

const ButtonBase = (props: ButtonBaseProps): React.ReactElement => {
    switch (props.type) {
        case 'button':
        case 'submit':
        case 'reset':
            const { events, variant: buttonVariant, ...restButton } = props;

            let eventsButton = {};
            if (events?.onClick) {
                eventsButton = { ...eventsButton, ...{ onClick: events.onClick } };
            }

            return (
                <button
                    {...restButton}
                    {...eventsButton}>
                    {props.children}
                </button>
            );

        case 'anchor':
            const { openNewTab, variant: anchorVariant, type, className, disabled, ...restAnchor } = props;

            let anchorClass: string | string[] = className ? [className] : [];
            if (disabled) anchorClass.push('btn--disabled');
            anchorClass = joinClassnameString(anchorClass);

            return (
                <Link
                    {...(anchorClass ? { className: anchorClass } : {})}
                    {...restAnchor}
                    {...(openNewTab ? { target: '_blank' } : {})}>
                    {props.children}
                </Link>
            );
    }
};

export default ButtonBase;
