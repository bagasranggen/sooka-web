'use client';

import React, { useEffect, useState } from 'react';

import type { SupabaseHeaderProps } from '@/libs/data';
import { SUPABASE_HEADER_HANDLES } from '@/libs/handles';
import { supabaseClientAction } from '@/libs/fetcher/supabaseClientAction';

import type { InputTextProps } from '@/components/common/input/inputShared/InputText';
import type { TableAdminCommonProps } from '@/components/common/table/tableAdmin/TableAdmin';

import Input from '@/components/common/input/Input';

export type TableCategoriesFormProps = TableAdminCommonProps & Pick<InputTextProps, 'setValue' | 'prevValue'>;

const TableCategoriesForm = ({ setValue, prevValue }: TableCategoriesFormProps): React.ReactElement => {
    const header = SUPABASE_HEADER_HANDLES.productListing.filter((item: SupabaseHeaderProps) => !item?.isDetail);

    const [category, setCategory] = useState<any>([]);

    const getCategory = async () => {
        await supabaseClientAction({
            variant: 'fetch',
            relation: 'categories',
            onFinish: ({ data }) => {
                setCategory(data);
            },
        });
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
            <td colSpan={header.length}>
                <div className="row gy-3 gx-1">
                    <div className="col-md-8">
                        <Input
                            variant="regular"
                            label="Name"
                            input={{
                                id: 'name',
                                type: 'text',
                                value: prevValue?.name ?? '',
                                setValue,
                                prevValue,
                            }}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            variant="regular"
                            label="Category"
                            input={{
                                id: 'category',
                                type: 'select',
                                items: category,
                                label: '-- Select Category --',
                                value: prevValue?.category ?? '',
                                setValue,
                                prevValue,
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            variant="regular"
                            label="Ingredients"
                            input={{
                                id: 'ingredients',
                                type: 'ck-editor',
                                value: prevValue?.ingredients ?? '',
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            variant="regular"
                            label="Package"
                            input={{
                                id: 'package',
                                type: 'ck-editor',
                                value: prevValue?.package ?? '',
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            variant="regular"
                            label="Image Desktop"
                            input={{
                                id: 'imageDesktop',
                                type: 'text',
                                value: prevValue?.imageDesktop ?? '',
                                setValue,
                                prevValue,
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            variant="regular"
                            label="Image Mobile"
                            input={{
                                id: 'imageMobile',
                                type: 'text',
                                value: prevValue?.imageMobile ?? '',
                                setValue,
                                prevValue,
                            }}
                        />
                    </div>
                </div>
            </td>
        </>
    );
};

export default TableCategoriesForm;
