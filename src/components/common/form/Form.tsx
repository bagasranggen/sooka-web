import React from 'react';

import { FORM_HANDLES } from '@/libs/form';
import { createDynamicElement } from '@/libs/factory';

import type { FormContactProps } from '@/components/common/form/formContact/FormContact';
import { FormUserLoginProps } from '@/components/common/form/formUserLogin/FormUserLogin';

export type FormProps = FormContactProps | FormUserLoginProps;

const Form = (props: FormProps): React.ReactElement =>
    createDynamicElement({
        handles: FORM_HANDLES,
        selector: props.variant,
        props,
    });

export default Form;
