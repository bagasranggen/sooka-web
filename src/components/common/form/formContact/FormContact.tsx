'use client';

import React from 'react';

import { FORM_CONTACT, FORM_CONTACT_INPUT, FORM_VARIANTS } from '@/libs/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/common/input/Input';
import { Col, Row } from 'react-bootstrap';
import FormRender from '@/components/common/form/FormRender';

export type FormContactProps = {
    variant: typeof FORM_VARIANTS.CONTACT;
};

// type FormProps = Record<typeof FORM_CONTACT_INPUT[keyof typeof FORM_CONTACT_INPUT], string>
type FormProps = {
    [FORM_CONTACT_INPUT.FIRST_NAME]: string,
    [FORM_CONTACT_INPUT.LAST_NAME]: number,
}

const FormContact = ({}: FormContactProps): React.ReactElement => {
    const t: FormProps = {
        firstName: '',
        lastName: 55,
    };


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormProps>({ mode: 'onChange' });

    const onSubmitHandler: SubmitHandler<FormProps> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormRender
                items={FORM_CONTACT}
                hook={{ register: register }} />

            {/*<button type="submit">submit</button>*/}
        </form>
    );
};

export default FormContact;