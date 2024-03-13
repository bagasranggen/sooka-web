import React from 'react';

import type { InputCommonProps, InputValueTypeProps } from '@/libs/@types';
import { INPUT_TYPE } from '@/libs/handles';

export type InputSelectItem = {
    slug: string;
    label: string;
};

export type InputSelectProps = {
    type: typeof INPUT_TYPE.SELECT;
    items: InputSelectItem[];
    label?: string;
    value?: string;
    prevValue?: any;
    setValue?: React.Dispatch<React.SetStateAction<InputValueTypeProps>>;
} & InputCommonProps;

const InputSelect = ({
    id,
    items,
    label,
    value,
    prevValue,
    setValue,
    ...rest
}: InputSelectProps): React.ReactElement => {
    const { className } = rest as any;
    const selectClass = `form-select${className ? ` ${className}` : ''}`;

    return (
        <select
            id={id}
            className={selectClass}
            value={value}
            onChange={(e) => {
                if (setValue) {
                    if (prevValue) setValue({ ...prevValue, ...{ [id]: e.target.value } });
                    if (!prevValue) setValue(e.target.value);
                }
            }}>
            {label ? <option>{label}</option> : null}
            {items.map((item: InputSelectItem, i: number) => (
                <option
                    key={i}
                    value={item.slug}>
                    {item.label}
                </option>
            ))}
        </select>
    );
};

export default InputSelect;
