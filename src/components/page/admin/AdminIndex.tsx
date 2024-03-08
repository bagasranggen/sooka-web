'use client';

import React, { useState } from 'react';

import { supabaseAction, SupabaseVariantProps } from '@/libs/fetcher/supabaseAction';

import type { TableAdminProps } from '@/components/common/table/tableAdmin/TableAdmin';
import Table from '@/components/common/table/Table';
import Test from '@/components/common/test';

export type AdminIndexProps = {
    entries: {
        slug: SupabaseVariantProps;
        title: string;
        table: Omit<TableAdminProps, 'variant'>;
    };
};

const AdminIndex = ({ entries }: AdminIndexProps): React.ReactElement => {
    const [isAddingRow, setIsAddingRow] = useState<boolean>(false);

    const addDataHandler = () => {
        supabaseAction({
            variant: 'insert',
            relation: 'categories',
            data: [{ label: 'someValue', slug: 'otherValue' }],
        });
    };

    const deleteDataHandler = (id: number) => {
        supabaseAction({
            variant: 'delete',
            relation: 'categories',
            id,
        });
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as unknown as HTMLElement;
        const submitForm: any = {};

        form.querySelectorAll('input').forEach((element: HTMLInputElement) => {
            submitForm[element.id] = element.value;
        });

        supabaseAction({
            variant: 'insert',
            relation: 'categories',
            data: [submitForm],
        });

        setIsAddingRow(false);
    };

    // addDataHandler();
    // deleteDataHandler();

    return (
        <>
            <h1>{entries.title}</h1>

            <Table
                variant="admin"
                header={entries.table.header}
                body={entries.table.body}
                events={{
                    onDelete: (id: number) => deleteDataHandler(id),
                }}
            />

            <Test onClick={() => setIsAddingRow(true)} />
            {isAddingRow && <Test onClick={() => setIsAddingRow(false)} />}

            {isAddingRow && (
                <Table
                    variant="admin-add"
                    type={entries.slug}
                    header={entries.table.header}
                    events={{ onSubmit: submitFormHandler }}
                />
            )}
        </>
    );
};

export default AdminIndex;
