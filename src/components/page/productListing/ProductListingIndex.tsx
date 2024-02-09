import React from 'react';

import { PRODUCT_CATEGORY, PRODUCT_LISTING } from '@/libs/mock';

import { Container } from 'react-bootstrap';
import ProductListing from '@/components/page/productListing/components/ProductListing';
import Banner from '@/components/common/banner/Banner';

export type ProductListingIndexProps = {};

const ProductListingIndex = ({}: ProductListingIndexProps): React.ReactElement => (
    <>
        <Banner
            variant="section"
            title="Cakes"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae ducimus eos eum explicabo laboriosam nobis odio optio tenetur? Eos, vero?" />

        <section className="mt-5">
            <Container>
                <ProductListing
                    option={{ filterKey: 'category' }}
                    filterItems={PRODUCT_CATEGORY}
                    productItems={PRODUCT_LISTING} />
            </Container>
        </section>
    </>
);

export default ProductListingIndex;