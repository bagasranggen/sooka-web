import React from 'react';

import { INPUT_TYPE } from '@/libs/handles';
import type { InputCommonProps, InputHookOptionsProps, InputHookRegisterProps } from '@/libs/@types';

export type InputSwitchProps = {
    type: typeof INPUT_TYPE.SWITCH;
    color: 'primary';
    align?: 'left' | 'center' | 'right';
    isChecked?: boolean;
    setIsChecked?: React.Dispatch<React.SetStateAction<string | number | boolean>>;
    prevValue?: any;
    hook?: {
        options?: Partial<Pick<InputHookOptionsProps['options'], 'required' | 'valueAsNumber' | 'pattern'>>;
    } & InputHookRegisterProps;
} & InputCommonProps;

const InputSwitch = ({
    type,
    id,
    name,
    color,
    align,
    isChecked,
    setIsChecked,
    prevValue,
    hook,
}: InputSwitchProps): React.ReactElement => {
    const inputAlign = ` input-${type}--${align ?? 'center'}`;
    const inputColor = ` input-${type}--${color}`;
    const inputClass = `input-${type}${inputColor}${inputAlign}`;

    const checkedProps = { [setIsChecked ? 'checked' : 'defaultChecked']: isChecked };

    let inputStateChangeProps = {};
    if (hook) {
        inputStateChangeProps = {
            defaultChecked: isChecked,
            ...hook.register(id, hook?.options),
        };
    }
    if (!hook) {
        inputStateChangeProps = {
            name: id,
            value: name ?? id,
            ...checkedProps,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                if (!prevValue) {
                    setIsChecked && setIsChecked(e.target.checked);
                }

                if (prevValue && (name || id)) {
                    if (setIsChecked) {
                        setIsChecked({ ...prevValue, ...{ [name ?? id]: e.target.checked } });
                    }
                }
            },
        };
    }

    return (
        <div className={inputClass}>
            <input
                className="check"
                type="checkbox"
                id={id}
                {...inputStateChangeProps}
                hidden
            />
            <label
                className="input-switch__toggle"
                htmlFor={id}
            />
        </div>
    );
};

export default InputSwitch;
