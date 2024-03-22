'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import type { LinkProps } from '@/libs/@types';
import { LIST_VARIANTS } from '@/libs/handles';
import { getActivePath } from '@/libs/utils';

import Button from '@/components/common/button/Button';

export type ListAdminNavigationItemProps = {
    label: string;
    slug: string;
} & LinkProps;

export type ListAdminNavigationProps = {
    variant: typeof LIST_VARIANTS.ADMIN_NAVIGATION;
    items: ListAdminNavigationItemProps[];
};

const ListAdminNavigation = ({ items }: ListAdminNavigationProps): React.ReactElement => {
    const pathname = usePathname();
    const active = getActivePath(pathname);
    const activeSlug = active.replace('/', '');

    return (
        <ul className="list-unstyled list--admin-navigation">
            {items.map((item: ListAdminNavigationItemProps, i: number) => (
                <li key={i}>
                    <Button
                        variant="base"
                        type="anchor"
                        {...(activeSlug === item.slug ? { className: 'active' } : {})}
                        href={item.href}>
                        {item.label}
                    </Button>
                </li>
            ))}
        </ul>
    );
};

export default ListAdminNavigation;
