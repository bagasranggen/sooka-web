import React from 'react';

import { INPUT_TYPE_HANDLES, INPUT_VARIANTS } from '@/libs/handles';
import type { InputTypeProps } from '@/libs/@types';
import { createDynamicElement } from '@/libs/factory';
import { InputTextProps } from '@/components/common/input/inputShared/inputText';
import { InputSwitchProps } from '@/components/common/input/inputShared/InputSwitch';

export type InputRegularProps = {
    variant: typeof INPUT_VARIANTS.REGULAR;
    // hook?: {
    //     register: UseFormRegister<InputHookValue>;
    // };
    input: InputTextProps | InputSwitchProps;
};

const InputRegular = ({ input }: InputRegularProps): React.ReactElement => {
    return createDynamicElement({
        handles: INPUT_TYPE_HANDLES,
        selector: input?.type ?? 'text',
        props: input,
    });
};

export default InputRegular;
