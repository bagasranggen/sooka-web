import React from 'react';

import type { SupabaseVariantProps } from '@/libs/fetcher';
import { COMMON_REGEX } from '@/libs/data';

import { CiCircleCheck, CiCircleRemove, CiEdit, CiLineHeight, CiTrash } from 'react-icons/ci';

import Button, { ButtonGroup } from '@/components/common/button/Button';
import Input from '@/components/common/input/Input';
import type { InputHookRegisterProps } from '@/libs/@types';
import { UseFormSetValue } from 'react-hook-form';

export type TableAdminActionLinkProps = {
    page: SupabaseVariantProps;
    slug: string;
};

export type TableAdminActionProps = {
    link: TableAdminActionLinkProps;
    data: {
        id: number;
        index: number;
    };
    state?: {
        type?: string;
        isReordering?: boolean;
    };
    hook: { setValue: UseFormSetValue<any> } & InputHookRegisterProps;
    events?: {
        onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
        onReorder?: (index: boolean | undefined) => void;
        onDelete?: (index: number) => void;
    };
};

const TableAdminAction = ({ link, data, state, hook, events }: TableAdminActionProps) => {
    const inputStyle = {
        width: '40px',
        ...(data.index % 2 ? { background: 'var(--bs-table-striped-bg)' } : {}),
    } as React.CSSProperties;

    const typeInputId = 'type';

    // console.log(state);

    return (
        <td className="text-center">
            <form onSubmit={events?.onSubmit}>
                <Input
                    variant="regular"
                    input={{
                        id: typeInputId,
                        // value: formatType,
                        // isHidden: true,
                        isDisabled: true,
                        hook: { register: hook.register, options: { required: true } },
                    }}
                />

                {state?.type === 'delete' && (
                    <Input
                        variant="regular"
                        input={{
                            id: 'productId',
                            value: data.id,
                            // isHidden: true,
                            isDisabled: true,
                            hook: { register: hook.register, options: { required: true } },
                        }}
                    />
                )}

                <ButtonGroup>
                    {state?.isReordering ? (
                        <Button
                            variant="base"
                            type="submit"
                            className="btn btn-outline-success"
                            title="submit">
                            <CiCircleCheck size={24} />
                        </Button>
                    ) : (
                        <Button
                            variant="base"
                            type="anchor"
                            className="btn btn-outline-warning"
                            title="edit"
                            href={`/admin/edit/${link.page}?slug=${link.slug}`}>
                            <CiEdit size={24} />
                        </Button>
                    )}

                    {state?.isReordering ? (
                        <div
                            className="btn btn-outline-primary p-0"
                            style={inputStyle}>
                            <Input
                                variant="regular"
                                className="border-0 text-center"
                                input={{
                                    id: 'order',
                                    value: data.index,
                                    // value: isEditState?.prevValue?.order ?? '',
                                    // setValue: isEditState?.setValue,
                                    // prevValue: isEditState?.prevValue,
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
                                onClick: () => {
                                    events?.onReorder && events.onReorder(true);
                                    hook?.setValue('type', 'reorder');
                                },
                            }}>
                            <CiLineHeight size={24} />
                        </Button>
                    )}

                    <Button
                        variant="base"
                        type="submit"
                        className="btn btn-outline-danger"
                        title="cancel"
                        events={{
                            onClick: () => {
                                // Event Delete Data
                                // if (!isEdit && !isReorder && !isOpenDetail) {
                                // events?.onDelete && events.onDelete(datum.id);
                                // }

                                if (state?.isReordering && events?.onReorder) {
                                    // hook.setValue(typeInputId, '');
                                    events.onReorder(undefined);
                                }

                                if (!state?.isReordering && events?.onDelete) {
                                    hook.setValue(typeInputId, 'delete');
                                    events.onDelete(data.id);
                                }
                            },
                        }}>
                        {/*<CiTrash size={20} />*/}
                        {state?.isReordering ? <CiCircleRemove size={24} /> : <CiTrash size={20} />}
                    </Button>
                </ButtonGroup>
            </form>
        </td>
    );
};

export default TableAdminAction;
