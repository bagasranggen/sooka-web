import { SUPABASE_HEADER_HANDLES } from '@/libs/handles';
import type { SupabaseHeaderProps } from '@/libs/data';
import type { SupabaseVariantProps } from '@/libs/fetcher';

type EditFormDataProps = {
    slug: SupabaseVariantProps;
    tableId: string;
    isEditing: number | undefined;
    isReordering: number | undefined;
};

export const getEditFormData = ({ slug, tableId, isEditing, isReordering }: EditFormDataProps) => {
    let type: 'add' | 'edit' | 'reorder' = 'add';
    if (typeof isEditing !== 'undefined') type = 'edit';
    if (typeof isReordering !== 'undefined') type = 'reorder';

    const tableKeys = SUPABASE_HEADER_HANDLES[slug].map((header: SupabaseHeaderProps) => header.slug);
    const tableImagesKeys = ['imageDesktop', 'imageMobile'];
    const tableImages: string[] = [];
    const tableForm = document.querySelector(`#${tableId}`) as unknown as HTMLElement;

    let tempData: string[] | number = [];
    if (type === 'edit' && typeof isEditing !== 'undefined') {
        const editData = tableForm
            .querySelectorAll('tbody tr')
            [isEditing].querySelectorAll('[data-value], [data-images]');
        editData.forEach((element: Element) => {
            if (element?.hasAttribute('data-value')) {
                (tempData as string[]).push(element.getAttribute('data-value') as string);
            }

            if (element?.hasAttribute('data-relation')) {
                (tempData as string[]).push(element.getAttribute('data-relation') as string);
            }

            if (element?.hasAttribute('data-images')) {
                const imagesArr = element?.getAttribute('data-images')?.split(',');

                if (imagesArr) tableImages.push(...imagesArr);
            }
        });
    }
    if (type === 'reorder' && typeof isReordering !== 'undefined') {
        const editData = tableForm.querySelectorAll('tbody tr')[isReordering].querySelectorAll('[data-order]');
        tempData = parseInt(editData[0].getAttribute('data-order') as string);
    }

    const data: any = {};
    if (type !== 'reorder') {
        tableKeys.map((keys: string, i: number) => {
            let d: string | boolean = '';

            if (type === 'edit' && typeof tempData === 'object') {
                d = tempData[i];
                if (tempData[i] === 'true') d = true;
                if (tempData[i] === 'false') d = false;
            }

            data[keys] = d;
        });

        if (tableImages.length > 0) {
            data['images'] = tableImages;

            tableImages.map((image: string, i: number) => {
                const key = tableImagesKeys[i];

                data[key] = image;
            });
        }
    }

    if (type === 'reorder') {
        data.order = tempData;
    }

    return data;
};
