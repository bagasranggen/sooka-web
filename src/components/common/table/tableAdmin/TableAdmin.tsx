import React from 'react';

import type { SupabaseVariantProps } from '@/libs/fetcher';
import { COMMON_REGEX, SupabaseHeaderProps } from '@/libs/data';
import { SUPABASE_HEADER_HANDLES, TABLE_FORM_HANDLES, TABLE_VARIANTS } from '@/libs/handles';
import { createDynamicElement } from '@/libs/factory';
import { truncateString } from '@/libs/utils';

import {
    CiCircleCheck,
    CiCircleChevDown,
    CiCircleChevUp,
    CiCircleRemove,
    CiEdit,
    CiLineHeight,
    CiTrash,
} from 'react-icons/ci';
import ReactHtmlParser from 'react-html-parser';

import Button, { ButtonGroup } from '@/components/common/button/Button';
import Input from '@/components/common/input/Input';
import type { InputTextProps } from '@/components/common/input/inputShared/inputText';

export type TableAdminCommonProps = {
    type: 'edit' | 'add';
};

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

export type TableAdminUpdateButtonProps = {
    hasOpenDetail: boolean;
    isOpenDetail: boolean;
    isReorder: boolean;
    isEditState?: {
        setValue?: InputTextProps['setValue'];
        prevValue?: InputTextProps['prevValue'];
    };
    events?: {
        onDelete?: (id: number) => void;
        onEdit?: (index: number | undefined) => void;
        onEditReorder?: (index: number | undefined) => void;
        onOpenDetail?: (index: number | undefined) => void;
    };
} & Pick<RenderTableAdminDataProps, 'datum' | 'isEdit' | 'index'>;

export type TableAdminItemProps = {
    slug: SupabaseVariantProps;
} & Omit<RenderTableAdminDataProps, 'table'> &
    Omit<TableAdminUpdateButtonProps, 'datum' | 'hasOpenDetail' | 'isEdit' | 'index'>;

export type TableAdminProps = {
    variant: typeof TABLE_VARIANTS.ADMIN;
    id: string;
    header: SupabaseHeaderProps[];
    body: any;
    isOpenDetail?: number;
    isEdit?: number;
    isReorder?: number;
    events?: {
        onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    } & TableAdminItemProps['events'];
} & Pick<TableAdminItemProps, 'isEditState' | 'slug'>;

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

const RenderTableAdminData = ({ table, datum, index, isEdit }: RenderTableAdminDataProps) => {
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

                const tdShow = isEdit ? 'd-none' : '';
                const tdAlign = typeof datum[keys] === 'boolean' ? ' text-center' : '';
                const tdClass = `${tdShow}${tdAlign}`;

                if (keys !== 'order')
                    return (
                        <td
                            key={`${keys}${index}`}
                            {...dataProps}
                            {...(tdClass ? { className: tdClass } : {})}>
                            {renderValue}
                        </td>
                    );
            })}
        </>
    );
};

