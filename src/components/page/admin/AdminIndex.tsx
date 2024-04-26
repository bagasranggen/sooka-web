'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { supabaseClientAction, SupabaseVariantProps } from '@/libs/fetcher/supabaseClientAction';
import { getEditFormData, getFormSubmitData } from '@/libs/utils';

import { deleteCookie } from 'cookies-next';

import type { TableAdminProps } from '@/components/common/table/tableAdmin/TableAdmin';
import Table from '@/components/common/table/Table';
import Button from '@/components/common/button/Button';
import { TableAdminViewProps } from '@/components/common/table/tableAdminView/TableAdminView';
import {
    TableAdminActionLinkProps,
    TableAdminActionProps,
} from '@/components/common/table/tableAdminView/components/TableAction';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { InputHookValueProps } from '@/libs/@types';

export type AdminIndexProps = {
    entries: {
        slug: SupabaseVariantProps;
        title: string;
        table: Pick<TableAdminViewProps, 'head' | 'body'> & { link: Pick<TableAdminActionLinkProps, 'page'> };
    };
};

const AdminIndex = ({ entries }: AdminIndexProps): React.ReactElement => {
    const router = useRouter();
    const [isAddingRow, setIsAddingRow] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<undefined | number>(undefined);
    const [isReordering, setIsReordering] = useState<undefined | boolean>(undefined);
    const [isOpenDetail, setIsOpenDetail] = useState<undefined | number>(undefined);
    const [isDelete, setIsDelete] = useState<undefined | number>(undefined);
    const [form, setForm] = useState<any>({});
    const tableId = 'cms-simple';

    const {
        getValues,
        register,
        handleSubmit,
        setValue,
        formState: { errors, defaultValues, touchedFields },
        control,
    } = useForm<InputHookValueProps>({ mode: 'onChange' });

    console.log('value', getValues('type'));

    const onSubmitHandler: SubmitHandler<InputHookValueProps> = (data: InputHookValueProps) => {
        console.log(data);

        switch (data.type) {
            case 'reorder':
                console.log('reorder');
                break;

            case 'delete':
                console.log('delete');
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

    // const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //
    //     const form = e.target as unknown as HTMLElement;
    //     const submitForm: any = getFormSubmitData(form);
    //     const data = {
    //         ...submitForm,
    //         ...{ order: entries.table.body.length },
    //     };
    //
    //     supabaseClientAction({
    //         variant: 'insert',
    //         relation: entries.slug,
    //         data: [data],
    //         onFinish: () => {
    //             setIsAddingRow(false);
    //             router.refresh();
    //         },
    //     });
    // };

    // const reorderArray = (arr: any[], from: number, to: number): any[] => {
    //     const duplicateArr: any[] = [...arr];
    //
    //     duplicateArr.splice(to, 0, duplicateArr.splice(from, 1)[0]);
    //
    //     return duplicateArr;
    // };

    // const submitUpdateOrderHandler = (arr: any[], from: number, to: number) => {
    //     const reorderArr = reorderArray(arr, from, to);
    //     const updateReorder = reorderArr.map((add: any, i: number) => {
    //         return {
    //             ...add,
    //             ...{ order: i },
    //         };
    //     });
    //
    //     supabaseClientAction({
    //         variant: 'delete-all',
    //         relation: entries.slug,
    //         onFinish: () => {
    //             supabaseClientAction({
    //                 variant: 'insert',
    //                 relation: entries.slug,
    //                 data: updateReorder,
    //                 onFinish: () => {
    //                     setIsReordering(undefined);
    //                     router.refresh();
    //                 },
    //             });
    //         },
    //     });
    // };

    // const submitUpdateIndividualHandler = (data: unknown, id: number) => {
    //     supabaseClientAction({
    //         variant: 'update',
    //         relation: entries.slug,
    //         id: id,
    //         data,
    //         onFinish: () => {
    //             setIsEditing(undefined);
    //             router.refresh();
    //         },
    //     });
    // };
    //
    // const submitUpdateFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //
    //     const form = e.target as unknown as HTMLElement;
    //     const submitForm: any = getFormSubmitData(form);
    //     const id = (
    //         form.querySelectorAll('tbody tr')[isEditing as number]?.querySelector('[data-id]') as Element
    //     )?.getAttribute('data-id') as string;
    //
    //     if (id) {
    //         submitUpdateIndividualHandler(submitForm, parseInt(id));
    //     } else {
    //         submitUpdateOrderHandler(entries.table.body, isReordering as number, parseInt(submitForm.order));
    //     }
    // };

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
                    <h1 className="mb-0">{entries.title}</h1>
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
                        type: getValues('type'),
                        isReordering: isReordering,
                    },
                    link: { page: entries.table.link.page },
                    hook: { register, setValue },
                    events: {
                        onSubmit: handleSubmit(onSubmitHandler),
                        onReorder: (isReorder) => setIsReordering(isReorder),
                        onDelete: (index: number) => setIsDelete(index),
                    },
                }}
            />

            {typeof isEditing === 'undefined' && typeof isReordering === 'undefined' && (
                <Button
                    variant="block"
                    type="anchor"
                    href={`add/${entries.slug}`}
                    className="w-100 mt-3">
                    ADD
                </Button>
            )}
        </>
    );
};

export default AdminIndex;
