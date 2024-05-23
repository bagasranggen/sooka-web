export type FetchActionRevalidateItemProps = {
    url: string;
    type?: 'page' | 'layout';
};

export type FetchActionRevalidateProps = {
    variant: 'revalidate';
    path: FetchActionRevalidateItemProps | FetchActionRevalidateItemProps[];
};

export type FetchActionProps = FetchActionRevalidateProps;

export const fetchAction = async (props: FetchActionProps) => {
    let baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
    let urls = [];

    switch (props.variant) {
        case 'revalidate':
            baseUrl += `revalidate`;

            if (Array.isArray(props.path)) {
                props.path.map((item: FetchActionRevalidateItemProps) => {
                    let temp = `${baseUrl}?path=${item.url}`;

                    if (item?.type) temp += `&type=${item.type}`;
                    urls.push(temp);
                });
            } else {
                baseUrl += `?path=${props.path.url}`;
                if (props.path.type) baseUrl += `&type=${props.path.type}`;
                urls.push(baseUrl);
            }

            break;
    }

    urls.map(async (item: string) => {
        await fetch(item);
    });
};
