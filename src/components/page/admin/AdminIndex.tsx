'use client';

import React, { useState } from 'react';

import { supabaseAction, SupabaseVariantProps } from '@/libs/fetcher/supabaseAction';

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
            relation: entries.slug,
            id,
        });
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as unknown as HTMLElement;
        const submitForm: any = {};

        form.querySelectorAll('input, select').forEach((element: HTMLInputElement | Element) => {
            const type = element.getAttribute('type');

            switch (type) {
                case 'text':
                    if ('value' in element) submitForm[element.id] = element.value;
                    break;

                case 'checkbox':
                    if ('checked' in element) submitForm[element.id] = element?.checked;
                    break;
            }
        });

        supabaseAction({
            variant: 'insert',
            relation: entries.slug,
            data: [submitForm],
        });

        setIsAddingRow(false);
    };

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

            <Button
                variant="block"
                type="button"
                className="w-100 mt-3"
                events={{ onClick: () => setIsAddingRow(!isAddingRow) }}>
                {isAddingRow ? 'Cancel' : 'Add'}
            </Button>

            {isAddingRow && (
                <div className="mt-3">
                    <Table
                        variant="admin-add"
                        type={entries.slug}
                        header={entries.table.header}
                        events={{ onSubmit: submitFormHandler }}
                    />
                </div>
            )}
        </>
    );
};

export default AdminIndex;
