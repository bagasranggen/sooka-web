import { supabaseServerAction } from '@/libs/fetcher';
import { createProductListingData } from '@/libs/factory';

import slugify from 'react-slugify';

const getAllProducts = async () => {
    const { data } = await supabaseServerAction({
        variant: 'fetch',
        relation: 'productListing',
    });

    return { data };
};

const getProduct = async (slug?: string) => {
    if (!slug) return { data: null };

    const { data } = await supabaseServerAction({
        variant: 'fetch-find',
        relation: 'productListing',
        find: {
            key: 'slug',
            value: slug,
        },
    });

    return { data };
};

const getPath = async () => {
    const { data } = await getAllProducts();

    return { data: (data as any[]).map((datum: any) => `/${datum.category}/${slugify(datum.name)}`) };
};

const productDetailData = async (slug?: string) => {
    const { data: path } = await getPath();
    const { data: productSelected } = await getProduct(slug);

    const product = productSelected?.[0];

    let page;
    if (product) {
        page = {
            title: product.name,
        };
    }

    let entries: any;
    if (product) {
        entries = {
            title: product.name,
            ...createProductListingData(product),
        };
    }

    return { path, page, entries };
};

export default productDetailData;
