import FormRender, { FormRenderProps } from '@/components/common/form/FormRender';

export const FORM_CONTACT_INPUT = {
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
} as const;

export const FORM_CONTACT: FormRenderProps['items'] = [
    {
        children: [
            {
                size: {
                    sm: 8,
                    lg: 6,
                },
                variant: 'floating',
                input: {
                    //     type: 'text',
                    id: FORM_CONTACT_INPUT.FIRST_NAME,
                    //     label: 'label',
                },

            },
            // {
            //     handle: FORM_CONTACT_INPUT.LAST_NAME,
            //     type: 'text'
            // },
        ]
    },

];