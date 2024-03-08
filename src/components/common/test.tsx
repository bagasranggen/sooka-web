'use client';

import React from 'react';
import { supabaseServer } from '@/libs/fetcher';

export type TestProps = { onClick: any };

const Test = ({ onClick }: TestProps): React.ReactElement => {
    // const supabase = supabaseClient();

    // const addDataHandler = async () => {
    //     console.log('add');
    //
    //     const { data, error } = await supabase
    //         .from('categories')
    //         .insert([{ label: 'someValue', slug: 'otherValue' }])
    //         .select();
    // };

    return (
        <button
            className="btn btn-outline-dark"
            onClick={() => onClick()}>
            ADD
        </button>
    );
};

export default Test;
