import React from 'react';

import type { InputTypeProps } from '@/libs/@types';
import { INPUT_VARIANTS } from '@/libs/handles';

import { Path, UseFormRegister } from 'react-hook-form';

export type InputHookValue = { [key: string]: string | number } | any;

export type InputFloatingProps = {
    variant: typeof INPUT_VARIANTS.FLOATING;
    className?: string;
    hook?: {
        //     name: Path<InputHookValue>;
        register: UseFormRegister<InputHookValue>;
        required?: boolean;
        valueAsNumber?: boolean;
        pattern?: any;
    };
    input: {
        // type?: InputTypeProps;
        id: string;
        //     label: string;
    };
    // options?: {
    //     required?: boolean;
    //     valueAsNumber?: boolean;
    //     pattern?: any;
    // }
    validation?: {
        isError?: boolean;
        message?: string;
    }
};

const InputFloating = ({ hook, input, validation }: InputFloatingProps): React.ReactElement => {
    const hookOptions = {
        ...hook?.required ? { required: true } : {},
        ...hook?.pattern ? { pattern: hook.pattern } : {},
    };

    return <div className="input-group input-group--floating">
        <div className={`form-floating${validation?.isError ? ' is-invalid' : ''}`}>
            <input
                // type={input.type ?? 'text'}
                className="form-control"
                placeholder={'input.label'}
                // id={input.id}
                {...hook ? hook.register(input.id, hookOptions) : {}}
            />
            <label htmlFor="floatingInput">{'input.label'}</label>
        </div>
        {(validation?.isError && validation?.message) && <div className="invalid-feedback">{validation?.message}</div>}
    </div>;
};

export default InputFloating;