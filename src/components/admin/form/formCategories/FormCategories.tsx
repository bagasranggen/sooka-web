'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import type { InputHookValueProps } from '@/libs/@types';
import { SUPABASE_VARIANTS } from '@/libs/handles';
import { COMMON_ADMIN, GLOBAL_MESSAGE } from '@/libs/data';
import { supabaseClientAction } from '@/libs/fetcher';
import { joinClassnameString } from '@/libs/utils';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';

import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import slugify from 'react-slugify';

export type FormCategoriesProps = {
    variant: typeof SUPABASE_VARIANTS.CATEGORIES;
    type: 'add' | 'edit';
    entries?: any;
};

const FormCategories = ({ type, entries }: FormCategoriesProps) => {
    const router = useRouter();
    const { data, order } = entries;

    const gutterClass: string = joinClassnameString([COMMON_ADMIN.GUTTER, COMMON_ADMIN.SPACING, 'align-items-end']);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputHookValueProps>({ mode: 'onChange' });

    const onSubmitHandler: SubmitHandler<InputHookValueProps> = async (formData: InputHookValueProps) => {
        const submitData = {
            ...formData,
            slug: slugify(formData.label),
        };

        if (type === 'edit') {
            await supabaseClientAction({
                variant: 'update',
                relation: 'categories',
                id: parseInt(data.id),
                data: submitData,
                onFinish: ({ error }) => {
                    if (!error) router.push(`/admin/${SUPABASE_VARIANTS.CATEGORIES}`);
                },
            });
        }

        if (type === 'add') {
            await supabaseClientAction({
                variant: 'insert',
                relation: 'categories',
                data: [{ ...submitData, order: order }],
                onFinish: ({ error }) => {
                    if (!error) router.push(`/admin/${SUPABASE_VARIANTS.CATEGORIES}`);
                },
            });
        }
    };

    return (
        <>
            <h1>{/*{type === 'add' ? 'Add' : 'Edit'} {data?.name ?? 'New Product Listing'}*/}</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Row className={gutterClass}>
                    <Col lg={5}>
                        <Input
                            variant="regular"
                            label="LAbel"
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
                    <Col lg={2}>
                        <Button
                            variant="outline"
                            type="submit"
                            className="flex-grow-0">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </form>
        </>
    );
};

export default FormCategories;
