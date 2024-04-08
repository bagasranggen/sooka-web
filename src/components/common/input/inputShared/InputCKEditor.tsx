'use client';

import React, { useEffect, useRef, useState } from 'react';

import type { InputCommonProps, InputValueTypeProps } from '@/libs/@types';
import { INPUT_TYPE } from '@/libs/handles';

export type InputCkEditorProps = {
    type: typeof INPUT_TYPE.CK_EDITOR;
    value: string | number;
} & InputCommonProps;

const InputCkEditor = ({ id, value }: InputCkEditorProps): React.ReactElement => {
    const editorRef = useRef<any>();
    const [inputValue, setInputValue] = useState<InputValueTypeProps>('');
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        };
        setEditorLoaded(true);
    }, []);

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

            {editorLoaded ? (
                <CKEditor
                    editor={ClassicEditor}
                    data={value as string}
                    // onReady={(editor) => {
                    //     // You can store the "editor" and use when it is needed.
                    //     console.log('Editor is ready to use!', editor);
                    // }}
                    onChange={(event: any, editor: any) => {
                        setInputValue(editor.getData());
                    }}
                    // onBlur={(event, editor) => {
                    //     console.log('Blur.', editor);
                    // }}
                    // onFocus={(event, editor) => {
                    //     console.log('Focus.', editor);
                    // }}
                />
            ) : (
                <>Loading</>
            )}
        </>
    );
};

export default InputCkEditor;
