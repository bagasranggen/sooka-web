export type GetNestedValueProps = {
    object: any;
    keys: string | string[];
}

export const getNestedValue = ({ object, keys }: GetNestedValueProps) => {
    if (typeof keys === 'string') {
        return object[keys];
    } else {
        return keys.reduce((item: any, key: string) => item[key], object);
    }
};