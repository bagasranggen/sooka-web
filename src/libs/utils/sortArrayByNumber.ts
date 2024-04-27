import { getNestedValue, GetNestedValueProps } from './getNestedValue';

type SortArrayByDateProps = {
    items: any;
    keys: GetNestedValueProps['keys'];
};

const sortByNumber = (a: number, b: number) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
};

export const sortArrayByNumber = ({ items, keys }: SortArrayByDateProps) => {
    return [...items].sort((a: any, b: any) => {
        const aNumber = getNestedValue({ object: a, keys });
        const bNumber = getNestedValue({ object: b, keys });

        return sortByNumber(aNumber, bNumber);
    });
};
