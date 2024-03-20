import React from 'react';
import type { InputTypeProps, InputValueTypeProps } from '@/libs/@types';

export type InputTextProps = {
    id: string;
    value?: string | number;
    prevValue?: any;
    setValue?: React.Dispatch<React.SetStateAction<InputValueTypeProps>>;
    isDisabled?: boolean;
    pattern?: any;
} & InputTypeProps;

const InputText = ({
    id,
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
            id={id}
            name={id}
            className={inputClass}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (setValue) {
                    if (prevValue) setValue({ ...prevValue, ...{ [id]: e.target.value } });
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
