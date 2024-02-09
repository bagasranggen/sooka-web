import React from 'react';

import Link from 'next/link';
import type { LinkProps } from '@/libs/@types';
import { BUTTON_TYPES } from '@/libs/handles';

export type ButtonCommonProps = {
    children: React.ReactNode;
    className?: string;
}

export type ButtonEventProps = {
    onClick: () => void;
}

export type ButtonAnchorProps = {
    type: typeof BUTTON_TYPES.ANCHOR;
} & LinkProps & ButtonCommonProps;

export type ButtonRegularProps = {
    type: typeof BUTTON_TYPES.BUTTON;
    event?: Partial<ButtonEventProps>;
} & ButtonCommonProps;

export type ButtonBaseProps = ButtonAnchorProps | ButtonRegularProps;

const ButtonBase = (props: ButtonBaseProps): React.ReactElement => {
    switch (props.type) {
        case 'button':
            const { event, ...restButton } = props;

            return <button {...restButton} onClick={event?.onClick}>{props.children}</button>;

        case 'anchor':
            const { openNewTab, ...restAnchor } = props;

            return <Link {...restAnchor} {...openNewTab ? { target: '_blank' } : {}}>{props.children}</Link>;
    }
};

export default ButtonBase;