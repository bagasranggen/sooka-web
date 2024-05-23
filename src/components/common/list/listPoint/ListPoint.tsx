import React from 'react';

import { LIST_VARIANTS } from '@/libs/handles';
import ReactHtmlParser from 'react-html-parser';
import { createAnimation } from '@/libs/factory';

export type ListPointItemProps = {
    title: string;
    content: string;
};

export type ListPointProps = {
    variant: typeof LIST_VARIANTS.POINT;
    items: ListPointItemProps[];
};

const ListPoint = ({ items }: ListPointProps): React.ReactElement => (
    <ol className="list-unstyled list--point">
        {items.map((item: ListPointItemProps, i: number) => (
            <li
                key={i}
                {...createAnimation({ type: 'fade-in' })}>
                <h3 className="list__title">{item.title}</h3>
                {ReactHtmlParser(item.content)}
            </li>
        ))}
    </ol>
);

export default ListPoint;
