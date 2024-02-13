'use client';

import React from 'react';

import Input, { InputProps } from '@/components/common/input/Input';
import type { UseFormRegister } from "react-hook-form";
import type { InputHookValue } from "@/components/common/input/inputFloating/InputFloating";
import type { ResponsiveClassProps } from "@/libs/@types";
import { getResponsiveClass } from "@/libs/utils";

export type FormRenderItemProps = {
    size: ResponsiveClassProps;
} & Omit<InputProps, 'hook'>;

export type FormRenderProps = {
    hook: {
        register: UseFormRegister<InputHookValue>
    };
    items: Array<{
        children: FormRenderItemProps[];
    }>;
};

const FormRender = ({ items, hook }: FormRenderProps): React.ReactElement => (
    <>
        {/*{items.map((item: any, i: number) => {*/}
        {/*    return <div*/}
        {/*        className="row"*/}
        {/*        key={i}>*/}
        {/*        {item.children.map((input: FormRenderItemProps, idx: number) => {*/}

        {/*            return <div*/}
        {/*                className={'columnClass'}*/}
        {/*                key={idx}>*/}
        {/*                /!*<Input*!/*/}
        {/*                /!*    // variant="floating"*!/*/}
        {/*                /!*    // {...hook.register(input.input.id)}*!/*/}
        {/*                /!*    hook={{ register: hook.register }}*!/*/}
        {/*                /!*    {...input}*!/*/}
        {/*                /!*    // {...inputProps}*!/*/}
        {/*                /!*    // input={{ type: f.type, id: f.handle, label: 'label' }}*!/*/}
        {/*                /!*    // hook={{ register, name: f.handle }}*!/*/}
        {/*                /!*/>*!/*/}
        {/*            </div>;*/}
        {/*        })}*/}
        {/*    </div>;*/}
        {/*})}*/}
    </>
);

export default FormRender;