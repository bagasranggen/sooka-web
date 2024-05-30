import React, { Suspense } from 'react';

import UserLoginIndex from '@/components/page/userLogin/UserLoginIndex';

export type PageProps = {};

const Page = ({}: PageProps): React.ReactElement => {
    return (
        <Suspense>
            <UserLoginIndex />
        </Suspense>
    );
};

export default Page;
