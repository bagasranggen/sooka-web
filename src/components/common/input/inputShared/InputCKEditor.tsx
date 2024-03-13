'use client';

import React, { useState } from 'react';

import type { InputCommonProps, InputValueTypeProps } from '@/libs/@types';
import { INPUT_TYPE } from '@/libs/handles';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

export type InputCkEditorProps = {
    type: typeof INPUT_TYPE.CK_EDITOR;
    value: string | number;
} & InputCommonProps;

const InputCkEditor = ({ id, value }: InputCkEditorProps): React.ReactElement => {
    const [inputValue, setInputValue] = useState<InputValueTypeProps>('');

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
            <CKEditor
                editor={ClassicEditor}
                data={value as string}
                // data="<p>Hello from CKEditor&nbsp;5!</p>"
                // onReady={(editor) => {
                //     // You can store the "editor" and use when it is needed.
                //     console.log('Editor is ready to use!', editor);
                // }}
                onChange={(event, editor) => {
                    console.log(event, editor.getData());
                    setInputValue(editor.getData());
                }}
                // onBlur={(event, editor) => {
                //     console.log('Blur.', editor);
                // }}
                // onFocus={(event, editor) => {
                //     console.log('Focus.', editor);
                // }}
            />
        </>
    );
};

export default InputCkEditor;
