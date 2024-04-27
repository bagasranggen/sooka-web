'use client';

import React from 'react';

import type { SupabaseVariantProps } from '@/libs/fetcher';
import type { InputHookValueProps } from '@/libs/@types';
import { COMMON_REGEX } from '@/libs/data';

import { CiCircleCheck, CiCircleRemove, CiEdit, CiLineHeight, CiTrash } from 'react-icons/ci';
import { useForm } from 'react-hook-form';

import Button, { ButtonGroup } from '@/components/common/button/Button';
import Input from '@/components/common/input/Input';

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
    events?: {
        onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
        onReorder?: (index: boolean | undefined) => void;
    };
};

const TableAdminAction = ({ link, data, state, events }: TableAdminActionProps) => {
    const { register, handleSubmit, setValue } = useForm<InputHookValueProps>({ mode: 'onChange' });

    const typeInputId = 'type';
    const inputStyle = {
        width: '40px',
        background: data.index % 2 ? 'var(--bs-body-bg)' : 'var(--bs-table-striped-bg)',
    } as React.CSSProperties;

    return (
        <td className="text-center">
            <form onSubmit={events?.onSubmit ? handleSubmit(events?.onSubmit) : undefined}>
                <Input
                    variant="regular"
                    input={{
                        id: typeInputId,
                        isHidden: true,
                        hook: { register: register },
                    }}
                />

                <Input
                    variant="regular"
                    input={{
                        id: 'id',
                        value: data.id,
                        isHidden: true,
                        hook: { register: register },
                    }}
                />

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
                                    id: 'orderFrom',
                                    type: 'number',
                                    value: data.index,
                                    pattern: COMMON_REGEX.NUMBER_VALIDATION,
                                    hook: { register: register },
                                    isHidden: true,
                                }}
                            />
                            <Input
                                variant="regular"
                                className="border-0 text-center"
                                input={{
                                    id: 'orderTo',
                                    type: 'number',
                                    value: data.index + 1,
                                    pattern: COMMON_REGEX.NUMBER_VALIDATION,
                                    hook: { register: register },
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
                                    setValue('type', 'reorder');
                                },
                            }}>
                            <CiLineHeight size={24} />
                        </Button>
                    )}

                    <Button
                        variant="base"
                        type={state?.isReordering ? 'button' : 'submit'}
                        className="btn btn-outline-danger"
                        title="cancel"
                        events={{
                            onClick: () => {
                                if (state?.isReordering && events?.onReorder) {
                                    setValue(typeInputId, '');
                                    events.onReorder(undefined);
                                }

                                if (!state?.isReordering) {
                                    setValue(typeInputId, 'delete');
                                }
                            },
                        }}>
                        {state?.isReordering ? <CiCircleRemove size={24} /> : <CiTrash size={20} />}
                    </Button>
                </ButtonGroup>
            </form>
        </td>
    );
};

export default TableAdminAction;
