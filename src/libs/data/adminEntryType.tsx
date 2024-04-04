import { SUPABASE_HANDLES } from '@/libs/handles';

import Form from '@/components/admin/form/Form';
// import React from 'react';

export const HOMEPAGE_ENTRY = (state: any) => [
    { title: SUPABASE_HANDLES.pages, children: <Form variant="pages" /> },
    {
        title: SUPABASE_HANDLES.homepageCarousel,
        children: (
            <Form
                variant="homepageCarousel"
                state={state}
            />
        ),
    },
];