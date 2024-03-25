'use client';

import React, { useEffect, useState } from 'react';

import { SUPABASE_HEADER_HANDLES } from '@/libs/handles';
import { supabaseClientAction } from '@/libs/fetcher/supabaseClientAction';

import slugify from 'react-slugify';

import type { InputTextProps } from '@/components/common/input/inputShared/inputText';
import type { TableAdminCommonProps } from '@/components/common/table/tableAdmin/TableAdmin';
import type { InputSelectItem } from '@/components/common/input/inputShared/InputSelect';
import Input from '@/components/common/input/Input';

export type TableHomepageCarouselFormProps = TableAdminCommonProps & Pick<InputTextProps, 'setValue' | 'prevValue'>;

const TableHomepageCarouselForm = ({
    setValue,
    prevValue,
    type,
}: TableHomepageCarouselFormProps): React.ReactElement => {
    const selectFromLabel = '-- Select Href From --';
    const selectFromItems: InputSelectItem[] = [
        { slug: 'categories', label: 'Categories' },
        { slug: 'custom', label: 'Custom' },
    ];

    const [categorySelected, setCategorySelected] = useState<any>('');
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
                            id: 'selectFrom',
                            items: category,
                            label: '-- Select Category --',
                            value: prevValue?.href ? prevValue.href.replace('/', '') : categorySelected,
                            setValue: setCategorySelected,
                        }}
                    />
                    <Input
                        variant="regular"
                        input={{
                            id: 'href',
                            value: `/${slugify(prevValue?.href ? prevValue.href.replace('/', '') : categorySelected)}`,
                            isDisabled: true,
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
                        id: 'href',
                        value: prevValue?.href ?? '',
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
            const selectFromOnEdit = category.find((item: InputSelectItem) => `/${item.slug}` === prevValue.href);

            setSelectFrom(selectFromOnEdit?.slug ? 'categories' : 'custom');
        }
    }, [type, prevValue, category]);

    return (
        <>
            <td colSpan={SUPABASE_HEADER_HANDLES.homepageCarousel.length}>
                <div className="row gy-2 gx-2">
                    <div className="col-md-10">
                        <Input
                            variant="regular"
                            label="Title"
                            input={{
                                id: 'title',
                                value: prevValue.title ?? '',
                                setValue,
                                prevValue,
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <Input
                            variant="regular"
                            label="Show"
                            input={{
                                id: 'is_show',
                                type: 'switch',
                                color: 'primary',
                                align: 'left',
                                isChecked: type === 'add' ? true : prevValue?.['is_show'] ?? false,
                                setIsChecked: setValue,
                                prevValue,
                            }}
                        />
                    </div>
                    <div className="col-md-10">
                        <div className="row gx-2">
                            <div className="col-md-6">
                                <Input
                                    variant="regular"
                                    label="Link"
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
                            </div>
                            <div className="col-md-6">{inputLabel}</div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <Input
                            variant="regular"
                            label="Open New Tab"
                            input={{
                                id: 'target',
                                type: 'switch',
                                color: 'primary',
                                align: 'left',
                                isChecked: type === 'add' ? false : prevValue?.target ?? false,
                                setIsChecked: setValue,
                                prevValue,
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            variant="regular"
                            label="Image Desktop"
                            input={{
                                id: 'imageDesktop',
                                value: prevValue.imageDesktop ?? '',
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
                                value: prevValue.imageMobile ?? '',
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

export default TableHomepageCarouselForm;
