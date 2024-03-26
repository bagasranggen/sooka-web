'use client';

import React, { useState } from 'react';

import { SUPABASE_VARIANTS } from '@/libs/handles';
import { getFormSubmitData } from '@/libs/utils';

import slugify from 'react-slugify';

import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';

export type FormPagesProps = {
    variant: typeof SUPABASE_VARIANTS.PAGES;
};

const FormPages = ({}: FormPagesProps): React.ReactElement => {
    const [formData, setFormData] = useState<any>({});

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const submitData = getFormSubmitData(e.target as HTMLElement);

        console.log(SUPABASE_VARIANTS.PAGES, submitData);
    };

    return (
        <form
            id={SUPABASE_VARIANTS.PAGES}
            onSubmit={submitHandler}>
            <Button
                variant="base"
                type="submit"
                className="d-none">
                SUBMIT
            </Button>

            <div className="row gx-2 gy-3">
                <div className="col-md-8">
                    <Input
                        variant="regular"
                        label="Title"
                        input={{
                            id: 'title',
                            value: formData?.title ?? '',
                            setValue: setFormData,
                            prevValue: formData,
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <Input
                        variant="regular"
                        label="slug"
                        input={{
                            id: 'slug',
                            value: formData?.title ? slugify(formData.title) : '',
                            isDisabled: true,
                        }}
                    />
                </div>
                <div className="col-12">
                    <Input
                        variant="regular"
                        label="Short Description"
                        input={{
                            id: 'short_description',
                            type: 'ck-editor',
                            value: formData?.['short_description'] ?? '',
                        }}
                    />
                </div>
            </div>
        </form>
    );
};

export default FormPages;
