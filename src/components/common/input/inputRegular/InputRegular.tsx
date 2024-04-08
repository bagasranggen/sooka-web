import React from 'react';

import { INPUT_TYPE_HANDLES, INPUT_VARIANTS } from '@/libs/handles';
import { createDynamicElement } from '@/libs/factory';

import type { InputTextProps } from '@/components/common/input/inputShared/InputText';
import type { InputSwitchProps } from '@/components/common/input/inputShared/InputSwitch';
import type { InputCkEditorProps } from '@/components/common/input/inputShared/InputCKEditor';
import type { InputSelectProps } from '@/components/common/input/inputShared/InputSelect';

export type InputRegularProps = {
    variant: typeof INPUT_VARIANTS.REGULAR;
    className?: string;
    label?: string;
    input: InputTextProps | InputSwitchProps | InputCkEditorProps | InputSelectProps;
};

const InputRegular = ({ input, label, className }: InputRegularProps): React.ReactElement => {
    const InputWrapper = label ? 'div' : React.Fragment;

    let inputIsHidden = false;
    switch (true) {
        case input.type === 'select':
        case input.type === 'switch':
        case input.type === 'ck-editor':
            break;

        default:
            inputIsHidden = !!input.isHidden;
            break;
    }

    return (
        <InputWrapper {...(label ? { className: 'input-group--regular' } : {})}>
            {label && !inputIsHidden && <label htmlFor={input.id}>{label}</label>}
            {createDynamicElement({
                handles: INPUT_TYPE_HANDLES,
                selector: input?.type ?? 'text',
                props: { ...input, ...{ className: className } },
            })}
        </InputWrapper>
    );
};

export default InputRegular;
