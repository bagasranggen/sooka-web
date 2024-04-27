'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { InputHookValueProps } from '@/libs/@types';
import { supabaseClientAction, SupabaseVariantProps } from '@/libs/fetcher/supabaseClientAction';
import { reorderArray } from '@/libs/utils';

import { deleteCookie } from 'cookies-next';
import { SubmitHandler } from 'react-hook-form';

import Table, { type TableAdminViewProps, type TableAdminActionLinkProps } from '@/components/common/table/Table';
import Button from '@/components/common/button/Button';

export type AdminIndexProps = {
    entries: {
        slug: SupabaseVariantProps;
        data: any;
        title: string;
        table: Pick<TableAdminViewProps, 'head' | 'body'> & { link: Pick<TableAdminActionLinkProps, 'page'> };
    };
};

const AdminIndex = ({ entries }: AdminIndexProps): React.ReactElement => {
    const router = useRouter();
    const [isReordering, setIsReordering] = useState<undefined | boolean>(undefined);

    const onSubmitHandler: SubmitHandler<InputHookValueProps> = (data: InputHookValueProps) => {
        switch (data.type) {
            case 'reorder':
                console.log('reorder');
                updateOrderHandler(entries.data, parseInt(data.orderFrom), parseInt(data.orderTo) - 1);
                break;

            case 'delete':
                deleteDataHandler(parseInt(data.id));
                break;
        }
    };

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

    const updateIndividualHandler = (data: unknown, id: number, callback?: () => void) => {
        supabaseClientAction({
            variant: 'update',
            relation: entries.slug,
            id,
            data,
            onFinish: callback,
        });
    };

    const updateOrderHandler = (arr: any[], from: number, to: number) => {
        const reorderArr = reorderArray({ data: arr, from, to });
        const updateReorder = reorderArr.map((add: any, i: number) => {
            return {
                ...add,
                ...{ order: i },
            };
        });

        updateReorder.map((item: any, i: number) => {
            let onFinish = undefined;
            if (i === updateReorder.length - 1) {
                onFinish = () => {
                    setIsReordering(undefined);
                    router.refresh();
                };
            }

            updateIndividualHandler(item, item.id, onFinish);
        });
    };

    const userLogout = () => {
        supabaseClientAction({
            variant: 'user-logout',
            onFinish: () => {
                deleteCookie('user');
                router.push('/');
            },
        });
    };

    return (
        <>
            <div className="mb-5 row align-items-center">
                <div className="col-md">
                    <h1 className="fw-300 mb-0">{entries.title}</h1>
                </div>
                <div className="col-md-auto">
                    <Button
                        variant="outline"
                        type="button"
                        events={{ onClick: userLogout }}>
                        Log out
                    </Button>
                </div>
            </div>

            <Table
                variant="admin-view"
                head={entries.table.head}
                body={entries.table.body}
                actions={{
                    state: {
                        isReordering: isReordering,
                    },
                    link: { page: entries.table.link.page },
                    events: {
                        onSubmit: onSubmitHandler,
                        onReorder: (isReorder) => setIsReordering(isReorder),
                    },
                }}
            />

            {typeof isReordering === 'undefined' && (
                <Button
                    variant="block"
                    type="anchor"
                    href={`/admin/add/${entries.slug}`}
                    className="w-100 mt-3">
                    ADD
                </Button>
            )}
        </>
    );
};

export default AdminIndex;
