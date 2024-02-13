import React from 'react';

import type { InputTypeProps, TextareaTypeProps } from '@/libs/@types';
import { INPUT_VARIANTS } from '@/libs/handles';

import { UseFormRegister } from 'react-hook-form';

export type InputHookValue = { [key: string]: string | number } | any;

export type InputFloatingProps = {
    variant: typeof INPUT_VARIANTS.FLOATING;
    className?: string;
    hook?: {
        register: UseFormRegister<InputHookValue>;
    };
    input: {
        id: string;
        label: string;
    } & (InputTypeProps | TextareaTypeProps);
    options?: {
        required?: boolean;
        valueAsNumber?: boolean;
        pattern?: any;
    };
    validation?: {
        isError?: boolean;
        message?: string;
    }
};

const InputFloating = ({ hook, input, options, validation }: InputFloatingProps): React.ReactElement => {
    const Input: keyof React.JSX.IntrinsicElements = input.type === 'textarea' ? 'textarea' : 'input';

    const hookOptions = {
        ...options?.required ? { required: true } : {},
        ...options?.pattern ? { pattern: options.pattern } : {},
    };

    return <div className="input-group input-group--floating">
        <div className={`form-floating${validation?.isError ? ' is-invalid' : ''}`}>
            <Input
                type={input.type ?? 'text'}
                className="form-control"
                placeholder={input.label}
                id={input.id}
                {...input?.type === 'textarea' ? { style: { height: input.height } } : {}}
                {...hook ? hook.register(input.id, hookOptions) : {}}
            />
            <label htmlFor={input.id}>{input.label}</label>
        </div>
        {(validation?.isError && validation?.message) && <div className="invalid-feedback">{validation?.message}</div>}
    </div>;
};

export default InputFloating;