import React from 'react';
import { FORM_VARIANTS } from '@/libs/form';
import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';

export type FormUserLoginProps = {
    variant: typeof FORM_VARIANTS.USER_LOGIN;
    events?: React.DOMAttributes<HTMLFormElement>;
};

const FormUserLogin = ({ events }: FormUserLoginProps): React.ReactElement => (
    <form {...events}>
        <div className="row">
            <div className="col-md-6">
                <Input
                    variant="floating"
                    input={{
                        id: 'email',
                        type: 'email',
                        label: 'label',
                    }}
                />
                <Input
                    variant="floating"
                    input={{
                        id: 'password',
                        type: 'password',
                        label: 'label',
                    }}
                />
            </div>
        </div>

        <Button
            variant="ripple"
            color="primary"
            // color=""
            type="submit">
            Submit
        </Button>

        {/*<button*/}
        {/*    className="btn"*/}
        {/*    type="submit">*/}
        {/*    SUBMIT*/}
        {/*</button>*/}
    </form>
);
export default FormUserLogin;