const RenderTableAdminDetailData = ({ table, columnLength, datum }: RenderTableAdminDataDetailProps) => {
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

const TableAdminUpdateButton = ({
    datum,
    index,
    isEdit,
    isEditState,
    isReorder,
    isOpenDetail,
    hasOpenDetail,
    events,
}: TableAdminUpdateButtonProps) => {
    return (
        <td
            className="text-center"
            rowSpan={isOpenDetail ? 2 : 1}>
            <ButtonGroup>
                {!isEdit && !isReorder && (
                    <Button
                        variant="base"
                        type="button"
                        className="btn btn-outline-warning"
                        title="edit"
                        events={{
                            onClick: () => events?.onEdit && events.onEdit(index),
                        }}>
                        <CiEdit size={24} />
                    </Button>
                )}

                {(isEdit || isReorder) && (
                    <Button
                        variant="base"
                        type="submit"
                        className="btn btn-outline-success"
                        title="submit">
                        <CiCircleCheck size={24} />
                    </Button>
                )}

                {hasOpenDetail && (
                    <Button
                        variant="base"
                        type="button"
                        className="btn btn-outline-info"
                        title="detail"
                        events={{
                            onClick: () => events?.onOpenDetail && events.onOpenDetail(index),
                        }}>
                        {isOpenDetail ? <CiCircleChevUp size={24} /> : <CiCircleChevDown size={24} />}
                    </Button>
                )}

                {isReorder ? (
                    <div
                        className="btn btn-outline-primary p-0"
                        data-order={index}
                        style={{
                            width: '40px',
                            background: 'white',
                        }}>
                        <Input
                            variant="regular"
                            className="border-0 text-center"
                            input={{
                                id: 'order',
                                value: isEditState?.prevValue?.order ?? '',
                                setValue: isEditState?.setValue,
                                prevValue: isEditState?.prevValue,
                                pattern: COMMON_REGEX.NUMBER_VALIDATION,
                                type: 'number',
                            }}
                        />
                    </div>
                ) : (
                    <Button
                        variant="base"
                        type="button"
                        className="btn btn-outline-primary"
                        title="re-order"
                        events={{
                            onClick: () => events?.onEditReorder && events.onEditReorder(index),
                        }}>
                        <CiLineHeight size={24} />
                    </Button>
                )}

                <Button
                    variant="base"
                    type="button"
                    className="btn btn-outline-danger"
                    title="cancel"
                    events={{
                        onClick: () => {
                            // Event Delete Data
                            if (!isEdit && !isReorder) {
                                events?.onDelete && events.onDelete(datum.id);
                            }

                            // Event Cancel Editing
                            if (isEdit) {
                                events?.onEdit && events.onEdit(undefined);
                            }
                            if (isReorder) {
                                events?.onEditReorder && events.onEditReorder(undefined);
                            }
                        },
                    }}>
                    {isEdit || isReorder ? <CiCircleRemove size={24} /> : <CiTrash size={20} />}
                </Button>
            </ButtonGroup>
        </td>
    );
};

const TableAdminItem = ({
    datum,
    index,
    slug,
    events,
    isEdit,
    isEditState,
    isReorder,
    isOpenDetail,
}: TableAdminItemProps) => {
    const tableOrder = SUPABASE_HEADER_HANDLES[slug];
    const tableSummary = tableOrder.filter((item: SupabaseHeaderProps) => !item?.isDetail);
    const tableDetail = tableOrder.filter((item: SupabaseHeaderProps) => item?.isDetail);

    let hasDetail = false;
    tableDetail.map((item: SupabaseHeaderProps) => {
        if (datum[item.slug]) hasDetail = true;
    });

    return (
        <>
            <tr>
                {isEdit
                    ? createDynamicElement({
                          handles: TABLE_FORM_HANDLES,
                          selector: slug,
                          props: {
                              type: 'edit',
                              prevValue: isEditState?.prevValue,
                              setValue: isEditState?.setValue,
                          },
                      })
                    : null}

                <RenderTableAdminData
                    table={tableSummary}
                    datum={datum}
                    index={index}
                    isEdit={isEdit}
                />

                <TableAdminUpdateButton
                    index={index}
                    datum={datum}
                    isEdit={isEdit}
                    isEditState={isEditState}
                    isReorder={isReorder}
                    isOpenDetail={isOpenDetail}
                    hasOpenDetail={hasDetail}
                    events={events}
                />
            </tr>

            {isOpenDetail && !isEdit && (
                <tr>
                    <RenderTableAdminDetailData
                        table={tableDetail}
                        columnLength={tableDetail.length + 1}
                        datum={datum}
                    />
                </tr>
            )}
        </>
    );
};

const TableAdmin = ({
    id,
    header,
    body,
    events,
    slug,
    isEdit,
    isEditState,
    isReorder,
    isOpenDetail,
}: TableAdminProps): React.ReactElement => {
    return (
        <form
            id={id}
            onSubmit={events?.onSubmit}>
            <div className="table-responsive">
                <table className="table table--admin">
                    <thead>
                        <tr>
                            {header.map((header: SupabaseHeaderProps, i: number) => {
                                return (
                                    <th
                                        key={i}
                                        {...(header.align ? { className: `text-${header.align}` } : {})}
                                        {...(header?.size
                                            ? { style: { width: header.size, minWidth: header.size } }
                                            : {})}>
                                        {header?.label}
                                    </th>
                                );
                            })}
                            <th
                                className="text-center"
                                style={{ width: '80px' }}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {body.length === 0 ? (
                            <tr>
                                <td
                                    className="text-center"
                                    colSpan={header.length + 1}>
                                    <h5 className="mb-0">No data found</h5>
                                </td>
                            </tr>
                        ) : (
                            <>
                                {body?.map((datum: any, i: number) => (
                                    <TableAdminItem
                                        key={i}
                                        datum={datum}
                                        index={i}
                                        slug={slug}
                                        isOpenDetail={isOpenDetail === i}
                                        isEdit={isEdit === i}
                                        isReorder={isReorder === i}
                                        isEditState={{
                                            setValue: isEditState?.setValue,
                                            prevValue: isEditState?.prevValue,
                                        }}
                                        events={{
                                            onDelete: () => events?.onDelete && events.onDelete(datum.id),
                                            onEdit: () => {
                                                events?.onEdit && events.onEdit(isEdit === i ? undefined : i);
                                                events?.onEditReorder && events.onEditReorder(undefined);
                                                events?.onOpenDetail && events?.onOpenDetail(undefined);
                                            },
                                            onEditReorder: () => {
                                                events?.onEdit && events.onEdit(undefined);
                                                events?.onOpenDetail && events?.onOpenDetail(undefined);
                                                events?.onEditReorder &&
                                                    events.onEditReorder(isReorder === i ? undefined : i);
                                            },
                                            onOpenDetail: () => {
                                                events?.onEdit && events.onEdit(undefined);
                                                events?.onEditReorder && events.onEditReorder(undefined);
                                                events?.onOpenDetail &&
                                                    events?.onOpenDetail(isOpenDetail === i ? undefined : i);
                                            },
                                        }}
                                    />
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </form>
    );
};

export default TableAdmin;
