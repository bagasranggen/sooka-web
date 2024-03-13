import React from 'react';

import type { SupabaseVariantProps } from '@/libs/fetcher';
import { COMMON_REGEX, SupabaseHeaderProps } from '@/libs/data';
import { TABLE_FORM_HANDLES, TABLE_VARIANTS } from '@/libs/handles';
import { createDynamicElement } from '@/libs/factory';

import { CiCircleCheck, CiCircleRemove, CiEdit, CiLineHeight, CiTrash } from 'react-icons/ci';
import ReactHtmlParser from 'react-html-parser';

import Button, { ButtonGroup } from '@/components/common/button/Button';
import Input from '@/components/common/input/Input';
import type { InputTextProps } from '@/components/common/input/inputShared/inputText';

export type TableAdminCommonProps = {
    type: 'edit' | 'add';
};

export type TableAdminItemProps = {
    datum: any;
    index: number;
    slug: SupabaseVariantProps;
    isEdit?: boolean;
    isReorder?: boolean;
    isEditState?: {
        setValue?: InputTextProps['setValue'];
        prevValue?: InputTextProps['prevValue'];
    };
    events?: {
        onDelete?: (id: number) => void;
        onEdit?: (index: number | undefined) => void;
        onEditReorder?: (index: number | undefined) => void;
    };
};

export type TableAdminProps = {
    variant: typeof TABLE_VARIANTS.ADMIN;
    id: string;
    header: SupabaseHeaderProps[];
    body: any;
    isEdit?: number;
    isReorder?: number;
    events?: {
        onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    } & TableAdminItemProps['events'];
} & Pick<TableAdminItemProps, 'isEditState' | 'slug'>;

const TableAdminItem = ({ datum, index, slug, events, isEdit, isEditState, isReorder }: TableAdminItemProps) => {
    return (
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

            <>
                {Object.keys(datum).map((keys: string) => {
                    let value = datum[keys];
                    if (value === true) value = <CiCircleCheck size={30} />;
                    if (value === false) value = <CiCircleRemove size={30} />;

                    const tdShow = isEdit || keys === 'id' ? 'd-none' : '';
                    const tdAlign = typeof datum[keys] === 'boolean' ? ' text-center' : '';
                    const tdClass = `${tdShow}${tdAlign}`;

                    const dataProps = { [`data-${keys === 'id' ? 'id' : 'value'}`]: datum[keys] };

                    if (keys !== 'order')
                        return (
                            <td
                                key={`${keys}${index}`}
                                {...dataProps}
                                {...(tdClass ? { className: tdClass } : {})}>
                                {typeof value === 'string' ? ReactHtmlParser(value) : value}
                            </td>
                        );
                })}
            </>

            <td className="text-center">
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
        </tr>
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
                                        {...(header?.size ? { style: { width: header.size } } : {})}>
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
                                        isEdit={isEdit === i}
                                        isReorder={isReorder === i}
                                        isEditState={{
                                            setValue: isEditState?.setValue,
                                            prevValue: isEditState?.prevValue,
                                        }}
                                        events={{
                                            onDelete: () => events?.onDelete && events.onDelete(datum.id),
                                            onEdit: () => events?.onEdit && events.onEdit(isEdit === i ? undefined : i),
                                            onEditReorder: () =>
                                                events?.onEditReorder &&
                                                events.onEditReorder(isReorder === i ? undefined : i),
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
