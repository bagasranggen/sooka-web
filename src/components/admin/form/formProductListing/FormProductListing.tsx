'use client';

import React from 'react';

import { SUPABASE_VARIANTS } from '@/libs/handles';
import type { InputHookValueProps } from '@/libs/@types';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';

import Input from '@/components/common/input/Input';
import Button, { ButtonWrapper } from '@/components/common/button/Button';

export type FormProductListingProps = {
    variant: typeof SUPABASE_VARIANTS.PRODUCT_LISTING;
    entries: any;
};

const FormProductListing = ({ entries }: FormProductListingProps): React.ReactElement => {
    const { data, categories } = entries;

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        control,
    } = useForm<InputHookValueProps>({ mode: 'onChange' });

    const onSubmitHandler: SubmitHandler<InputHookValueProps> = (data: InputHookValueProps) => {
        console.log('react-hook submit', data);
    };

    const gutterClass: string = 'gy-3 gx-1';

    return (
        <>
            <h1>Edit {data.name}</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Row className={gutterClass}>
                    <Col lg={8}>
                        <Input
                            variant="regular"
                            label="Name"
                            input={{ id: 'name', type: 'text', value: data.name, hook: { register: register } }}
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
                            input={{ id: 'price', type: 'text', value: data.price, hook: { register: register } }}
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
                                isChecked: data['is_sold'],
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
