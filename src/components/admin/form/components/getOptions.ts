import type { InputSelectItem } from '@/components/common/input/inputShared';

export type GetOptionsItemProps = {
    data: any[];
    slug: string;
    label: string;
    keys: {
        label: string;
        slug: string | string[];
    };
};

export type GetOptionsProps = {
    items: GetOptionsItemProps[];
    valueType?: 'uri' | 'slug';
};

export type OptionsReturnProps = Record<string, InputSelectItem[]>;

export const getOptions = ({ items, valueType }: GetOptionsProps): OptionsReturnProps => {
    const urlOptions: Record<string, InputSelectItem[]> = {};
    let type = '/';
    if (valueType === 'slug') type = '';

    items.map((item: GetOptionsItemProps) => {
        urlOptions[item.slug] = [{ label: item.label, slug: '' }];
        item.data.map((datum: any) => {
            let slug = '';
            if (typeof item.keys.slug === 'string') {
                slug = `${type}${datum[item.keys.slug]}`;
            }
            if (typeof item.keys.slug === 'object') {
                item.keys.slug.map((key: string) => {
                    slug += `${type}${datum[key]}`;
                });
            }

            urlOptions[item.slug].push({ label: datum[item.keys.label], slug });
        });
    });

    return urlOptions;
};

export type CheckOptionsProps = {
    items: OptionsReturnProps;
    check: string;
};

export const checkOptions = ({ items, check }: CheckOptionsProps) => {
    const isChecked: Record<string, boolean> = {};
    const keys = Object.keys(items);

    keys.map((key: string, i: number) => {
        const temptChecked = items[key].find((item: any) => item.slug === check);

        if (temptChecked?.slug) isChecked[keys[i]] = true;
    });

    return isChecked;
};
