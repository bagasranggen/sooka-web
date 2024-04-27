import { supabaseServerAction } from '@/libs/fetcher';
import { checkOptions, getOptions, GetOptionsProps } from '@/components/admin/form/components/getOptions';
import type { AdminDataProps } from '@/libs/@types';

const formSelectUriData = async ({
    slug,
    variant,
    uri,
    valueType,
}: AdminDataProps & Pick<GetOptionsProps, 'valueType'> & { uri?: string }) => {
    const { data: categories } = await supabaseServerAction({ variant: 'fetch', relation: 'categories' });
    const { data: productListing } = await supabaseServerAction({ variant: 'fetch', relation: 'productListing' });

    const urlOptions: any = getOptions({
        valueType: valueType ?? 'uri',
        items: [
            {
                data: categories ?? [],
                slug: 'categories',
                label: '-- Select From Categories --',
                keys: {
                    label: 'label',
                    slug: 'slug',
                },
            },
            {
                data: productListing ?? [],
                slug: 'products',
                label: '-- Select From Products --',
                keys: {
                    label: 'name',
                    slug: valueType === 'slug' ? 'slug' : ['category', 'slug'],
                },
            },
        ],
    });

    let selectedFrom = '';

    if (slug) {
        const isChecked = checkOptions({ items: urlOptions, check: uri ?? '' });
        const isCustom = !!uri;

        switch (true) {
            case isChecked?.categories:
                selectedFrom = 'categories';
                break;

            case isChecked?.products:
                selectedFrom = 'products';
                break;

            case isCustom:
                selectedFrom = 'custom';
                break;
        }
    }

    return { urlOptions, selectedFrom };
};

export default formSelectUriData;
