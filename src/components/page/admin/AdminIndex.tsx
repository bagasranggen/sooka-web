'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { SupabaseHeaderProps } from '@/libs/data';
import { supabaseClientAction, SupabaseVariantProps } from '@/libs/fetcher/supabaseClientAction';
import { getFormSubmitData } from '@/libs/utils';
import { SUPABASE_HEADER_HANDLES } from '@/libs/handles';

import type { TableAdminProps } from '@/components/common/table/tableAdmin/TableAdmin';
import Table from '@/components/common/table/Table';
import Button from '@/components/common/button/Button';

export type AdminIndexProps = {
    entries: {
        slug: SupabaseVariantProps;
        title: string;
        table: Omit<TableAdminProps, 'variant' | 'slug' | 'id'>;
    };
};

const AdminIndex = ({ entries }: AdminIndexProps): React.ReactElement => {
    const router = useRouter();
    const [isAddingRow, setIsAddingRow] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<undefined | number>(undefined);
    const [isReordering, setIsReordering] = useState<undefined | number>(undefined);
    const [form, setForm] = useState<any>({});
    const tableId = 'cms-simple';

    const deleteDataHandler = (id: number) => {
        supabaseClientAction({
            variant: 'delete',
            relation: entries.slug,
            id,
            onFinish: () => {
                router.refresh();
            },
        });
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as unknown as HTMLElement;
        const submitForm: any = getFormSubmitData(form);
        const data = {
            ...submitForm,
            ...{ order: entries.table.body.length },
        };

        supabaseClientAction({
            variant: 'insert',
            relation: entries.slug,
            data: [data],
            onFinish: () => {
                setIsAddingRow(false);
                router.refresh();
            },
        });
    };

    const reorderArray = (arr: any[], from: number, to: number): any[] => {
        const duplicateArr: any[] = [...arr];

        duplicateArr.splice(to, 0, duplicateArr.splice(from, 1)[0]);

        return duplicateArr;
    };

    const submitUpdateOrderHandler = (arr: any[], from: number, to: number) => {
        const reorderArr = reorderArray(arr, from, to);
        const updateReorder = reorderArr.map((add: any, i: number) => {
            return {
                ...add,
                ...{ order: i },
            };
        });

        supabaseClientAction({
            variant: 'delete-all',
            relation: entries.slug,
            onFinish: () => {
                supabaseClientAction({
                    variant: 'insert',
                    relation: entries.slug,
                    data: updateReorder,
                    onFinish: () => {
                        setIsReordering(undefined);
                        router.refresh();
                    },
                });
            },
        });
    };

    const submitUpdateIndividualHandler = (data: unknown, id: number) => {
        supabaseClientAction({
            variant: 'update',
            relation: entries.slug,
            id: id,
            data,
            onFinish: () => {
                setIsEditing(undefined);
                router.refresh();
            },
        });
    };

    const submitUpdateFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as unknown as HTMLElement;
        const submitForm: any = getFormSubmitData(form);
        const id = (
            form.querySelectorAll('tbody tr')[isEditing as number]?.querySelector('[data-id]') as Element
        )?.getAttribute('data-id') as string;

        // console.log(submitForm);

        if (id) {
            submitUpdateIndividualHandler(submitForm, parseInt(id));
        } else {
            submitUpdateOrderHandler(entries.table.body, isReordering as number, parseInt(submitForm.order));
        }
    };

    useEffect(() => {
        if (typeof document === undefined) return;

        let type: 'add' | 'edit' | 'reorder' = 'add';
        if (typeof isEditing !== 'undefined') type = 'edit';
        if (typeof isReordering !== 'undefined') type = 'reorder';

        const tableKeys = SUPABASE_HEADER_HANDLES[entries.slug].map((header: SupabaseHeaderProps) => header.slug);
        const tableForm = document.querySelector(`#${tableId}`) as unknown as HTMLElement;

        let tempData: string[] | number = [];
        if (type === 'edit' && typeof isEditing !== 'undefined') {
            const editData = tableForm.querySelectorAll('tbody tr')[isEditing].querySelectorAll('[data-value]');
            editData.forEach((element: Element) =>
                (tempData as string[]).push(element.getAttribute('data-value') as string)
            );
        }
        if (type === 'reorder' && typeof isReordering !== 'undefined') {
            const editData = tableForm.querySelectorAll('tbody tr')[isReordering].querySelectorAll('[data-order]');
            tempData = parseInt(editData[0].getAttribute('data-order') as string);
        }

        const data: any = {};
        if (type !== 'reorder') {
            tableKeys.map((keys: string, i: number) => {
                let d: string | boolean = '';

                if (type === 'edit' && typeof tempData === 'object') {
                    d = tempData[i];
                    if (tempData[i] === 'true') d = true;
                    if (tempData[i] === 'false') d = false;
                }

                data[keys] = d;
            });
        }
        if (type === 'reorder') {
            data.order = tempData;
        }

        setForm(data);
    }, [isEditing, isAddingRow, isReordering]);

    // useEffect(() => {
    //     console.log(isEditing, isReordering);
    //     if (typeof isEditing !== 'undefined' || typeof isReordering !== 'undefined') return;
    //     console.log('should run after closing');
    //
    //     setTimeout(() => router.refresh(), 200);
    // }, [isEditing, isReordering]);

    return (
        <>
            <h1>{entries.title}</h1>
            <Table
                variant="admin"
                id={tableId}
                header={entries.table.header}
                body={entries.table.body}
                slug={entries.slug}
                isReorder={isReordering}
                isEdit={isEditing}
                isEditState={{
                    prevValue: form,
                    setValue: setForm,
                }}
                events={{
                    onDelete: (id: number) => deleteDataHandler(id),
                    onEdit: (index: number | undefined) => setIsEditing(index),
                    onEditReorder: (index: number | undefined) => setIsReordering(index),
                    onSubmit: submitUpdateFormHandler,
                }}
            />

            {typeof isEditing === 'undefined' && typeof isReordering === 'undefined' && (
                <Button
                    variant="block"
                    type="button"
                    className="w-100 mt-3"
                    events={{ onClick: () => setIsAddingRow(!isAddingRow) }}>
                    {isAddingRow ? 'Cancel' : 'Add'}
                </Button>
            )}

            {isAddingRow && (
                <div className="mt-3">
                    <Table
                        variant="admin-add"
                        type={entries.slug}
                        header={entries.table.header}
                        stateData={{
                            prevValue: form,
                            setValue: setForm,
                        }}
                        events={{ onSubmit: submitFormHandler }}
                    />
                </div>
            )}
        </>
    );
};

export default AdminIndex;
