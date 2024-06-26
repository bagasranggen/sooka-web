import { supabaseServerAction } from '@/libs/fetcher/supabaseServerAction';
import { createProductListingData, ProductListingDataProps } from '@/libs/factory';

import type { ProductListingIndexProps } from '@/components/page/productListing/ProductListingIndex';
import type { FilterProductItemProps } from '@/components/common/filter/filterProduct/FilterProduct';

const getPage = async (slug?: string): Promise<{ data: ProductListingIndexProps['page'] }> => {
    if (!slug) return { data: { title: '', description: '' } };

    const { data } = await supabaseServerAction({
        variant: 'fetch-find',
        relation: 'pages',
        find: {
            key: 'slug',
            value: slug,
        },
    });

    return {
        data: data ? { title: data[0]?.title, description: data[0]?.['short_description'] } : ({} as any),
    };
};

const getProductListing = async (slug?: string) => {
    let productListing: ProductListingDataProps[] = [];

    if (!slug) {
        const { data } = await supabaseServerAction({
            variant: 'fetch',
            relation: 'productListing',
            // filter: {
            //     key: 'category',
            //     slug,
            // },
        });

        data?.map((datum: ProductListingDataProps) => {
            productListing.push(createProductListingData(datum));
        });

        // return { data };
    }

    if (slug) {
        const { data } = await supabaseServerAction({
            variant: 'fetch-filter',
            relation: 'productListing',
            filter: {
                key: 'category',
                slug,
            },
        });

        // if (data && data?.length > 0) {
        data?.map((datum: ProductListingDataProps) => {
            productListing.push(createProductListingData(datum));
        });
        // }
    }

    // let productListing: ProductListingDataProps[] = [];

    return { data: productListing };
};

const getPath = async () => {
    const { data } = await supabaseServerAction({
        variant: 'fetch',
        relation: 'categories',
    });

    return { data: (data as any[]).map((datum: FilterProductItemProps) => datum.slug) };
};

const productListingData = async (slug?: string) => {
    const { data: page } = await getPage(slug);
    const { data: products } = await getProductListing(slug);
    const { data: path } = await getPath();

    return { page, products, path };
};

export default productListingData;
