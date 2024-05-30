import React from 'react';

import Form from '@/components/common/form/Form';

export type UserLoginIndexProps = {};

const UserLoginIndex = ({}: UserLoginIndexProps): React.ReactElement => {
    return (
        <section className="ts--margin">
            <div className="container">
                <Form variant="user-login" />
            </div>
        </section>
    );
};

export default UserLoginIndex;
