'use client';

import React from 'react';

import Tab from '@/components/common/tab/Tab';
import Button from '@/components/common/button/Button';

export type AdminAddIndexProps = {
    slug: string;
    state: any;
};

const AdminAddIndex = ({ slug, state }: AdminAddIndexProps): React.ReactElement => {
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

    return (
        <>
            <h1>ADD</h1>

            {/*<Tab*/}
            {/*    id="admin-add-form"*/}
            {/*    className="mt-3"*/}
            {/*    items={ADMIN_ENTRY_HANDLES[slug as keyof typeof ADMIN_ENTRY_HANDLES](state)}*/}
            {/*/>*/}

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
