'use client';

import React from 'react';

import { FORM_CONTACT_INPUT, FORM_VARIANTS } from '@/libs/form';
import { FORM_CONTACT } from '@/libs/form/formContact';

import { SubmitHandler, useForm } from 'react-hook-form';
import FormRender from '@/components/common/form/FormRender';

export type FormContactProps = {
    variant: typeof FORM_VARIANTS.CONTACT;
};

type FormProps = {
    [FORM_CONTACT_INPUT.FIRST_NAME]: string,
    [FORM_CONTACT_INPUT.EMAIL]: number,
}

const FormContact = ({}: FormContactProps): React.ReactElement => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormProps>({ mode: 'onChange' });

    const onSubmitHandler: SubmitHandler<FormProps> = (data: FormProps) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormRender
                spacing={3}
                items={FORM_CONTACT}
                hook={{ register: register, errors: errors }} />
            <button
                className=""
                type="submit">SUBMIT
            </button>
        </form>
    );
};

export default FormContact;