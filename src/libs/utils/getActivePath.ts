export const getActivePath = (url: string) => {
    const split = url.split('/');
    const clear = split.filter((f: string) => f !== '');

    return clear.length === 0 ? '/' : `/${clear[0]}`;
};
