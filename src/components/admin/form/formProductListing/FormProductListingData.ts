import { supabaseServerAction } from '@/libs/fetcher';
import type { ImagesGalleryItemProps } from '@/components/admin/form/formProductListing/components/ImagesGalleryField';

const formProductListingData = async (slug?: string, variant?: 'view' | 'add' | 'edit') => {
    const { data: products } = await supabaseServerAction({ variant: 'fetch', relation: 'productListing' });
    const { data: categories } = await supabaseServerAction({ variant: 'fetch', relation: 'categories' });

    let data: any = products;
    let imageGallery: ImagesGalleryItemProps[] = [];

    if (slug) {
        data = products?.find((datum: any) => datum.slug === slug);

        if (data?.gallery || data?.gallery.length > 0) {
            new Array(data.gallery.length / 2).fill(0).map((item: number, i: number) => {
                let index = 0;
                if (i > 0) index = i + 1;

                const tempData = {
                    id: Date.now() + i,
                    desktop: data?.gallery?.[index],
                    mobile: data?.gallery?.[index + 1],
                };

                imageGallery.push(tempData);
            });
        }
    }

    if (variant !== 'view') {
        data = { ...data, imageGallery };
    }

    return {
        order: products?.length,
        data,
        dataView: undefined,
        categories,
    };
};

export default formProductListingData;
