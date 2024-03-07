import type { FormRenderProps } from '@/components/common/form/FormRender';
import { COMMON_REGEX, ERROR_MESSAGE } from '@/libs/data';

export const FORM_CONTACT_INPUT = {
    FIRST_NAME: 'firstName',
    EMAIL: 'email',
    MESSAGE: 'message',
} as const;

export const FORM_CONTACT: FormRenderProps['items'] = [
    {
        children: [
            {
                size: {
                    lg: 6,
                },
                variant: 'floating',
                input: {
                    type: 'text',
                    id: FORM_CONTACT_INPUT.FIRST_NAME,
                    label: 'First Name',
                },
                options: {
                    required: true,
                },
                validation: {
                    message: ERROR_MESSAGE.REQUIRED,
                },
            },
            {
                size: {
                    lg: 6,
                },
                variant: 'floating',
                input: {
                    type: 'email',
                    id: FORM_CONTACT_INPUT.EMAIL,
                    label: 'Email',
                },
                options: {
                    required: true,
                    pattern: COMMON_REGEX.EMAIL_VALIDATION,
                },
                validation: {
                    message: ERROR_MESSAGE.REQUIRED,
                    additionalMessage: 'Email is not valid',
                },
            },
        ],
    },
    {
        children: [
            {
                size: {},
                variant: 'floating',
                input: {
                    type: 'textarea',
                    height: 150,
                    id: FORM_CONTACT_INPUT.MESSAGE,
                    label: 'Send us some message',
                },
                options: {
                    required: true,
                },
                validation: {
                    message: ERROR_MESSAGE.REQUIRED,
                },
            },
        ],
    },
];
