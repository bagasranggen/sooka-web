import React from 'react';

import { FORM_VARIANTS } from '@/libs/form';

import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import Icon from '@/components/common/icon/Icon';

export type FormUserLoginProps = {
    variant: typeof FORM_VARIANTS.USER_LOGIN;
    events?: React.DOMAttributes<HTMLFormElement>;
};

const FormUserLogin = ({ events }: FormUserLoginProps): React.ReactElement => (
    <form {...events}>
        <div className="mb-6 text-center">
            <Icon
                variant="sooka"
                color="primary"
                style={{ maxWidth: '25rem' }}
            />
        </div>

        <div className="row justify-content-center text-center">
            <div className="col-md-8 col-xl-6">
                <Input
                    variant="floating"
                    options={{
                        align: 'center',
                    }}
                    input={{
                        id: 'email',
                        type: 'email',
                        label: 'Email',
                    }}
                />

                <Input
                    variant="floating"
                    className="mt-3"
                    options={{
                        align: 'center',
                    }}
                    input={{
                        id: 'password',
                        type: 'password',
                        label: 'Password',
                    }}
                />

                <Button
                    variant="ripple"
                    color="primary"
                    className="mx-auto mt-5"
                    type="submit">
                    SUBMIT
                </Button>
            </div>
        </div>
    </form>
);
export default FormUserLogin;
