import React from 'react';

import { getResponsiveClass, joinClassnameString } from '@/libs/utils';
import type { CreateArrayWithLengthX, InputHookValueProps, NumericRange, ResponsiveClassProps } from '@/libs/@types';

import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import Input, { type InputFloatingProps } from '@/components/common/input/Input';

export type FormRenderItemProps = {
    size: ResponsiveClassProps;
    validation?: {
        message?: string;
        additionalMessage?: string;
    };
} & Omit<InputFloatingProps, 'hook'>;

export type FormRenderProps = {
    spacing: NumericRange<CreateArrayWithLengthX<0>, 15>;
    hook: {
        register: UseFormRegister<InputHookValueProps>;
        errors: FieldErrors<InputHookValueProps>;
    };
    items: Array<{
        children: FormRenderItemProps[];
    }>;
};

const FormRender = ({ items, hook, spacing }: FormRenderProps): React.ReactElement => (
    <>
        {items.map((item: any, i: number) => {
            const classArr: string[] = ['row'];

            if (i !== items.length - 1 && spacing) classArr.push(`mb-${spacing}`);
            if (spacing) classArr.push(`gy-${spacing}`);

            return (
                <div
                    key={i}
                    className={joinClassnameString(classArr)}>
                    {item.children.map((input: FormRenderItemProps, idx: number) => {
                        const columnClass = getResponsiveClass({ obj: input.size, className: 'col' });
                        const { validation, ...inputProps } = input;

                        return (
                            <div
                                className={columnClass}
                                key={idx}>
                                <Input
                                    hook={{ register: hook.register }}
                                    validation={{
                                        isError: hook.errors[input.input.id] as unknown as boolean,
                                        message:
                                            hook.errors[input.input.id]?.type === 'pattern'
                                                ? input.validation?.additionalMessage
                                                : input.validation?.message,
                                    }}
                                    {...inputProps}
                                />
                            </div>
                        );
                    })}
                </div>
            );
        })}
    </>
);

export default FormRender;
