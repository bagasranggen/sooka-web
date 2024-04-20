import React from 'react';

import type {
    InputCommonProps,
    InputHookOptionsProps,
    InputHookRegisterProps,
    InputValueTypeProps,
} from '@/libs/@types';
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
    events?: React.DOMAttributes<HTMLSelectElement>;
    hook?: {
        options?: Partial<Pick<InputHookOptionsProps['options'], 'required' | 'valueAsNumber' | 'pattern'>>;
    } & InputHookRegisterProps;
} & InputCommonProps;

const InputSelect = ({
    id,
    name,
    items,
    label,
    value,
    prevValue,
    setValue,
    selectValue,
    events,
    hook,
    ...rest
}: InputSelectProps): React.ReactElement => {
    const { className } = rest as any;
    const selectClass = `form-select${className ? ` ${className}` : ''}`;
    const isReturnLabel = selectValue === 'label';

    let valueSelected = value;
    if (isReturnLabel) valueSelected = items.find((item: InputSelectItem) => item.label === value)?.slug;

    let inputStateChangeProps = {};
    if (hook) {
        inputStateChangeProps = {
            defaultValue: valueSelected,
            ...hook.register(id, hook?.options),
        };
    }
    if (!hook) {
        inputStateChangeProps = {
            value: valueSelected,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                const selectLabel = items.find((item: InputSelectItem) => item.slug === e.target.value)?.label;

                let targetValue = e.target.value;
                if (isReturnLabel && selectLabel) targetValue = selectLabel;

                if (setValue) {
                    if (prevValue) setValue({ ...prevValue, ...{ [name ?? id]: targetValue } });
                    if (!prevValue) setValue(targetValue);
                }

                events?.onChange && events.onChange(e);
            },
        };
    }

    return (
        <>
            <select
                {...(isReturnLabel ? {} : { id: id })}
                className={selectClass}
                {...inputStateChangeProps}>
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
