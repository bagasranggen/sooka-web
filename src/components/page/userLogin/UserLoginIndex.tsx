'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { setCookie } from 'cookies-next';

import { getFormSubmitData } from '@/libs/utils';
import { supabaseClientAction } from '@/libs/fetcher/supabaseClientAction';

import Form from '@/components/common/form/Form';

export type UserLoginIndexProps = {};

const UserLoginIndex = ({}: UserLoginIndexProps): React.ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const paramsHref = searchParams?.get('to') ?? '/admin/navigation';

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as unknown as HTMLElement;
        const data: any = getFormSubmitData(form);

        supabaseClientAction({
            variant: 'user-login',
            data,
            onFinish: (res) => {
                setCookie('user', res.data);
                router.replace(paramsHref as string);
            },
        });
    };

    return (
        <section className="ts--margin">
            <div className="container">
                <Form
                    variant="user-login"
                    events={{
                        onSubmit: submitHandler,
                    }}
                />
            </div>
        </section>
    );
};

export default UserLoginIndex;
