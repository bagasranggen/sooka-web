export type FetchActionRevalidateProps = {
    variant: 'revalidate';
    path: string;
    type?: 'page' | 'layout';
};

export type FetchActionProps = FetchActionRevalidateProps;

export const fetchAction = async (props: FetchActionProps) => {
    let url = process.env.NEXT_PUBLIC_API_URL ?? '';

    switch (props.variant) {
        case 'revalidate':
            url += `revalidate?path=${props.path}`;
            if (props.type) url += `&type=${props.type}`;
            break;
    }

    fetch(url);
};
