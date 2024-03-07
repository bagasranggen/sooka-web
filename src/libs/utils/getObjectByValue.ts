export const getObjectByValue = (obj: Object, value: string): Record<any, any> => {
    const key = Object.keys(obj).find((key: string) => obj[key as keyof object] === value);

    return { [key as string]: obj[key as keyof object] };
};
