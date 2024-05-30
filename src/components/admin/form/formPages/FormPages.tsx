'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { InputHookValueProps } from '@/libs/@types';
import { COMMON_ADMIN, GLOBAL_MESSAGE } from '@/libs/data';
import { SUPABASE_VARIANTS } from '@/libs/handles';
import { joinClassnameString } from '@/libs/utils';
import { supabaseClientAction } from '@/libs/fetcher';

import { Col, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import slugify from 'react-slugify';

import Input, { InputSelectItem } from '@/components/common/input/Input';
import Button, { ButtonWrapper } from '@/components/common/button/Button';
import FormTitle, { type FormTitleProps } from '@/components/admin/form/components/FormTitle';
import FormSelectUri from '@/components/admin/form/components/FormSelectUri';

export type FormPagesProps = {
    variant: typeof SUPABASE_VARIANTS.PAGES;
    type: FormTitleProps['variant'];
    entries?: any;
};

const FormPages = ({ type, entries }: FormPagesProps): React.ReactElement => {
    const router = useRouter();
    const { data, order, urlOptions, selectedFrom } = entries;

    const gutterClass: string = joinClassnameString([COMMON_ADMIN.GUTTER, COMMON_ADMIN.SPACING]);

    const {
        setValue,
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<InputHookValueProps>({ mode: 'onChange' });

    const onSubmitHandler: SubmitHandler<InputHookValueProps> = async (formData: InputHookValueProps) => {
        let submitData: any = {
            short_description: formData.short_description,
        };

        if (selectFrom && selectFrom === 'custom') {
            submitData.title = formData.title;
            submitData.slug = slugify(formData.title);
        }
        if (selectFrom && selectFrom !== 'custom') {
            submitData.slug = formData.slug;

            if (type === 'add') {
                submitData.title = data.find((datum: any) => datum.slug === formData.slug).title;
            }

            if (type === 'edit') {
                submitData.title = data.title;
            }
        }

        if (type === 'add') {
            submitData.order = order;
        }

        if (type === 'edit') {
            await supabaseClientAction({
                variant: 'update',
                relation: 'pages',
                id: parseInt(data.id),
                data: submitData,
                onFinish: ({ error }) => {
                    if (!error) {
                        router.push(`/admin/${SUPABASE_VARIANTS.PAGES}`);
                        router.refresh();
                    }
                },
            });
        }

        if (type === 'add') {
            await supabaseClientAction({
                variant: 'insert',
                relation: 'pages',
                data: [submitData],
                onFinish: ({ error }) => {
                    if (!error) {
                        router.push(`/admin/${SUPABASE_VARIANTS.PAGES}`);
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
            <FormTitle variant={type}>{data?.title ?? 'New Pages'}</FormTitle>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                            id={{
                                select: 'slug',
                                text: 'title',
                            }}
                            selectFrom={selectFrom}
                            options={options}
                            hook={{ register, errors }}
                        />
                    </Col>
                </Row>

                <Input
                    variant="regular"
                    label="Description"
                    wrapperClassName="mt-2"
                    input={{
                        id: 'short_description',
                        type: 'ck-editor',
                        value: data?.short_description ?? '',
                        hook: { register: register, control: control, setValue: setValue },
                    }}
                />

                <ButtonWrapper className="mt-3 d-block text-end">
                    <Button
                        variant="outline"
                        type="submit"
                        className="flex-grow-0"
                        disabled={isSubmitting || isSubmitSuccessful}>
                        {isSubmitting || isSubmitSuccessful
                            ? GLOBAL_MESSAGE.ADMIN_BUTTON_PROCESSING
                            : GLOBAL_MESSAGE.ADMIN_BUTTON_SUBMIT}
                    </Button>
                </ButtonWrapper>
            </form>
        </>
    );
};

export default FormPages;
