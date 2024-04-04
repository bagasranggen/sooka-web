'use client';

import React, { useEffect, useState } from 'react';

import { supabaseClientAction } from '@/libs/fetcher/supabaseClientAction';
import { SUPABASE_HEADER_HANDLES } from '@/libs/handles';
import type { SupabaseHeaderProps } from '@/libs/data';

import slugify from 'react-slugify';

import type { InputTextProps } from '@/components/common/input/inputShared/InputText';
import type { InputSelectItem } from '@/components/common/input/inputShared/InputSelect';
import type { TableAdminCommonProps } from '@/components/common/table/tableAdmin/TableAdmin';
import Input from '@/components/common/input/Input';

export type TableCategoriesFormProps = TableAdminCommonProps & Pick<InputTextProps, 'setValue' | 'prevValue'>;

const TableCategoriesForm = ({ setValue, prevValue, type }: TableCategoriesFormProps): React.ReactElement => {
    const header = SUPABASE_HEADER_HANDLES.navigation.filter((item: SupabaseHeaderProps) => !item?.isHidden);

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
                <>
                    <Input
                        variant="regular"
                        label="Category"
                        input={{
                            type: 'select',
                            id: 'categories_label',
                            items: category,
                            label: '-- Select Category --',
                            value: prevValue?.['categories_label'] ?? prevValue?.label ?? '',
                            setValue,
                            prevValue,
                            selectValue: 'label',
                        }}
                    />
                    <Input
                        variant="regular"
                        label="Label"
                        input={{
                            id: 'label',
                            value: '',
                            isDisabled: true,
                            isHidden: true,
                        }}
                    />
                    <Input
                        variant="regular"
                        label="Slug"
                        input={{
                            id: 'slug',
                            value: '',
                            isDisabled: true,
                            isHidden: true,
                        }}
                    />
                </>
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
            const selectFromOnEdit = category.find(
                (item: InputSelectItem) =>
                    item.label === prevValue.label || item.label === prevValue['categories_label']
            );

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
            <td colSpan={header.length}>
                <div className="row gx-2">
                    <div className="col-md">
                        <Input
                            variant="regular"
                            className={selectFrom === undefined || selectFrom === selectFromLabel ? '' : 'mb-1'}
                            label="Select Navigation From"
                            input={{
                                type: 'select',
                                id: 'type',
                                label: selectFromLabel,
                                value: selectFrom,
                                setValue: setSelectFrom,
                                items: selectFromItems,
                            }}
                        />
                    </div>
                    <div className="col-md-auto">
                        <Input
                            variant="regular"
                            label="Open New Tab"
                            input={{
                                id: 'target',
                                type: 'switch',
                                color: 'primary',
                                isChecked: prevValue?.target ?? false,
                                setIsChecked: setValue,
                                prevValue,
                            }}
                        />
                    </div>
                    <div className="col-md-auto">
                        <Input
                            variant="regular"
                            label="Show"
                            input={{
                                id: 'is_show',
                                type: 'switch',
                                color: 'primary',
                                isChecked: type === 'add' ? true : prevValue?.['is_show'] ?? false,
                                setIsChecked: setValue,
                                prevValue,
                            }}
                        />
                    </div>
                </div>

                <div className="row gx-2">
                    <div className="col-md-6">{inputLabel}</div>
                    <div className="col-md-6">
                        <Input
                            variant="regular"
                            label="Slug"
                            input={{
                                id: selectFrom === 'categories' ? 'categories_slug' : 'slug',
                                value: slugify(
                                    selectFrom === 'categories' ? prevValue['categories_label'] : prevValue.label
                                ),
                                isDisabled: true,
                            }}
                        />
                    </div>
                </div>
            </td>
        </>
    );
};

export default TableCategoriesForm;
