import React from 'react';

import { FORM_HANDLES } from '@/libs/form';
import { createDynamicElement } from '@/libs/factory';
import type { FormContactProps } from '@/components/common/form/formContact/FormContact';

export type FormProps = FormContactProps;

const Form = (props: FormProps): React.ReactElement =>
    createDynamicElement({
        handles: FORM_HANDLES,
        selector: props.variant,
        props,
    });

export default Form;
