'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { InputHookValueProps } from '@/libs/@types';
import { COMMON_ADMIN, GLOBAL_MESSAGE } from '@/libs/data';
import { SUPABASE_VARIANTS } from '@/libs/handles';
import { joinClassnameString } from '@/libs/utils';
import { fetchAction, supabaseClientAction } from '@/libs/fetcher';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';

import Input, { InputSelectItem } from '@/components/common/input/Input';
import Button, { ButtonWrapper } from '@/components/common/button/Button';
import FormSelectUri from '@/components/admin/form/components/FormSelectUri';
import FormTitle, { type FormTitleProps } from '@/components/admin/form/components/FormTitle';

export type FormHomepageCarouselProps = {
    variant: typeof SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL;
    type: FormTitleProps['variant'];
    entries?: any;
};

const FormHomepageCarousel = ({ type, entries }: FormHomepageCarouselProps): React.ReactElement => {
    const router = useRouter();
    const { data, order, urlOptions, selectedFrom } = entries;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputHookValueProps>({ mode: 'onChange' });

    const onSubmitHandler: SubmitHandler<InputHookValueProps> = async (formData: InputHookValueProps) => {
        const { imageDesktop, imageMobile, ...restData } = formData;

        const submitData = {
            ...restData,
            images: [imageDesktop, imageMobile],
        };

        if (type === 'edit') {
            await supabaseClientAction({
                variant: 'update',
                relation: 'homepageCarousel',
                id: parseInt(data.id),
                data: submitData,
                onFinish: ({ error }) => {
                    if (!error) {
                        fetchAction({ variant: 'revalidate', path: { url: '/' } });
                        router.push(`/admin/${SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL}`);
                        router.refresh();
                    }
                },
            });
        }

        if (type === 'add') {
            await supabaseClientAction({
                variant: 'insert',
                relation: 'homepageCarousel',
                data: [{ ...submitData, order: order }],
                onFinish: ({ error }) => {
                    if (!error) {
                        fetchAction({ variant: 'revalidate', path: { url: '/' } });
                        router.push(`/admin/${SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL}`);
                        router.refresh();
                    }
                },
            });
        }
    };

    const gutterClass: string = joinClassnameString([COMMON_ADMIN.GUTTER, COMMON_ADMIN.SPACING]);

    const [selectFrom, setSelectFrom] = useState<any>(selectedFrom ?? '');
    const selectFromOptions: InputSelectItem[] = [
        { label: '-- Select From --', slug: '' },
        { label: 'Categories', slug: 'categories' },
        { label: 'Products', slug: 'products' },
        { label: 'Custom', slug: 'custom' },
    ];
    const options: InputSelectItem[] = selectFrom ? urlOptions[selectFrom] : [];

    return (
        <>
            <FormTitle variant={type}>{data?.title ?? 'New Carousel Item'}</FormTitle>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Row className={gutterClass}>
                    <Col lg={8}>
                        <Input
                            variant="regular"
                            label="Name"
                            input={{
                                id: 'title',
                                type: 'text',
                                value: data?.title ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.title,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                            }}
                        />
                    </Col>
                    <Col lg={'auto'}>
                        <Input
                            variant="regular"
                            label="Is Show"
                            input={{
                                id: 'is_show',
                                type: 'switch',
                                color: 'primary',
                                // align: 'left',
                                isChecked: data?.is_sold ?? true,
                                hook: { register: register },
                            }}
                            validation={{
                                isError: !!errors?.['is_sold'],
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                            }}
                        />
                    </Col>
                    <Col lg={'auto'}>
                        <Input
                            variant="regular"
                            label="Open New Tab"
                            input={{
                                id: 'target',
                                type: 'switch',
                                color: 'primary',
                                // align: 'left',
                                isChecked: data?.target ?? false,
                                hook: { register: register },
                            }}
                            validation={{
                                isError: !!errors?.['is_sold'],
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                            }}
                        />
                    </Col>
                </Row>

                <Row className={gutterClass}>
                    <Col lg={3}>
                        <Input
                            variant="regular"
                            label="Category"
                            input={{
                                id: 'selectFrom',
                                type: 'select',
                                items: selectFromOptions,
                                value: selectFrom,
                                setValue: setSelectFrom,
                                // hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.category,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                            }}
                        />
                    </Col>
                    <Col lg={4}>
                        <FormSelectUri
                            data={data}
                            selectFrom={selectFrom}
                            options={options}
                            hook={{ register, errors }}
                        />
                    </Col>
                </Row>

                <Row className={gutterClass}>
                    <Col lg={6}>
                        <Input
                            variant="regular"
                            label="Image Desktop"
                            input={{
                                id: 'imageDesktop',
                                type: 'text',
                                value: data?.images?.[0] ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.imageDesktop,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                            }}
                        />
                    </Col>
                    <Col lg={6}>
                        <Input
                            variant="regular"
                            label="Image Mobile"
                            input={{
                                id: 'imageMobile',
                                type: 'text',
                                value: data?.images?.[1] ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.imageMobile,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                            }}
                        />
                    </Col>
                </Row>

                <ButtonWrapper className="mt-3 d-block text-end">
                    <Button
                        variant="outline"
                        type="submit"
                        className="flex-grow-0">
                        Submit
                    </Button>
                </ButtonWrapper>
            </form>
        </>
    );
};

export default FormHomepageCarousel;
