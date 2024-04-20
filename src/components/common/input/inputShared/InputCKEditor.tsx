'use client';

import React, { useEffect, useRef, useState } from 'react';

import type {
    InputCommonProps,
    InputHookOptionsProps,
    InputHookRegisterProps,
    InputValueTypeProps,
} from '@/libs/@types';
import { INPUT_TYPE } from '@/libs/handles';
import { Control, Controller, FieldValues, UseFormSetValue } from 'react-hook-form';

export type InputCkEditorWrapperProps = {
    id: string;
    className?: string;
    control: Control<FieldValues>;
    children: React.ReactNode;
};

export type InputCkEditorProps = {
    type: typeof INPUT_TYPE.CK_EDITOR;
    value: string | number;
    hook?: {
        control: InputCkEditorWrapperProps['control'];
        setValue: UseFormSetValue<any>;
        options?: Partial<Pick<InputHookOptionsProps['options'], 'required' | 'valueAsNumber' | 'pattern'>>;
    } & InputHookRegisterProps;
} & InputCommonProps;

const InputCkEditorWrapper = ({ children, control, id, className }: InputCkEditorWrapperProps): React.ReactElement => {
    let Wrapper: React.ExoticComponent | keyof React.JSX.IntrinsicElements = React.Fragment;
    if (className) Wrapper = 'div';

    return (
        <Wrapper {...(className ? { className: className } : {})}>
            <Controller
                control={control}
                render={() => <>{children}</>}
                name={id}
            />
        </Wrapper>
    );
};

const InputCkEditor = ({ id, value, hook, ...rest }: InputCkEditorProps): React.ReactElement => {
    const { className } = rest as any;

    const editorRef = useRef<any>();
    const [inputValue, setInputValue] = useState<InputValueTypeProps>('');
    const [editorLoaded, setEditorLoaded] = useState(false);

    const { CKEditor, ClassicEditor } = editorRef.current || {};

    let onChangeHandler;
    if (hook) {
        onChangeHandler = (event: any, editor: any) => {
            hook?.setValue && hook.setValue(id, editor.getData());
        };
    }
    if (!hook) {
        onChangeHandler = (event: any, editor: any) => {
            setInputValue(editor.getData());
        };
    }

    let onReadyHandler;
    if (hook) {
        onReadyHandler = (editor: any) => {
            hook?.setValue && hook.setValue(id, editor.getData());
        };
    }

    let editor;
    if (editorLoaded) {
        editor = (
            <CKEditor
                editor={ClassicEditor}
                data={value as string}
                onReady={onReadyHandler}
                onChange={onChangeHandler}
            />
        );
    }
    if (!editorLoaded) {
        editor = <div className="mt-1">Loading CK Editor...</div>;
    }

    useEffect(() => {
        editorRef.current = {
            // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        };
        setEditorLoaded(true);
    }, []);

    if (hook) {
        return (
            <InputCkEditorWrapper
                id={id}
                className={className}
                control={hook.control}>
                {editor}
            </InputCkEditorWrapper>
        );
    }

    return (
        <>
            <input
                id={id}
                name={id}
                type="text"
                defaultValue={inputValue as string}
                readOnly
                hidden
            />

            {editor}
        </>
    );
};

export default InputCkEditor;
