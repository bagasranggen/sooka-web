'use client';

import React, { useEffect, useState } from 'react';

import { SUPABASE_VARIANTS } from '@/libs/handles';

import Button from '@/components/common/button/Button';
import FormHomepageCarouselItem, { FormHomepageCarouselItemProps } from './FormHomepageCarouselItem';

export type FormHomepageCarouselProps = {
    variant: typeof SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL;
} & Pick<FormHomepageCarouselItemProps, 'state'>;

const initData = {
    title: '',
    is_show: true,
    selectFrom: '',
    selectCategory: '',
    href: '',
    target: false,
    imageDesktop: '',
    imageMobile: '',
};

const FormHomepageCarousel = ({ state }: FormHomepageCarouselProps): React.ReactElement => {
    const [formData, setFormData] = useState<any[]>(state.carousels);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let data: any[] = [];
        formData.map((item: any) => {
            const { imageDesktop, imageMobile, ...rest } = item;

            let tempData: any = {};

            tempData = rest;
            tempData.images = [imageDesktop, imageMobile];

            data.push(tempData);
        });

        console.log(SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL, data);
    };

    const addItemHandler = () => {
        setFormData([...formData, initData]);
    };

    const deleteItemHandler = (index: number) => {
        const duplicateData = [...formData];
        duplicateData.splice(index, 1);

        setFormData(duplicateData);
    };

    // useEffect(() => {
    //     console.log(formData);
    // }, [formData]);

    return (
        <form
            id={SUPABASE_VARIANTS.HOMEPAGE_CAROUSEL}
            onSubmit={submitHandler}>
            <Button
                variant="base"
                type="submit"
                className="d-none">
                SUBMIT
            </Button>

            {formData.map((item: any, i: number) => (
                <FormHomepageCarouselItem
                    key={i}
                    state={state.categories}
                    value={formData[i]}
                    setValue={setFormData}
                    prevValue={formData}
                    index={i}
                    isLast={i === formData.length - 1}
                    events={{ onDelete: deleteItemHandler }}
                />
            ))}

            <Button
                variant="outline"
                type="button"
                className="mt-3 w-100"
                events={{ onClick: addItemHandler }}>
                ADD NEW CAROUSEL
            </Button>
        </form>
    );
};

export default FormHomepageCarousel;
