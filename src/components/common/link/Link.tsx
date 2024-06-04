'use client';

import React from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { pageTransitionSlice, selectPageTransition, useDispatch, useSelector } from '@/store/redux';

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & NextLinkProps;

const Link = ({ href, onClick, children, ...rest }: LinkProps): React.ReactElement => {
    const dispatch = useDispatch();
    const pathname = usePathname();

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const url = [`${window.location.origin}`, `${pathname}`].join('');
        const isShortcutPressed = e.ctrlKey || e.shiftKey || e.metaKey;

        if (
            href !== pathname &&
            href !== url &&
            !String(href).startsWith('#') &&
            rest.target !== '_blank' &&
            !isShortcutPressed
        ) {
            dispatch(pageTransitionSlice.actions.pageTransition({ isTransitioning: true }));
        }

        onClick && onClick(e);
    };

    return (
        <NextLink
            href={href}
            onClick={clickHandler}
            {...rest}>
            {children}
        </NextLink>
    );
};

export default Link;
