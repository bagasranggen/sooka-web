'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { SUPABASE_VARIANTS } from '@/libs/handles';
import { GLOBAL_MESSAGE } from '@/libs/data';
import type { InputHookValueProps } from '@/libs/@types';
import { supabaseClientAction } from '@/libs/fetcher';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';
import { CiTrash } from 'react-icons/ci';

import Input from '@/components/common/input/Input';
import Button, { ButtonWrapper } from '@/components/common/button/Button';

export type FormProductListingProps = {
    variant: typeof SUPABASE_VARIANTS.PRODUCT_LISTING;
    entries: any;
};

const FormProductListing = ({ entries }: FormProductListingProps): React.ReactElement => {
    const router = useRouter();
    const { data, categories } = entries;

    const [imageGallery, setImageGallery] = useState<number[]>([]);
    const imageGalleryLimit = 3;
    const imageGalleryKeys = {
        desktop: 'imageGalleryDesktop',
        mobile: 'imageGalleryMobile',
    };

    const addImageGalleryHandler = (e: React.FormEvent<HTMLButtonElement>) => {
        setImageGallery((prevState) => [...prevState, Date.now()]);
    };

    const removeImageGalleryHandler = (e: React.FormEvent<HTMLButtonElement>, key: number) => {
        const filtered = imageGallery.filter((item: number) => item !== key);
        setImageGallery(filtered);
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control,
    } = useForm<InputHookValueProps>({ mode: 'onChange' });

    const onSubmitHandler: SubmitHandler<InputHookValueProps> = async (formData: InputHookValueProps) => {
        let gallery: string[] = [];
        let galleryKeys: string[] = [];
        imageGallery.map((item: number) => {
            galleryKeys.push(`${imageGalleryKeys.desktop}_${item}`);
            galleryKeys.push(`${imageGalleryKeys.mobile}_${item}`);
        });
        galleryKeys.map((item: string) => {
            const { [item]: selected } = formData;
            delete formData[item];

            gallery.push(selected);
        });

        const { imageThumbnailDesktop, imageThumbnailMobile, price, is_sold, ...restData } = formData;

        const submitData = {
            ...restData,
            is_sold: !is_sold,
            price: parseInt(price),
            images: [imageThumbnailDesktop, imageThumbnailMobile],
            gallery,
        };

        console.log(submitData);

        // await supabaseClientAction({
        //     variant: 'update',
        //     relation: 'productListing',
        //     id: parseInt(data.id),
        //     data: submitData,
        //     onFinish: ({ error }) => {
        //         if (!error) router.push(`/admin/${SUPABASE_VARIANTS.PRODUCT_LISTING}`);
        //     },
        // });
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

                {imageGallery.map((item: number, i: number) => {
                    const desktopId = `${imageGalleryKeys.desktop}_${item}`;
                    const mobileId = `${imageGalleryKeys.desktop}_${item}`;

                    return (
                        <Row
                            className={`${gutterClass} align-items-end`}
                            key={i}>
                            <Col>
                                <Input
                                    variant="regular"
                                    label={'Image Gallery Desktop ' + item}
                                    input={{
                                        id: desktopId,
                                        type: 'text',
                                        // value: data?.images?.[0],
                                        hook: { register: register, options: { required: true } },
                                    }}
                                    validation={{
                                        isError: !!errors?.[desktopId],
                                        message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                                    }}
                                />
                            </Col>
                            <Col>
                                <Input
                                    variant="regular"
                                    label="Image Gallery Mobile"
                                    input={{
                                        id: mobileId,
                                        type: 'text',
                                        // value: data?.images?.[1],
                                        hook: { register: register, options: { required: true } },
                                    }}
                                    validation={{
                                        isError: !!errors?.[mobileId],
                                        message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                                    }}
                                />
                            </Col>
                            <Col lg="auto">
                                <Button
                                    variant="outline"
                                    type="button"
                                    events={{ onClick: (e) => removeImageGalleryHandler(e, item) }}>
                                    <CiTrash size={24} />
                                </Button>
                            </Col>
                        </Row>
                    );
                })}

                <Button
                    variant="outline"
                    type="button"
                    events={{ onClick: addImageGalleryHandler }}
                    disabled={imageGallery.length >= imageGalleryLimit}>
                    Add
                </Button>

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
