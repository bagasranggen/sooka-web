'use client';

import React from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { pageTransitionSlice, selectPageTransition, useDispatch, useSelector } from '@/store/redux';

export type LinkProps = {
    children: React.ReactNode;
} & NextLinkProps;

const Link = ({ href, onClick, children, ...rest }: LinkProps): React.ReactElement => {
    const dispatch = useDispatch();
    const pathname = usePathname();

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (pathname !== href) dispatch(pageTransitionSlice.actions.pageTransition({ isTransitioning: true }));

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
