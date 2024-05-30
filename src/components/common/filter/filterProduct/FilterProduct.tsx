'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { FILTER_VARIANTS } from '@/libs/handles/filter';

export type FilterProductKeyProps = {
    filterKey: string;
};

export type FilterProductItemProps = {
    label: string;
    slug: string;
};

export type FilterProductProps = {
    variant: typeof FILTER_VARIANTS.PRODUCT;
    className?: string;
    items: FilterProductItemProps[];
    options: FilterProductKeyProps;
};

const FilterProductItem = ({
    label,
    slug,
    filterKey,
}: FilterProductItemProps & FilterProductKeyProps): React.ReactElement => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const active = searchParams?.get(filterKey) ?? '';
    const filter = slug ? `?${filterKey}=${slug}` : '';
    const href = `${pathname}${filter}`;

    return (
        <li className="list-inline-item">
            <Link
                href={href}
                scroll={false}
                {...(active === slug ? { className: 'active' } : {})}
                shallow>
                {label}
            </Link>
        </li>
    );
};

const FilterProduct = ({ className, items, options, variant }: FilterProductProps): React.ReactElement => {
    return (
        <ul className={`list-inline list--filter-${variant}${className ? ` ${className}` : ''}`}>
            <FilterProductItem
                label="All"
                slug=""
                filterKey={options.filterKey}
            />
            {items.map((item: FilterProductItemProps, i: number) => (
                <FilterProductItem
                    key={i}
                    {...item}
                    filterKey={options.filterKey}
                />
            ))}
        </ul>
    );
};

export default FilterProduct;
