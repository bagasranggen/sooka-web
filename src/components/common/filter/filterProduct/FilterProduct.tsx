'use client';

import React from 'react';
import { FILTER_VARIANTS } from "@/libs/handles/filter";
import Link from "next/link";

export type FilterProductItemProps = {
    label: string;
    slug: string;
}

export type FilterProductProps = {
    variant: typeof FILTER_VARIANTS.PRODUCT;
    items: FilterProductItemProps[]
};

const FilterProduct = ({ items, variant }: FilterProductProps): React.ReactElement => (
    <ul className={`list-inline list--filter-${variant}`}>
        {items.map((item: FilterProductItemProps, i: number) => <li
            key={i}
            className="list-inline-item"><Link href={`#${item.slug}`}>{item.label}</Link></li>)}
    </ul>
);

export default FilterProduct;