'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import type { InputHookValueProps } from '@/libs/@types';
import { FORM_VARIANTS } from '@/libs/form';
import { GLOBAL_MESSAGE } from '@/libs/data';
import { supabaseClientAction } from '@/libs/fetcher';

import { setCookie } from 'cookies-next';
import { SubmitHandler, useForm } from 'react-hook-form';

import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import Icon from '@/components/common/icon/Icon';
import Alert from '@/components/common/alert/Alert';

export type FormUserLoginProps = {
    variant: typeof FORM_VARIANTS.USER_LOGIN;
    events?: React.DOMAttributes<HTMLFormElement>;
};

const FormUserLogin = ({ events }: FormUserLoginProps): React.ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const paramsHref = searchParams?.get('to') ?? '/admin/navigation';

    const [errorLogin, setErrorLogin] = useState(undefined);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<InputHookValueProps>({ mode: 'onChange' });

    const submitHandler: SubmitHandler<InputHookValueProps> = async (formData: InputHookValueProps) => {
        supabaseClientAction({
            variant: 'user-login',
            data: formData,
            onFinish: (res) => {
                if (res?.error) {
                    setErrorLogin(res.error.message);
                } else {
                    setCookie('user', res.data);
                    router.replace(paramsHref as string);
                }
            },
            onError: (err) => {
                setErrorLogin(err.message);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-6 text-center">
                <Icon
                    variant="sooka"
                    color="primary"
                    style={{ maxWidth: '25rem' }}
                />
            </div>

            <div className="row justify-content-center text-center">
                <div className="col-md-8 col-xl-6">
                    <Alert
                        variant="rounded"
                        className="mb-4">
                        {errorLogin}
                    </Alert>
                    <Input
                        variant="floating"
                        options={{
                            align: 'center',
                            required: true,
                        }}
                        hook={{ register: register }}
                        validation={{
                            isError: !!errors.email,
                            message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                        }}
                        input={{
                            id: 'email',
                            type: 'email',
                            label: 'Email',
                        }}
                    />
                    <Input
                        variant="floating"
                        className="mt-3"
                        options={{
                            align: 'center',
                            required: true,
                        }}
                        hook={{ register: register }}
                        validation={{
                            isError: !!errors.password,
                            message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                        }}
                        input={{
                            id: 'password',
                            type: 'password',
                            label: 'Password',
                        }}
                    />
                    <Button
                        variant="ripple"
                        color="primary"
                        className="mx-auto mt-5 text-uppercase"
                        type="submit"
                        disabled={(isSubmitting || isSubmitSuccessful) && !errorLogin}>
                        {(isSubmitting || isSubmitSuccessful) && !errorLogin
                            ? GLOBAL_MESSAGE.ADMIN_BUTTON_PROCESSING
                            : GLOBAL_MESSAGE.ADMIN_BUTTON_SUBMIT}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default FormUserLogin;
