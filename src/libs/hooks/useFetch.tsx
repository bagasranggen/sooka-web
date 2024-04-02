// 'use client';

// import { useEffect, useState } from 'react';

export type FetchProps = {
    type?: 'navigation';
    tags?: string[] | string;
};

// const getData = async () => {
//     const res = await fetch('http://localhost:3000/api/navigation');
//     const data = await res.json();
//
//     return data;
// };

// export const useFetch = async ({ type }: FetchProps) => {
//     const [loading, setLoading] = useState<boolean>(false);
//     const [data, setData] = useState<undefined | any>(undefined);
//     const [error, setError] = useState<undefined | any>(undefined);
//
//     useEffect(() => {
//         setLoading(true);
//
//         try {
//             setData(getData());
//             // set
//         } catch (err) {
//             console.log(err);
//         }
//     }, [type]);
//
//     return { loading, data, error };
// };

export const useFetch = async ({ type, tags }: FetchProps) => {
    let data = '';
    let tagsProps = {};

    if (tags) {
        if (typeof tags === 'string') {
            tagsProps = { next: { tags: [tags] } };
        } else {
            tagsProps = { next: { tags: tags } };
        }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${type}`, { next: { tags: ['navigation'] } });
        const { data: returnData } = await res.json();
        data = returnData;
    } catch (err) {
        console.log(err);
    }

    return { data };
};
