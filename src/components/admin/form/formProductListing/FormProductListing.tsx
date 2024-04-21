'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { SUPABASE_VARIANTS } from '@/libs/handles';
import type { InputHookValueProps } from '@/libs/@types';
import { supabaseClientAction } from '@/libs/fetcher';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';

import Input from '@/components/common/input/Input';
import Button, { ButtonWrapper } from '@/components/common/button/Button';

export type FormProductListingProps = {
    variant: typeof SUPABASE_VARIANTS.PRODUCT_LISTING;
    entries: any;
};

const FormProductListing = ({ entries }: FormProductListingProps): React.ReactElement => {
    const router = useRouter();
    const { data, categories } = entries;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control,
    } = useForm<InputHookValueProps>({ mode: 'onChange' });

    const onSubmitHandler: SubmitHandler<InputHookValueProps> = async (formData: InputHookValueProps) => {
        const { imageThumbnailDesktop, imageThumbnailMobile, price, is_sold, ...restData } = formData;

        const submitData = {
            ...restData,
            is_sold: !is_sold,
            price: parseInt(price),
            images: [imageThumbnailDesktop, imageThumbnailMobile],
        };

        await supabaseClientAction({
            variant: 'update',
            relation: 'productListing',
            id: parseInt(data.id),
            data: submitData,
            onFinish: ({ error }) => {
                if (!error) router.push(`/admin/${SUPABASE_VARIANTS.PRODUCT_LISTING}`);
            },
        });
    };

    const gutterClass: string = 'gy-3 gx-1 mb-2';

    return (
        <>
            <h1>Edit {data.name}</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Row className={gutterClass}>
                    <Col lg={8}>
                        <Input
                            variant="regular"
                            label="Name"
                            input={{
                                id: 'name',
                                type: 'text',
                                value: data.name,
                                hook: { register: register },
                            }}
                        />
                    </Col>
                    <Col lg={4}>
                        <Input
                            variant="regular"
                            label="Category"
                            input={{
                                id: 'category',
                                type: 'select',
                                items: categories,
                                value: data.category,
                                hook: { register: register },
                            }}
                        />
                    </Col>
                </Row>

                <Row className={gutterClass}>
                    <Col lg={6}>
                        <Input
                            variant="regular"
                            label="Price"
                            input={{
                                id: 'price',
                                type: 'text',
                                value: data.price,
                                hook: { register: register },
                            }}
                        />
                    </Col>
                    <Col lg={2}>
                        <Input
                            variant="regular"
                            label="Availability"
                            input={{
                                id: 'is_sold',
                                type: 'switch',
                                color: 'primary',
                                isChecked: !data['is_sold'],
                                hook: { register: register },
                            }}
                        />
                    </Col>
                </Row>

                <Row className={gutterClass}>
                    <Col lg={6}>
                        <Input
                            variant="regular"
                            label="Image Thumbnail Desktop"
                            input={{
                                id: 'imageThumbnailDesktop',
                                type: 'text',
                                value: data?.images?.[0],
                                hook: { register: register },
                            }}
                        />
                    </Col>
                    <Col lg={6}>
                        <Input
                            variant="regular"
                            label="Image Thumbnail Mobile"
                            input={{
                                id: 'imageThumbnailMobile',
                                type: 'text',
                                value: data?.images?.[1],
                                hook: { register: register },
                            }}
                        />
                    </Col>
                </Row>

                <Input
                    variant="regular"
                    label="Description"
                    wrapperClassName="mt-2"
                    input={{
                        id: 'description',
                        type: 'ck-editor',
                        value: data.description,
                        hook: { register: register, control: control, setValue: setValue },
                    }}
                />

                <Input
                    variant="regular"
                    label="Package"
                    wrapperClassName="mt-2"
                    input={{
                        id: 'package',
                        type: 'ck-editor',
                        value: data.package,
                        hook: { register: register, control: control, setValue: setValue },
                    }}
                />

                <Input
                    variant="regular"
                    label="Ingredients"
                    wrapperClassName="mt-2"
                    input={{
                        id: 'ingredients',
                        type: 'ck-editor',
                        value: data.ingredients,
                        hook: { register: register, control: control, setValue: setValue },
                    }}
                />

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

export default FormProductListing;
