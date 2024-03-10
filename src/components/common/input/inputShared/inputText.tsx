import React from 'react';
import type { InputTypeProps } from '@/libs/@types';

export type InputTextProps = {
    id: string;
    value?: string | number;
    prevValue?: any;
    setValue?: React.Dispatch<React.SetStateAction<string | number>>;
    isDisabled?: boolean;
} & InputTypeProps;

const InputText = ({ id, type, value, setValue, prevValue, isDisabled }: InputTextProps): React.ReactElement => (
    <input
        id={id}
        name={id}
        className="form-control"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (setValue) {
                if (prevValue) setValue({ ...prevValue, ...{ [id]: e.target.value } });
                if (!prevValue) setValue(e.target.value);
            }
        }}
        type={type ?? 'text'}
        {...(isDisabled ? { disabled: true } : {})}
    />
);

export default InputText;
