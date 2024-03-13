import React from 'react';

import { INPUT_TYPE_HANDLES, INPUT_VARIANTS } from '@/libs/handles';
import { createDynamicElement } from '@/libs/factory';

import type { InputTextProps } from '@/components/common/input/inputShared/inputText';
import type { InputSwitchProps } from '@/components/common/input/inputShared/InputSwitch';
import type { InputCkEditorProps } from '@/components/common/input/inputShared/InputCKEditor';

export type InputRegularProps = {
    variant: typeof INPUT_VARIANTS.REGULAR;
    className?: string;
    // hook?: {
    //     register: UseFormRegister<InputHookValue>;
    // };
    input: InputTextProps | InputSwitchProps | InputCkEditorProps;
};

const InputRegular = ({ input, className }: InputRegularProps): React.ReactElement => {
    return createDynamicElement({
        handles: INPUT_TYPE_HANDLES,
        selector: input?.type ?? 'text',
        props: { ...input, ...{ className: className } },
    });
};

export default InputRegular;
