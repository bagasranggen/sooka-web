'use client';

import React, { useEffect, useState } from 'react';

import { useDebounce } from '@/libs/hooks';

import { CiTrash } from 'react-icons/ci';
import slugify from 'react-slugify';

import Input, { type InputSelectItem } from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';

export type FormHomepageCarouselItemProps = {
    index: number;
    isLast: boolean;
    state: any;
    value: any;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    prevValue: any[];
    events: {
        onDelete: (index: number) => void;
    };
};

const convertHomepageCarouselData = (data: any, category: any) => {
    const images = {
        imageDesktop: data?.images?.[0] ?? '',
        imageMobile: data?.images?.[1] ?? '',
    };

    let selectFrom = {};
    if (data.slug) selectFrom = { selectFrom: 'custom' };
    if (data?.['categories_slug']) {
        const selectedFromCategory = category?.find((item: any) => item.slug === data['categories_slug']);
        if (selectedFromCategory?.slug) selectFrom = { selectFrom: 'categories' };
    }

    return { ...data, ...images, ...selectFrom };
};

const FormHomepageCarouselItem = ({
    index,
    isLast,
    state,
    value,
    setValue,
    prevValue,
    events,
}: FormHomepageCarouselItemProps) => {
    const [data, setData] = useState<any>(convertHomepageCarouselData(value, state));
    const [category, setCategory] = useState<any>(state);

    const debounceData = useDebounce(data, 500);

    const selectFromLabel = '-- Select Href From --';
    const selectFromItems: InputSelectItem[] = [
        { slug: 'categories', label: 'Categories' },
        { slug: 'custom', label: 'Custom' },
    ];

    let inputLabel = <></>;
    switch (data.selectFrom) {
        case 'categories':
            inputLabel = (
                <>
                    <Input
                        variant="regular"
                        label="Category"
                        input={{
                            type: 'select',
                            id: `categories_slug_${index}`,
                            name: 'categories_slug',
                            items: category,
                            label: '-- Select Category --',
                            value: data?.['categories_slug'] ?? '',
                            setValue: setData,
                            prevValue: data,
                        }}
                    />

                    <Input
                        variant="regular"
                        label="Custom"
                        input={{
                            id: 'slug_empty',
                            name: 'slug',
                            value: '',
                            setValue: setData,
                            prevValue: data,
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
                        id: 'href_custom',
                        name: 'slug',
                        value: data?.slug ?? '',
                        setValue: setData,
                        prevValue: data,
                    }}
                />
            );
            break;
    }

    useEffect(() => {
        setData(convertHomepageCarouselData(value, state));
    }, [value, state]);

    useEffect(() => {
        const duplicateArray = [...prevValue];
        duplicateArray.splice(index, 1, data);
        setValue(duplicateArray);
    }, [debounceData]);

    return (
        <>
            <div className="row gx-0 mb-1">
                <div className="col-md">
                    <h5 className="mb-0">Homepage Item {index + 1}</h5>
                </div>
                <div className="col-md-auto">
                    <Button
                        variant="outline"
                        type="button"
                        className=""
                        events={{ onClick: () => events?.onDelete && events.onDelete(index) }}>
                        <CiTrash size={20} />
                    </Button>
                </div>
            </div>

            <div className="row gy-2 gx-2">
                <div className="col-md-10">
                    <Input
                        variant="regular"
                        label="Title"
                        input={{
                            id: `title_${index}`,
                            name: 'title',
                            value: data.title ?? '',
                            setValue: setData,
                            prevValue: data,
                        }}
                    />
                </div>
                <div className="col-md-2">
                    <Input
                        variant="regular"
                        label="Show"
                        input={{
                            id: `is_show_${index}`,
                            name: 'is_show',
                            type: 'switch',
                            color: 'primary',
                            align: 'left',
                            isChecked: data?.is_show ?? true,
                            setIsChecked: setData,
                            prevValue: data,
                        }}
                    />
                </div>
                <div className="col-md-10">
                    <div className="row gx-2">
                        <div className={data.selectFrom === '' ? 'col-md-12' : 'col-md-6'}>
                            <Input
                                variant="regular"
                                label="Link"
                                className={data.selectFrom === '' ? '' : 'mb-1'}
                                input={{
                                    type: 'select',
                                    id: `select_from_${index}`,
                                    name: 'selectFrom',
                                    label: selectFromLabel,
                                    value: data.selectFrom,
                                    setValue: setData,
                                    prevValue: data,
                                    items: selectFromItems,
                                    events: {
                                        onChange: () => {
                                            data?.slug &&
                                                setData((prevValue: any) => ({ ...prevValue, ...{ slug: '' } }));
                                        },
                                    },
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
                            id: `target_${index}`,
                            name: 'target',
                            type: 'switch',
                            color: 'primary',
                            align: 'left',
                            isChecked: data?.target ?? false,
                            setIsChecked: setData,
                            prevValue: data,
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <Input
                        variant="regular"
                        label="Image Desktop"
                        input={{
                            type: 'text',
                            id: `image_desktop_${index}`,
                            name: 'imageDesktop',
                            value: data.imageDesktop ?? '',
                            setValue: setData,
                            prevValue: data,
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <Input
                        variant="regular"
                        label="Image Mobile"
                        input={{
                            type: 'text',
                            id: `image_mobile_${index}`,
                            name: 'imageMobile',
                            value: data.imageMobile ?? '',
                            setValue: setData,
                            prevValue: data,
                        }}
                    />
                </div>
            </div>

            {!isLast && <hr className="mt-4 mb-2" />}
        </>
    );
};

export default FormHomepageCarouselItem;
