import React from 'react';

import type { InputHookRegisterProps } from '@/libs/@types';
import { GLOBAL_MESSAGE } from '@/libs/data';

import { FieldErrors } from 'react-hook-form';

import Input, { type InputSelectItem } from '@/components/common/input/Input';

export type FormSelectUriProps = {
    data: any;
    selectFrom: any;
    options: InputSelectItem[];
    id?: string | Record<'select' | 'text', string>;
    hook: { errors: FieldErrors<any> } & InputHookRegisterProps;
};

const FormSelectUri = ({ data, selectFrom, options, id, hook }: FormSelectUriProps): React.ReactElement => {
    let selectId = 'uri';
    let textId = selectId;

    if (id && typeof id === 'string') {
        selectId = id;
        textId = id;
    }

    if (id && typeof id === 'object') {
        selectId = id.select;
        textId = id.text;
    }

    let urlInput = <></>;

    if (selectFrom === 'categories' || selectFrom === 'products') {
        urlInput = (
            <Input
                variant="regular"
                label={selectFrom}
                input={{
                    id: selectId,
                    type: 'select',
                    items: options,
                    value: data?.[selectId] ?? '',
                    hook: { register: hook.register, options: { required: true } },
                }}
                validation={{
                    isError: !!hook.errors?.[selectId],
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
                    id: textId,
                    type: 'text',
                    value: data?.[textId] ?? '',
                    hook: { register: hook.register, options: { required: true } },
                }}
                validation={{
                    isError: !!hook.errors?.[textId],
                    message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                }}
            />
        );
    }

    return urlInput;
};

export default FormSelectUri;
