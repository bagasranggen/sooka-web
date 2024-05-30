import React from 'react';

import type { InputCommonProps, InputHookValueProps, InputTypeProps, TextareaTypeProps } from '@/libs/@types';
import { INPUT_VARIANTS } from '@/libs/handles';
import { joinClassnameString } from '@/libs/utils';

import { UseFormRegister } from 'react-hook-form';

export type InputFloatingProps = {
    variant: typeof INPUT_VARIANTS.FLOATING;
    className?: string;
    hook?: {
        register: UseFormRegister<InputHookValueProps>;
    };
    input: {
        label: string;
    } & InputCommonProps &
        (InputTypeProps | TextareaTypeProps);
    options?: {
        align?: 'left' | 'center';
        required?: boolean;
        valueAsNumber?: boolean;
        pattern?: any;
    };
    validation?: {
        isError?: boolean;
        message?: string;
    };
};

const InputFloating = ({ className, hook, input, options, validation }: InputFloatingProps): React.ReactElement => {
    const Input: keyof React.JSX.IntrinsicElements = input.type === 'textarea' ? 'textarea' : 'input';

    const hookOptions = {
        ...(options?.required ? { required: true } : {}),
        ...(options?.pattern ? { pattern: options.pattern } : {}),
    };

    let inputClass: string | string[] = ['input-group', 'input-group--floating'];
    if (options?.align) inputClass.push(`input-group--${options.align}`);
    if (className) inputClass.push(className);
    inputClass = joinClassnameString(inputClass);

    return (
        <div className={inputClass}>
            <div className={`form-floating${validation?.isError ? ' is-invalid' : ''}`}>
                <Input
                    type={input.type ?? 'text'}
                    className="form-control"
                    placeholder={input.label}
                    id={input.id}
                    {...(input?.type === 'textarea' ? { style: { height: input.height } } : {})}
                    {...(hook ? hook.register(input.id, hookOptions) : {})}
                />
                <label htmlFor={input.id}>{input.label}</label>
            </div>
            {validation?.isError && validation?.message && (
                <div className="invalid-feedback">{validation?.message}</div>
            )}
        </div>
    );
};

export default InputFloating;
