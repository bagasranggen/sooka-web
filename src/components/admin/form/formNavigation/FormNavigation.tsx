'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { InputHookValueProps } from '@/libs/@types';
import { SUPABASE_VARIANTS } from '@/libs/handles';
import { COMMON_ADMIN, GLOBAL_MESSAGE } from '@/libs/data';
import { joinClassnameString } from '@/libs/utils';
import { supabaseClientAction } from '@/libs/fetcher';

import { Col, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import Input, { InputSelectItem } from '@/components/common/input/Input';
import FormTitle, { FormTitleProps } from '@/components/admin/form/components/FormTitle';
import FormSelectUri from '@/components/admin/form/components/FormSelectUri';
import Button, { ButtonWrapper } from '@/components/common/button/Button';

export type FormNavigationProps = {
    variant: typeof SUPABASE_VARIANTS.NAVIGATION;
    type: FormTitleProps['variant'];
    entries?: any;
};

const FormNavigation = ({ type, entries }: FormNavigationProps) => {
    const router = useRouter();
    const { data, order, urlOptions, selectedFrom } = entries;

    const gutterClass: string = joinClassnameString([COMMON_ADMIN.GUTTER, COMMON_ADMIN.SPACING]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputHookValueProps>({ mode: 'onChange' });

    const onSubmitHandler: SubmitHandler<InputHookValueProps> = async (formData: InputHookValueProps) => {
        if (type === 'edit') {
            await supabaseClientAction({
                variant: 'update',
                relation: 'navigation',
                id: parseInt(data.id),
                data: formData,
                onFinish: ({ error }) => {
                    if (!error) {
                        router.push(`/admin/${SUPABASE_VARIANTS.NAVIGATION}`);
                        router.refresh();
                    }
                },
            });
        }

        if (type === 'add') {
            await supabaseClientAction({
                variant: 'insert',
                relation: 'navigation',
                data: [{ ...formData, order: order }],
                onFinish: ({ error }) => {
                    if (!error) {
                        router.push(`/admin/${SUPABASE_VARIANTS.NAVIGATION}`);
                        router.refresh();
                    }
                },
            });
        }
    };

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
            <FormTitle variant={type}>{data?.title ?? 'New Navigation'}</FormTitle>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Row className={gutterClass}>
                    <Col lg={8}>
                        <Input
                            variant="regular"
                            label="Name"
                            input={{
                                id: 'label',
                                type: 'text',
                                value: data?.label ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.label,
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
                                isChecked: data?.is_show ?? true,
                                hook: { register: register },
                            }}
                            validation={{
                                isError: !!errors?.['is_show'],
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

export default FormNavigation;
