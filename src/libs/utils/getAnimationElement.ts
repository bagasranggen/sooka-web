export const getAnimationElement = (element: any) => {
    let el = element;

    if (el.length > 0) el = el[0];

    return el;
};