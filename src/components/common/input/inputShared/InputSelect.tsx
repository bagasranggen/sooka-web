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
    selectValue?: 'value' | 'label';
} & InputCommonProps;

const InputSelect = ({
    id,
    items,
    label,
    value,
    prevValue,
    setValue,
    selectValue,
    ...rest
}: InputSelectProps): React.ReactElement => {
    const { className } = rest as any;
    const selectClass = `form-select${className ? ` ${className}` : ''}`;
    const isReturnLabel = selectValue === 'label';

    let valueSelected = value;
    if (isReturnLabel) valueSelected = items.find((item: InputSelectItem) => item.label === value)?.slug;

    return (
        <>
            <select
                {...(isReturnLabel ? {} : { id: id })}
                className={selectClass}
                value={valueSelected}
                onChange={(e) => {
                    const selectLabel = items.find((item: InputSelectItem) => item.slug === e.target.value)?.label;

                    let targetValue = e.target.value;
                    if (isReturnLabel && selectLabel) targetValue = selectLabel;

                    if (setValue) {
                        if (prevValue) setValue({ ...prevValue, ...{ [id]: targetValue } });
                        if (!prevValue) setValue(targetValue);
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

            {isReturnLabel && (
                <>
                    <input
                        id={id}
                        type="text"
                        value={value}
                        hidden
                        readOnly
                    />
                </>
            )}
        </>
    );
};

export default InputSelect;
