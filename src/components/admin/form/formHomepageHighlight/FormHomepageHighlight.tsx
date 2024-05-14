'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import type { InputHookValueProps } from '@/libs/@types';
import { SUPABASE_VARIANTS } from '@/libs/handles';
import { COMMON_ADMIN, GLOBAL_MESSAGE } from '@/libs/data';
import { fetchAction, supabaseClientAction } from '@/libs/fetcher';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';

import Button from '@/components/common/button/Button';
import Input from '@/components/common/input/Input';
import FormTitle, { type FormTitleProps } from '@/components/admin/form/components/FormTitle';

export type FormHomepageHighlightProps = {
    variant: typeof SUPABASE_VARIANTS.HOMEPAGE_HIGHLIGHT;
    type: FormTitleProps['variant'];
    entries?: any;
};

const FormHomepageHighlight = ({ type, entries }: FormHomepageHighlightProps): React.ReactElement => {
    const router = useRouter();
    const { data, order, products } = entries;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputHookValueProps>({ mode: 'onChange' });

    const productSelectOptions = products
        ? products?.map((item: any) => ({
              label: item.name,
              slug: item.id,
          }))
        : [];

    const onSubmitHandler: SubmitHandler<InputHookValueProps> = async (formData: InputHookValueProps) => {
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
                    if (!error) {
                        fetchAction({ variant: 'revalidate', path: { url: '/' } });
                        router.push(`/admin/${SUPABASE_VARIANTS.HOMEPAGE_HIGHLIGHT}`);
                        router.refresh();
                    }
                },
            });
        }

        if (type === 'add') {
            await supabaseClientAction({
                variant: 'insert',
                relation: 'homepageHighlight',
                data: [submitData],
                onFinish: ({ error }) => {
                    if (!error) {
                        fetchAction({ variant: 'revalidate', path: { url: '/' } });
                        router.push(`/admin/${SUPABASE_VARIANTS.HOMEPAGE_HIGHLIGHT}`);
                        router.refresh();
                    }
                },
            });
        }
    };

    return (
        <>
            <FormTitle variant={type}>{data?.name ?? 'New Highlight Item'}</FormTitle>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Row className={COMMON_ADMIN.GUTTER}>
                    <Col lg={6}>
                        <Input
                            variant="regular"
                            input={{
                                id: 'product_id',
                                type: 'select',
                                items: [{ label: '-- Select Product Item --', slug: '' }, ...productSelectOptions],
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
