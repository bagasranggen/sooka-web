'use client';

import React, { useEffect, useState } from 'react';

import { supabaseClientAction } from '@/libs/fetcher/supabaseClientAction';

import slugify from 'react-slugify';

import type { InputTextProps } from '@/components/common/input/inputShared/inputText';
import type { InputSelectItem } from '@/components/common/input/inputShared/InputSelect';
import type { TableAdminCommonProps } from '@/components/common/table/tableAdmin/TableAdmin';
import Input from '@/components/common/input/Input';

export type TableCategoriesFormProps = TableAdminCommonProps & Pick<InputTextProps, 'setValue' | 'prevValue'>;

const TableCategoriesForm = ({ setValue, prevValue, type }: TableCategoriesFormProps): React.ReactElement => {
    const selectFromLabel = '-- Select Navigation From --';
    const selectFromItems: InputSelectItem[] = [
        { slug: 'categories', label: 'Categories' },
        { slug: 'custom', label: 'Custom' },
    ];

    const [category, setCategory] = useState<any>([]);
    const [selectFrom, setSelectFrom] = useState<any>(undefined);

    let inputLabel = <></>;
    switch (selectFrom) {
        case 'categories':
            inputLabel = (
                <Input
                    variant="regular"
                    label="Category"
                    input={{
                        type: 'select',
                        id: 'label',
                        items: category,
                        label: '-- Select Category --',
                        value: prevValue?.label ?? '',
                        setValue,
                        prevValue,
                        selectValue: 'label',
                    }}
                />
            );
            break;

        case 'custom':
            inputLabel = (
                <Input
                    variant="regular"
                    label="Custom"
                    input={{
                        id: 'label',
                        value: prevValue?.label ?? '',
                        setValue,
                        prevValue,
                    }}
                />
            );
            break;
    }

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

    useEffect(() => {
        if (type === 'edit' && prevValue && category) {
            const selectFromOnEdit = category.find((item: InputSelectItem) => item.label === prevValue.label);

            setSelectFrom(selectFromOnEdit?.slug ? 'categories' : 'custom');
        }
    }, [type, prevValue, category]);

    useEffect(() => {
        if (type === 'add') {
            setValue && setValue({ ...prevValue, ...{ label: '' } });
        }
    }, [type, selectFrom, setValue, prevValue]);

    return (
        <>
            <td>
                <Input
                    variant="regular"
                    className={selectFrom === undefined || selectFrom === selectFromLabel ? '' : 'mb-1'}
                    input={{
                        type: 'select',
                        id: 'selectFrom',
                        label: selectFromLabel,
                        value: selectFrom,
                        setValue: setSelectFrom,
                        items: selectFromItems,
                    }}
                />
                {inputLabel}
            </td>
            <td>
                <Input
                    variant="regular"
                    input={{
                        id: 'href',
                        value: `/${slugify(prevValue?.label ?? '')}`,
                        isDisabled: true,
                    }}
                />
            </td>
            <td>
                <Input
                    variant="regular"
                    input={{
                        id: 'target',
                        type: 'switch',
                        color: 'primary',
                        isChecked: prevValue?.target ?? false,
                        setIsChecked: setValue,
                        prevValue,
                    }}
                />
            </td>
            <td>
                <Input
                    variant="regular"
                    input={{
                        id: 'is_show',
                        type: 'switch',
                        color: 'primary',
                        isChecked: type === 'add' ? true : prevValue?.['is_show'] ?? false,
                        setIsChecked: setValue,
                        prevValue,
                    }}
                />
            </td>
        </>
    );
};

export default TableCategoriesForm;
