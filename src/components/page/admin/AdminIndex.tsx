'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { SupabaseHeaderProps } from '@/libs/data';
import { supabaseAction, SupabaseVariantProps } from '@/libs/fetcher/supabaseAction';
import { getFormSubmitData } from '@/libs/utils';
import { SUPABASE_HEADER_HANDLES } from '@/libs/handles';

import type { TableAdminProps } from '@/components/common/table/tableAdmin/TableAdmin';
import Table from '@/components/common/table/Table';
import Button from '@/components/common/button/Button';

export type AdminIndexProps = {
    entries: {
        slug: SupabaseVariantProps;
        title: string;
        table: Omit<TableAdminProps, 'variant'>;
    };
};

const AdminIndex = ({ entries }: AdminIndexProps): React.ReactElement => {
    const router = useRouter();
    const [isAddingRow, setIsAddingRow] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<undefined | number>(undefined);
    const [form, setForm] = useState<any>({});
    const tableId = 'cms-simple';

    const deleteDataHandler = (id: number) => {
        supabaseAction({
            variant: 'delete',
            relation: entries.slug,
            id,
        });

        router.refresh();
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as unknown as HTMLElement;
        const submitForm: any = getFormSubmitData(form);

        supabaseAction({
            variant: 'insert',
            relation: entries.slug,
            data: [submitForm],
        });

        setIsAddingRow(false);

        router.refresh();
    };

    const submitUpdateFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as unknown as HTMLElement;
        const submitForm: any = getFormSubmitData(form);
        const id = (
            form.querySelectorAll('tbody tr')[isEditing as number].querySelector('[data-id]') as Element
        ).getAttribute('data-id') as string;

        supabaseAction({
            variant: 'update',
            relation: entries.slug,
            id: parseInt(id),
            data: submitForm,
        });

        setIsEditing(undefined);
        router.refresh();
    };

    useEffect(() => {
        if (typeof document === undefined) return;

        const type = typeof isEditing !== 'undefined' ? 'edit' : 'add';

        const tableKeys = SUPABASE_HEADER_HANDLES[entries.slug].map((header: SupabaseHeaderProps) => header.slug);
        const tableForm = document.querySelector(`#${tableId}`) as unknown as HTMLElement;

        let tempData: string[] = [];
        if (type === 'edit' && typeof isEditing !== 'undefined') {
            const editData = tableForm.querySelectorAll('tbody tr')[isEditing].querySelectorAll('[data-value]');
            editData.forEach((element: Element) => tempData.push(element.getAttribute('data-value') as string));
        }

        const data: any = {};
        tableKeys.map((keys: string, i: number) => {
            let d: string | boolean = '';

            if (type === 'edit') {
                d = tempData[i];
                if (tempData[i] === 'true') d = true;
                if (tempData[i] === 'false') d = false;
            }

            data[keys] = d;
        });

        setForm(data);
    }, [isEditing, isAddingRow]);

    return (
        <>
            <h1>{entries.title}</h1>
            <Table
                variant="admin"
                id={tableId}
                header={entries.table.header}
                body={entries.table.body}
                slug={entries.slug}
                isEdit={isEditing}
                isEditState={{
                    prevValue: form,
                    setValue: setForm,
                }}
                events={{
                    onDelete: (id: number) => deleteDataHandler(id),
                    onEdit: (index: number | undefined) => setIsEditing(index),
                    onEditCancel: (index: undefined) => setIsEditing(index),
                    onSubmit: submitUpdateFormHandler,
                }}
            />

            {!isEditing && (
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
