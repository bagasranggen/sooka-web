import React from 'react';

import type {
    InputCommonProps,
    InputHookOptionsProps,
    InputHookRegisterProps,
    InputTypeProps,
    InputValueTypeProps,
} from '@/libs/@types';

export type InputTextProps = {
    value?: string | number;
    prevValue?: any;
    setValue?: React.Dispatch<React.SetStateAction<InputValueTypeProps>>;
    isDisabled?: boolean;
    isHidden?: boolean;
    pattern?: any;
    hook?: {
        options?: Partial<Pick<InputHookOptionsProps['options'], 'required' | 'valueAsNumber' | 'pattern'>>;
    } & InputHookRegisterProps;
} & (InputTypeProps & InputCommonProps);

const InputText = ({
    id,
    name,
    type,
    value,
    setValue,
    prevValue,
    isDisabled,
    isHidden,
    pattern,
    hook,
    ...rest
}: InputTextProps): React.ReactElement => {
    const { className } = rest as any;
    const inputClass = `form-control${className ? ` ${className}` : ''}`;

    let inputStateChangeProps = {};
    if (hook) {
        inputStateChangeProps = {
            defaultValue: value,
            ...hook.register(id, hook?.options),
        };
    }
    if (!hook) {
        inputStateChangeProps = {
            value: value,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                if (setValue) {
                    if (prevValue) {
                        setValue({ ...prevValue, ...{ [name ?? id]: e.target.value } });
                    }
                    if (!prevValue) setValue(e.target.value);
                }
            },
        };
    }

    return (
        <input
            {...(id ? { id: id } : {})}
            className={inputClass}
            type={type ?? 'text'}
            {...inputStateChangeProps}
            {...(pattern ? { pattern: pattern } : {})}
            {...(isDisabled ? { disabled: true } : {})}
            {...(isHidden ? { hidden: true } : {})}
        />
    );
};

export default InputText;
