import { UseFormRegister } from 'react-hook-form';

export type InputCommonProps = { id: string; name?: string };
export type InputTypeProps = { type?: 'text' | 'email' | 'number' | 'tel' | 'password' };
export type TextareaTypeProps = {
    type?: 'textarea';
    height: number;
};
export type InputValueTypeProps = string | number | boolean;
export type InputHookValueProps = { [key: string]: string | number } | any;
export type InputHookRegisterProps = { register: UseFormRegister<InputHookValueProps> };
export type InputHookOptionsProps = {
    options: {
        required?: boolean;
        valueAsNumber?: boolean;
        pattern?: any;
    };
};
