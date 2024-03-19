import React from 'react';

import type { SupabaseVariantProps } from '@/libs/fetcher';
import { COMMON_REGEX, SupabaseHeaderProps } from '@/libs/data';
import { TABLE_FORM_HANDLES, TABLE_VARIANTS } from '@/libs/handles';
import { createDynamicElement } from '@/libs/factory';
import { truncateString } from '@/libs/utils';

import { CiCircleCheck, CiCircleRemove, CiEdit, CiLineHeight, CiTrash } from 'react-icons/ci';
import ReactHtmlParser from 'react-html-parser';

import Button, { ButtonGroup } from '@/components/common/button/Button';
import Input from '@/components/common/input/Input';
import type { InputTextProps } from '@/components/common/input/inputShared/inputText';

export type TableAdminCommonProps = {
    type: 'edit' | 'add';
};

export type RenderTableAdminDataProps = {
    datum: any;
    index: number;
    isEdit: boolean;
};

export type TableAdminItemProps = {
    slug: SupabaseVariantProps;
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
} & RenderTableAdminDataProps;

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

const RenderImagesArray = ({ items }: { items: string[] }): React.ReactElement => (
    <ul>
        {items.map((item: string, i: number) => (
            <li key={i}>
                <Button
                    variant="base"
                    type="anchor"
                    href={item}
                    openNewTab>
                    {truncateString(item, 45)}
                </Button>
            </li>
        ))}
    </ul>
);

const RenderTableAdminData = ({ datum, index, isEdit }: RenderTableAdminDataProps) => (
    <>
        {Object.keys(datum).map((keys: string) => {
            let value = datum[keys];
            if (value === true) value = <CiCircleCheck size={30} />;
            if (value === false) value = <CiCircleRemove size={30} />;

            let renderValue = value;
            if (typeof value === 'string') renderValue = ReactHtmlParser(value);
            if (value instanceof Array) renderValue = <RenderImagesArray items={value} />;

            let dataPropsKey = 'data-value';
            if (keys === 'id') dataPropsKey = 'data-id';
            if (keys === 'images') dataPropsKey = 'data-images';
            const dataProps = { [dataPropsKey]: datum[keys] };

            const tdShow = isEdit || keys === 'id' ? 'd-none' : '';
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

            <RenderTableAdminData
                datum={datum}
                index={index}
                isEdit={isEdit}
            />

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
