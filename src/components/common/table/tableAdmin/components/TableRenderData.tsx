import React from 'react';

import type { SupabaseHeaderProps } from '@/libs/data';
import { truncateString } from '@/libs/utils';

import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import ReactHtmlParser from 'react-html-parser';

import Button from '@/components/common/button/Button';

export type RenderTableCommonData = {
    table: SupabaseHeaderProps[];
};

export type RenderTableAdminDataProps = {
    datum: any;
    index: number;
    isEdit: boolean;
} & RenderTableCommonData;

export type RenderTableAdminDataDetailProps = {
    datum: any;
    columnLength: number;
} & RenderTableCommonData;

const RenderImagesArray = ({ items }: { items: string[] }): React.ReactElement => (
    <ul>
        {items.map((item: string, i: number) => (
            <li key={i}>
                <Button
                    variant="base"
                    type="anchor"
                    href={item}
                    openNewTab>
                    {truncateString(item, { start: 32, end: 61 })}
                </Button>
            </li>
        ))}
    </ul>
);

export const RenderTableAdminData = ({ table, datum, index, isEdit }: RenderTableAdminDataProps) => {
    return (
        <>
            {datum.id && (
                <td
                    data-id={datum.id}
                    className="d-none">
                    {datum.id}
                </td>
            )}

            {table.map((order: SupabaseHeaderProps) => {
                const keys = order.slug;

                let value = datum[keys];
                if (order?.relation && datum[order.relation]) value = datum[order.relation];
                if (order?.label && order.label.toLowerCase() === 'link' && value) value = `/${value}`;
                if (value === true)
                    value = (
                        <CiCircleCheck
                            size={30}
                            color="var(--bs-success)"
                        />
                    );
                if (value === false)
                    value = (
                        <CiCircleRemove
                            size={30}
                            color="var(--bs-danger)"
                        />
                    );

                let renderValue = value;
                if (typeof value === 'string') renderValue = ReactHtmlParser(value);
                if (value instanceof Array) renderValue = <RenderImagesArray items={value} />;

                let dataPropsKey = 'data-value';
                if (keys === 'images') dataPropsKey = 'data-images';
                const dataProps = { [dataPropsKey]: datum?.[keys] ?? '' };

                const dataRelationsProps = order?.relation ? { 'data-relation': datum?.[order.relation] } : {};

                const tdShow = isEdit || order.isHidden ? 'd-none' : '';
                const tdAlign = typeof datum[keys] === 'boolean' ? ' text-center' : '';
                const tdClass = `${tdShow}${tdAlign}`;

                if (keys !== 'order')
                    return (
                        <td
                            key={`${keys}${index}`}
                            {...dataProps}
                            {...dataRelationsProps}
                            {...(tdClass ? { className: tdClass } : {})}>
                            {renderValue}
                        </td>
                    );
            })}
        </>
    );
};

export const RenderTableAdminDetailData = ({ table, columnLength, datum }: RenderTableAdminDataDetailProps) => {
    return (
        <td colSpan={columnLength}>
            <ul>
                {table.map((item: SupabaseHeaderProps, i: number) => {
                    const value = datum[item.slug];

                    if (value)
                        return (
                            <li key={i}>
                                <strong>{item.label}</strong>: {ReactHtmlParser(datum[item.slug])}
                            </li>
                        );
                })}
            </ul>
        </td>
    );
};
