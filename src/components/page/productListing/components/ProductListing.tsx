'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import type { CardImageItemProps, CardImageProps } from '@/components/common/card/cardImage/CardImage';
import type { FilterProductKeyProps, FilterProductProps } from '@/components/common/filter/filterProduct/FilterProduct';

import Filter from '@/components/common/filter/Filter';
import Card from '@/components/common/card/Card';

export type ProductListingProps = {
    option: FilterProductKeyProps;
    filterItems: FilterProductProps['items'];
    productItems: CardImageProps['items'];
};

const ProductListing = ({ option, filterItems, productItems }: ProductListingProps): React.ReactElement => {
    const searchParams = useSearchParams();
    const activeCategory = searchParams?.get(option.filterKey) ?? '';

    const [items, setItems] = useState<ProductListingProps['productItems']>(productItems);

    useEffect(() => {
        if (!activeCategory) {
            setItems(productItems);
            return;
        }
        const filtered = [...productItems].filter((item: CardImageItemProps) => item.category === activeCategory);
        setItems(filtered);
    }, [activeCategory, productItems]);

    return (
        <>
            {filterItems.length > 0 && (
                <Filter
                    className="text-end"
                    variant="product"
                    options={{ filterKey: option.filterKey }}
                    items={filterItems}
                />
            )}
            <Card
                variant="image"
                items={items}
            />
        </>
    );
};

export default ProductListing;
