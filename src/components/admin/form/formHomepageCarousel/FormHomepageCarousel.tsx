'use client';

import React, { useEffect, useState } from 'react';

import { SUPABASE_VARIANTS } from '@/libs/handles';
import { getFormSubmitData } from '@/libs/utils';

import { CiTrash } from 'react-icons/ci';

import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import slugify from 'react-slugify';
import type { InputSelectItem } from '@/components/common/input/inputShared/InputSelect';

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

export type FormHomepageCarouselProps = {
    variant: typeof SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL;
} & Pick<FormHomepageCarouselItemProps, 'state'>;

const initData = {
    title: '',
    is_show: true,
    selectFrom: '',
    selectCategory: '',
    href: '',
    target: '',
    imageDesktop: '',
    imageMobile: '',
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
    const [data, setData] = useState<any>(value);
    // const [categorySelected, setCategorySelected] = useState<any>('');
    const [category, setCategory] = useState<any>(state.categories);
    // const [selectFrom, setSelectFrom] = useState<any>(undefined);

    const selectFromLabel = '-- Select Href From --';
    const selectFromItems: InputSelectItem[] = [
        { slug: 'categories', label: 'Categories' },
        { slug: 'custom', label: 'Custom' },
    ];

    // console.log(state);

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
                            id: `href_${index}`,
                            key: 'href',
                            items: category,
                            label: '-- Select Category --',
                            value: data?.href ? data.href.replace('/', '') : '',
                            setValue: setData,
                            prevValue: data,
                        }}
                    />
                    <Input
                        variant="regular"
                        input={{
                            id: 'href_label',
                            value: `/${slugify(data?.href ? data.href.replace('/', '') : '')}`,
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
                        id: 'href_custom',
                        key: 'href',
                        value: data?.href ?? '',
                        setValue: setData,
                        prevValue: data,
                    }}
                />
            );
            break;
    }

    useEffect(() => {
        setData(value);
    }, [value]);

    useEffect(() => {
        const duplicateArray = [...prevValue];
        duplicateArray.splice(index, 1, data);

        setValue && setValue(duplicateArray);
    }, [data]);

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
                            key: 'title',
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
                            key: 'is_show',
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
                                    id: 'selectFrom',
                                    label: selectFromLabel,
                                    value: data.selectFrom,
                                    setValue: setData,
                                    prevValue: data,
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
                            id: 'imageDesktop',
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
                            id: 'imageMobile',
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

const FormHomepageCarousel = ({ state }: FormHomepageCarouselProps): React.ReactElement => {
    const [formData, setFormData] = useState<any[]>([]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const submitData = getFormSubmitData(e.target as HTMLElement);

        console.log(SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL, formData);
    };

    const addItemHandler = () => {
        setFormData([...formData, initData]);
    };

    const deleteItemHandler = (index: number) => {
        const duplicateData = [...formData];
        duplicateData.splice(index, 1);

        setFormData(duplicateData);
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <form
            id={SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL}
            onSubmit={submitHandler}>
            <Button
                variant="base"
                type="submit"
                className="d-none">
                SUBMIT
            </Button>

            {formData.map((item: any, i: number) => (
                <FormHomepageCarouselItem
                    key={i}
                    state={state}
                    value={formData[i]}
                    setValue={setFormData}
                    prevValue={formData}
                    index={i}
                    isLast={i === formData.length - 1}
                    events={{ onDelete: deleteItemHandler }}
                />
            ))}

            <Button
                variant="outline"
                type="button"
                className="mt-3 w-100"
                events={{ onClick: addItemHandler }}>
                ADD NEW CAROUSEL
            </Button>
        </form>
    );
};

export default FormHomepageCarousel;
