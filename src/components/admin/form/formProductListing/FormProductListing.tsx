'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { InputHookValueProps } from '@/libs/@types';
import { SUPABASE_VARIANTS } from '@/libs/handles';
import { COMMON_ADMIN, GLOBAL_MESSAGE } from '@/libs/data';
import { supabaseClientAction } from '@/libs/fetcher';
import { joinClassnameString } from '@/libs/utils';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';
import slugify from 'react-slugify';

import Input from '@/components/common/input/Input';
import Button, { ButtonWrapper } from '@/components/common/button/Button';
import ImagesGalleryField, {
    type ImagesGalleryItemProps,
} from '@/components/admin/form/formProductListing/components/ImagesGalleryField';
import FormTitle, { type FormTitleProps } from '@/components/admin/form/components/FormTitle';

export type FormProductListingProps = {
    variant: typeof SUPABASE_VARIANTS.PRODUCT_LISTING;
    type: FormTitleProps['variant'];
    entries?: any;
};

const FormProductListing = ({ type, entries }: FormProductListingProps): React.ReactElement => {
    const router = useRouter();
    const { data, order, categories } = entries;

    const gutterClass: string = joinClassnameString([COMMON_ADMIN.GUTTER, COMMON_ADMIN.SPACING]);

    const [imageGallery, setImageGallery] = useState<ImagesGalleryItemProps[]>(data.imageGallery);
    const imageGalleryLimit = 3;

    const addImageGalleryHandler = (e: React.FormEvent<HTMLButtonElement>) => {
        setImageGallery((prevState) => [...prevState, { id: Date.now(), desktop: '', mobile: '' }]);
    };

    const removeImageGalleryHandler = (e: React.FormEvent<HTMLButtonElement>, key: number) => {
        const filtered = imageGallery.filter((item: ImagesGalleryItemProps) => item.id !== key);
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
        imageGallery.map((item: ImagesGalleryItemProps) => {
            galleryKeys.push(`${COMMON_ADMIN.KEY.GALLERY.DESKTOP}_${item.id}`);
            galleryKeys.push(`${COMMON_ADMIN.KEY.GALLERY.MOBILE}_${item.id}`);
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

        if (type === 'edit') {
            await supabaseClientAction({
                variant: 'update',
                relation: 'productListing',
                id: parseInt(data.id),
                data: submitData,
                onFinish: ({ error }) => {
                    if (!error) {
                        router.push(`/admin/${SUPABASE_VARIANTS.PRODUCT_LISTING}`);
                        router.refresh();
                    }
                },
            });
        }

        if (type === 'add') {
            await supabaseClientAction({
                variant: 'insert',
                relation: 'productListing',
                data: [{ ...submitData, slug: slugify(formData.name), order: order }],
                onFinish: ({ error }) => {
                    if (!error) {
                        router.push(`/admin/${SUPABASE_VARIANTS.PRODUCT_LISTING}`);
                        router.refresh();
                    }
                },
            });
        }
    };

    return (
        <>
            <FormTitle variant={type}>{data?.name ?? 'New Product Listing'}</FormTitle>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Row className={gutterClass}>
                    <Col lg={8}>
                        <Input
                            variant="regular"
                            label="Name"
                            input={{
                                id: 'name',
                                type: 'text',
                                value: data?.name ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.name,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
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
                                items: [{ label: '-- Select Category --', slug: '' }, ...categories],
                                value: data?.category ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.category,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
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
                                value: data?.price ?? 0,
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.price,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
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
                                isChecked: !data?.['is_sold'] ?? true,
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
                    <Col lg={6}>
                        <Input
                            variant="regular"
                            label="Image Thumbnail Desktop"
                            input={{
                                id: 'imageThumbnailDesktop',
                                type: 'text',
                                value: data?.images?.[0] ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.imageThumbnailDesktop,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
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
                                value: data?.images?.[1] ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.imageThumbnailMobile,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                            }}
                        />
                    </Col>
                </Row>

                <ImagesGalleryField
                    items={imageGallery}
                    limit={imageGalleryLimit}
                    hooks={{ register, errors }}
                    events={{
                        onAddHandler: addImageGalleryHandler,
                        onImageRemoveHandler: removeImageGalleryHandler,
                    }}
                />

                <div className="input-group--regular">
                    <label>Details</label>
                </div>
                <Row className={`${gutterClass.replace('gy-3', 'gy-1')} align-items-baseline`}>
                    <Col xs={12}>
                        <Input
                            variant="regular"
                            label="Dimension"
                            input={{
                                id: 'dimension',
                                type: 'text',
                                value: data?.dimension ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.dimension,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                            }}
                        />
                    </Col>
                    <Col md={4}>
                        <Input
                            variant="regular"
                            label="Flavour 1 (Fresh - Creamy)"
                            input={{
                                id: 'flavour_1',
                                type: 'text',
                                value: data?.flavour_1 ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.flavour_1,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                            }}
                        />
                    </Col>
                    <Col md={4}>
                        <Input
                            variant="regular"
                            label="Flavour 2 (Custardy - Spongy)"
                            input={{
                                id: 'flavour_2',
                                type: 'text',
                                value: data?.flavour_2 ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.flavour_2,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                            }}
                        />
                    </Col>
                    <Col md={4}>
                        <Input
                            variant="regular"
                            label="Flavour 3 (Tangy - Sweet)"
                            input={{
                                id: 'flavour_3',
                                type: 'text',
                                value: data?.flavour_3 ?? '',
                                hook: { register: register, options: { required: true } },
                            }}
                            validation={{
                                isError: !!errors?.flavour_3,
                                message: GLOBAL_MESSAGE.ERROR_REQUIRED,
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
                        value: data?.description ?? '',
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
                        value: data?.package ?? '',
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
                        value: data?.ingredients ?? '',
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
