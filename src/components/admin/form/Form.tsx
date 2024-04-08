import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { ADMIN_FORM_HANDLES } from '@/libs/handles';

import type { FormPagesProps } from '@/components/admin/form/formPages/FormPages';
import type { FormHomepageCarouselProps } from '@/components/admin/form/formHomepageCarousel/FormHomepageCarousel';

export type * from '@/components/admin/form/formPages/FormPages';
export type * from '@/components/admin/form/formHomepageCarousel/FormHomepageCarousel';

export type FormProps = FormPagesProps | FormHomepageCarouselProps;

const Form = (props: FormProps): React.ReactElement =>
    createDynamicElement({
        handles: ADMIN_FORM_HANDLES,
        selector: props.variant,
        props,
    });

export default Form;
