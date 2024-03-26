import React from 'react';

import type { InputCommonProps, InputTypeProps, InputValueTypeProps } from '@/libs/@types';

export type InputTextProps = {
    value?: string | number;
    prevValue?: any;
    setValue?: React.Dispatch<React.SetStateAction<InputValueTypeProps>>;
    isDisabled?: boolean;
    pattern?: any;
} & (InputTypeProps & InputCommonProps);

const InputText = ({
    id,
    name,
    type,
    value,
    setValue,
    prevValue,
    isDisabled,
    pattern,
    ...rest
}: InputTextProps): React.ReactElement => {
    const { className } = rest as any;
    const inputClass = `form-control${className ? ` ${className}` : ''}`;

    return (
        <input
            {...(id ? { id: id } : {})}
            className={inputClass}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (setValue) {
                    if (prevValue) {
                        setValue({ ...prevValue, ...{ [name ?? id]: e.target.value } });
                    }
                    if (!prevValue) setValue(e.target.value);
                }
            }}
            type={type ?? 'text'}
            {...(pattern ? { pattern: pattern } : {})}
            {...(isDisabled ? { disabled: true } : {})}
        />
    );
};

export default InputText;
