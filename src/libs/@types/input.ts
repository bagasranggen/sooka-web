export type InputCommonProps = { id: string };
export type InputTypeProps = { type?: 'text' | 'email' | 'number' | 'tel' | 'password' };
export type TextareaTypeProps = {
    type?: 'textarea';
    height: number;
};
export type InputValueTypeProps = string | number | boolean;
