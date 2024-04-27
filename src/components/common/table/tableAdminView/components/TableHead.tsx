import React from 'react';

import type { ClassnameArrayProps } from '@/libs/@types';
import type { SupabaseHeaderProps } from '@/libs/data';
import { joinClassnameString } from '@/libs/utils';

export type TableAdminHeadItemProps = SupabaseHeaderProps;

export type TableAdminHeadProps = {
    items: TableAdminHeadItemProps[];
};

const TableAdminHead = ({ items }: TableAdminHeadProps) => {
    return (
        <thead>
            <tr>
                {items.map((item: TableAdminHeadItemProps, i: number) => {
                    let className: ClassnameArrayProps = [];
                    if (item.align) className.push(`text-${item.align}`);
                    if (item.isHidden) className.push('d-none');
                    className = joinClassnameString(className);

                    let size = {};
                    if (item.size) size = { width: item.size, minWidth: item.size };

                    return (
                        <th
                            key={i}
                            {...(className ? { className: className } : {})}
                            {...(size ? { style: size } : {})}>
                            {item.label}
                        </th>
                    );
                })}
                <th className="text-center">Action</th>
            </tr>
        </thead>
    );
};

export default TableAdminHead;
