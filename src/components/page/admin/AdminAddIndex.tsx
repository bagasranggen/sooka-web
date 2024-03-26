'use client';

import React from 'react';

import { SUPABASE_HANDLES } from '@/libs/handles';

import Tab from '@/components/common/tab/Tab';
import Button from '@/components/common/button/Button';
import Form from '@/components/admin/form/Form';

export type AdminAddIndexProps = {
    state: any;
};

const AdminAddIndex = ({ state }: AdminAddIndexProps): React.ReactElement => {
    const formSubmitHandler = () => {
        const tab = document.querySelector('.tab-content');
        const forms = tab?.querySelectorAll('form[id]');

        if (forms) {
            forms.forEach((form) => {
                const submit: HTMLButtonElement | null = form.querySelector('button[type=submit]');
                submit?.click();
            });
        }
    };

    // console.log(state);

    return (
        <>
            <h1>ADD</h1>

            <Tab
                id="admin-add-form"
                items={[
                    // { title: SUPABASE_HANDLES.pages, children: <Form variant="pages" /> },
                    {
                        title: SUPABASE_HANDLES.homepageCarousel,
                        children: (
                            <Form
                                variant="homepageCarousel"
                                state={state}
                            />
                        ),
                    },
                ]}
            />
            <Button
                variant="outline"
                type="button"
                className="mt-3"
                events={{ onClick: formSubmitHandler }}>
                SUBMIT
            </Button>
        </>
    );
};

export default AdminAddIndex;
