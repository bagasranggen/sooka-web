import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { INPUT_HANDLES } from '@/libs/handles';
import type { InputFloatingProps } from '@/components/common/input/inputFloating/InputFloating';

export type InputProps = InputFloatingProps;

const Input = (props: InputProps): React.ReactElement =>
    createDynamicElement({
        handles: INPUT_HANDLES,
        selector: props.variant,
        props,
    });

export default Input;
