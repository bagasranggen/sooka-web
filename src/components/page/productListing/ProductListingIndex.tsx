import React from 'react';

import { PRODUCT_LISTING } from '@/libs/mock';

import { Container } from 'react-bootstrap';
import ProductListing, { type ProductListingProps } from '@/components/page/productListing/components/ProductListing';
import Banner from '@/components/common/banner/Banner';

export type ProductListingIndexProps = {
    page: {
        title: string;
        shortDescription: string;
    };
    entries: {
        products: ProductListingProps['productItems'];
        categories: ProductListingProps['filterItems'];
    }
};

const ProductListingIndex = ({ page, entries }: ProductListingIndexProps): React.ReactElement => (
    <>
        <Banner
            variant="section"
            title={page.title}
            description={page.shortDescription} />

        <section className="mt-5">
            <Container>
                <ProductListing
                    option={{ filterKey: 'category' }}
                    filterItems={entries.categories}
                    productItems={PRODUCT_LISTING} />
            </Container>
        </section>
    </>
);

export default ProductListingIndex;