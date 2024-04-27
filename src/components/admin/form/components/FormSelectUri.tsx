import React from 'react';
import Input, { InputSelectItem } from '@/components/common/input/Input';
import { GLOBAL_MESSAGE } from '@/libs/data';
import type { InputHookRegisterProps } from '@/libs/@types';
import { FieldErrors } from 'react-hook-form';

export type FormSelectUriProps = {
    data: any;
    selectFrom: any;
    options: InputSelectItem[];
    hook: { errors: FieldErrors<any> } & InputHookRegisterProps;
};

const FormSelectUri = ({ data, selectFrom, options, hook }: FormSelectUriProps): React.ReactElement => {
    let urlInput = <></>;

    if (selectFrom === 'categories' || selectFrom === 'products') {
        urlInput = (
            <Input
                variant="regular"
                label={selectFrom}
                input={{
                    id: 'uri',
                    type: 'select',
                    items: options,
                    value: data?.uri ?? '',
                    hook: { register: hook.register, options: { required: true } },
                }}
                validation={{
                    isError: !!hook.errors?.uri,
                    message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                }}
            />
        );
    }
    if (selectFrom === 'custom') {
        urlInput = (
            <Input
                variant="regular"
                label={selectFrom}
                input={{
                    id: 'uri',
                    type: 'text',
                    value: data?.uri ?? '',
                    hook: { register: hook.register, options: { required: true } },
                }}
                validation={{
                    isError: !!hook.errors?.uri,
                    message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                }}
            />
        );
    }

    return urlInput;
};

export default FormSelectUri;
