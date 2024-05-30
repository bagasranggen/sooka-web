import React from 'react';
import { AdminDataVariantProps } from '@/libs/@types';

export type FormTitleProps = {
    variant: Exclude<AdminDataVariantProps, 'view'>;
    children: React.ReactNode;
};

const FormTitle = ({ variant, children }: FormTitleProps): React.ReactElement => {
    let title: string = '';
    if (variant === 'add') title = 'Add';
    if (variant === 'edit') title = 'Edit';

    title += ` ${children}`;

    return <h1 className="fw-300">{title}</h1>;
};

export default FormTitle;
