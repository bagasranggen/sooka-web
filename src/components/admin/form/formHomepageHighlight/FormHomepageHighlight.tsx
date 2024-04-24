'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import type { InputHookValueProps } from '@/libs/@types';
import { SUPABASE_VARIANTS } from '@/libs/handles';
import { COMMON_ADMIN, GLOBAL_MESSAGE } from '@/libs/data';
import { supabaseClientAction } from '@/libs/fetcher';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';

import Button from '@/components/common/button/Button';
import Input from '@/components/common/input/Input';

export type FormHomepageHighlightProps = {
    variant: typeof SUPABASE_VARIANTS.HOMEPAGE_HIGHLIGHT;
    type: 'add' | 'edit';
    entries?: any;
};

const FormHomepageHighlight = ({ type, entries }: FormHomepageHighlightProps): React.ReactElement => {
    const router = useRouter();
    const { data, order, products } = entries;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control,
    } = useForm<InputHookValueProps>({ mode: 'onChange' });

    // console.log(entries);

    const productSelectOptions = products
        ? products?.map((item: any) => ({
              label: item.name,
              slug: item.id,
          }))
        : [];

    const onSubmitHandler: SubmitHandler<InputHookValueProps> = async (formData: InputHookValueProps) => {
        console.log('form submit', formData);

        if (isNaN(parseInt(formData.product_id))) return;

        const submitData = {
            product_id: parseInt(formData.product_id),
            ...(type === 'add' ? { order: order } : {}),
        };

        if (type === 'edit') {
            await supabaseClientAction({
                variant: 'update',
                relation: 'homepageHighlight',
                id: parseInt(data.id),
                data: submitData,
                onFinish: ({ error }) => {
                    // if (!error) router.push(`/admin/${SUPABASE_VARIANTS.HOMEPAGE_HIGHLIGHT}`);
                },
            });
        }

        if (type === 'add') {
            await supabaseClientAction({
                variant: 'insert',
                relation: 'homepageHighlight',
                data: [submitData],
                onFinish: ({ error }) => {
                    // if (!error) router.push(`/admin/${SUPABASE_VARIANTS.HOMEPAGE_HIGHLIGHT}`);
                },
            });
        }
    };

    return (
        <>
            <h1>
                {type === 'add' ? 'Add' : 'Edit'} {data?.name ?? 'New Homepage Highlight'}
            </h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Row className={COMMON_ADMIN.GUTTER}>
                    <Col lg={6}>
                        <Input
                            variant="regular"
                            // label="Category"
                            input={{
                                id: 'product_id',
                                type: 'select',
                                items: [{ label: '-- Select Product Item --' }, ...productSelectOptions],
                                value: data?.id ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.product_id,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                            }}
                        />
                    </Col>
                    <Col lg={6}>
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

export default FormHomepageHighlight;