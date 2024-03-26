import React from 'react';
import { INPUT_TYPE } from '@/libs/handles';
import { InputCommonProps } from '@/libs/@types';

export type InputSwitchProps = {
    type: typeof INPUT_TYPE.SWITCH;
    color: 'primary';
    align?: 'left' | 'center' | 'right';
    isChecked?: boolean;
    setIsChecked?: React.Dispatch<React.SetStateAction<string | number | boolean>>;
    prevValue?: any;
} & InputCommonProps;

const InputSwitch = ({
    type,
    id,
    keyT,
    color,
    align,
    isChecked,
    setIsChecked,
    prevValue,
}: InputSwitchProps): React.ReactElement => {
    const inputAlign = ` input-${type}--${align ?? 'center'}`;
    const inputColor = ` input-${type}--${color}`;
    const inputClass = `input-${type}${inputColor}${inputAlign}`;

    const checkedProps = { [setIsChecked ? 'checked' : 'defaultChecked']: isChecked };

    console.log(id, keyT);

    return (
        <div className={inputClass}>
            <input
                className="check"
                type="checkbox"
                id={id}
                name={id}
                value={id}
                {...checkedProps}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!prevValue) {
                        setIsChecked && setIsChecked(e.target.checked);
                    }

                    if (prevValue && (key || id)) {
                        if (setIsChecked) {
                            setIsChecked({ ...prevValue, ...{ [key ?? (id as string)]: e.target.checked } });
                        }
                    }
                }}
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
