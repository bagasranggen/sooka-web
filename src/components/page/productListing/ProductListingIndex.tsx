import React from 'react';

import { Container } from 'react-bootstrap';

import ProductListing, { type ProductListingProps } from '@/components/page/productListing/components/ProductListing';
import Banner, { type BannerSectionProps } from '@/components/common/banner/Banner';

export type ProductListingIndexProps = {
    page: Pick<BannerSectionProps, 'title' | 'description'>;
    entries: {
        products: ProductListingProps['productItems'];
        categories: ProductListingProps['filterItems'];
    };
};

const ProductListingIndex = ({ page, entries }: ProductListingIndexProps): React.ReactElement => (
    <>
        <Banner
            variant="section"
            title={page.title}
            description={page.description}
        />

        <section className="my-5">
            <Container>
                <ProductListing
                    option={{ filterKey: 'category' }}
                    filterItems={entries.categories}
                    productItems={entries.products}
                />
            </Container>
        </section>
    </>
);

export default ProductListingIndex;
