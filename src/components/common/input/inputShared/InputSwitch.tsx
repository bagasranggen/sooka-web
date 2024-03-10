import React from 'react';
import { INPUT_TYPE } from '@/libs/handles';
import { InputCommonProps } from '@/libs/@types';

export type InputSwitchProps = {
    type: typeof INPUT_TYPE.SWITCH;
    color: 'primary';
} & InputCommonProps;

const InputSwitch = ({ id, color }: InputSwitchProps): React.ReactElement => (
    <div className={`input-switch input-switch--${color}`}>
        <input
            className="check"
            type="checkbox"
            id={id}
            name={id}
            value={id}
            hidden
        />
        <label
            className="input-switch__toggle"
            htmlFor={id}
        />
    </div>
);

export default InputSwitch;
