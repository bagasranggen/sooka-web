import React from 'react';

import type { SupabaseVariantProps } from '@/libs/fetcher';
import type { SupabaseHeaderProps } from '@/libs/data';
import { SUPABASE_HEADER_HANDLES, TABLE_FORM_HANDLES, TABLE_VARIANTS } from '@/libs/handles';
import { createDynamicElement } from '@/libs/factory';

import TableAdminUpdateButton, {
    type TableAdminUpdateButtonProps,
} from '@/components/common/table/tableAdmin/components/TableAdminUpdateButton';
import {
    RenderTableAdminData,
    RenderTableAdminDetailData,
    type RenderTableAdminDataProps,
} from '@/components/common/table/tableAdmin/components/TableRenderData';

export type TableAdminCommonProps = {
    type: 'edit' | 'add';
};

export type TableAdminDataProps = Omit<RenderTableAdminDataProps, 'table'>;

export type TableAdminButtonProps = Omit<TableAdminUpdateButtonProps, 'datum' | 'hasOpenDetail' | 'isEdit' | 'index'>;

export type TableAdminItemProps = {
    slug: SupabaseVariantProps;
} & TableAdminDataProps &
    TableAdminButtonProps;

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
