'use client';

import React, { useEffect, useState } from 'react';

import type { InputTextProps } from '@/components/common/input/inputShared/inputText';
import type { TableAdminCommonProps } from '@/components/common/table/tableAdmin/TableAdmin';

import Input from '@/components/common/input/Input';
import { supabaseClientAction } from '@/libs/fetcher/supabaseClientAction';

export type TableCategoriesFormProps = TableAdminCommonProps & Pick<InputTextProps, 'setValue' | 'prevValue'>;

const TableCategoriesForm = ({ setValue, prevValue }: TableCategoriesFormProps): React.ReactElement => {
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
            <td colSpan={4}>
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
                </div>
            </td>
            {/*<td>*/}
            {/*</td>*/}
            {/*<td>*/}
            {/*</td>*/}
            {/*<td>*/}
            {/*</td>*/}
        </>
    );
};

export default TableCategoriesForm;
