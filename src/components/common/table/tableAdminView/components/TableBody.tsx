import React from 'react';

import type { ClassnameArrayProps } from '@/libs/@types';
import { joinClassnameString, truncateString } from '@/libs/utils';

import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import ReactHtmlParser from 'react-html-parser';

import Button from '@/components/common/button/Button';
import type { TableAdminHeadItemProps } from '@/components/common/table/tableAdminView/components/TableHead';
import TableAdminAction, {
    TableAdminActionLinkProps,
    TableAdminActionProps,
} from '@/components/common/table/tableAdminView/components/TableAction';

export type TableAdminBodyProps = {
    entries: any;
    items: TableAdminHeadItemProps[];
    actions: Pick<TableAdminActionProps, 'state' | 'events' | 'hook'> & {
        link: Pick<TableAdminActionLinkProps, 'page'>;
    };
};

const RenderBooleanData = ({ check }: { check: boolean }) => {
    if (check) {
        return (
            <CiCircleCheck
                size={30}
                color="var(--bs-success)"
            />
        );
    }

    return (
        <CiCircleRemove
            size={30}
            color="var(--bs-danger)"
        />
    );
};

const RenderImagesData = ({ items }: { items: string[] }) => {
    return (
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
};

const RenderBodyData = ({ datum }: { datum: string | string[] | boolean }) => {
    switch (typeof datum) {
        case 'boolean':
            return <RenderBooleanData check={datum} />;

        case 'object':
            return <RenderImagesData items={datum} />;

        default:
            return ReactHtmlParser(datum);
    }
};

const TableAdminBody = ({ entries, items, actions }: TableAdminBodyProps) => {
    return (
        <tbody>
            {entries?.map((entry: any, i: number) => {
                const actionsProps = {
                    ...actions,
                    data: {
                        index: i + 1,
                        id: entry.id,
                    },
                    link: {
                        page: actions.link.page,
                        slug: entry?.slug ?? '',
                    },
                };

                return (
                    <tr key={i}>
                        {items.map((item: TableAdminHeadItemProps, i: number) => {
                            let value = entry?.[item.slug as keyof object];
                            if (item?.isInverted) value = !value;

                            let className: ClassnameArrayProps = [];
                            if (item?.isHidden) className.push('d-none');
                            if (typeof value === 'boolean') className.push('text-center');
                            className = joinClassnameString(className);

                            return (
                                <td
                                    key={i}
                                    {...(className ? { className: className } : {})}>
                                    <RenderBodyData datum={value} />
                                </td>
                            );
                        })}
                        <TableAdminAction {...actionsProps} />
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableAdminBody;
