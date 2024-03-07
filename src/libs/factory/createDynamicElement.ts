import React from 'react';

type CreateDynamicElementProps = {
    handles: { [key: string]: string | React.FunctionComponent<any> | React.ComponentClass<any, any> };
    selector: string;
    props: any;
    children?: React.ReactNode;
};

export const createDynamicElement = ({ handles, selector, props }: CreateDynamicElementProps) => {
    return React.createElement(handles[selector], props, props?.children ?? null);
};
