import React from 'react';

import Link from 'next/link';
import type { LinkProps } from '@/libs/@types';
import { BUTTON_TYPES, BUTTON_VARIANTS } from '@/libs/handles/';

export type ButtonCommonProps = {
    children: React.ReactNode;
    className?: string;
    title?: string;
};

export type ButtonAnchorProps = {
    type: typeof BUTTON_TYPES.ANCHOR;
} & LinkProps &
    ButtonCommonProps;

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
            const { events, ...restButton } = props;
            const eventsButton = events ?? {};

            return (
                <button
                    {...restButton}
                    {...eventsButton}>
                    {props.children}
                </button>
            );

        case 'anchor':
            const { openNewTab, ...restAnchor } = props;

            return (
                <Link
                    {...restAnchor}
                    {...(openNewTab ? { target: '_blank' } : {})}>
                    {props.children}
                </Link>
            );
    }
};

export default ButtonBase;
