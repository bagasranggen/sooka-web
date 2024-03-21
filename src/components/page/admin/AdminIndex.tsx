'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { supabaseClientAction, SupabaseVariantProps } from '@/libs/fetcher/supabaseClientAction';
import { getEditFormData, getFormSubmitData } from '@/libs/utils';

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
    const [isOpenDetail, setIsOpenDetail] = useState<undefined | number>(undefined);
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

        if (id) {
            submitUpdateIndividualHandler(submitForm, parseInt(id));
        } else {
            submitUpdateOrderHandler(entries.table.body, isReordering as number, parseInt(submitForm.order));
        }
    };

    useEffect(() => {
        if (typeof document === undefined) return;

        const data = getEditFormData({
            slug: entries.slug,
            tableId,
            isEditing,
            isReordering,
        });

        setForm(data);
    }, [entries.slug, isEditing, isAddingRow, isReordering]);

    return (
        <>
            <h1>{entries.title}</h1>
            <Table
                variant="admin"
                id={tableId}
                header={entries.table.header}
                body={entries.table.body}
                slug={entries.slug}
                isOpenDetail={isOpenDetail}
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
                    onOpenDetail: (index: number | undefined) => setIsOpenDetail(index),
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
