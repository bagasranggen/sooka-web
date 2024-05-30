import React from 'react';

export type ButtonWrapperProps = {
    className?: string;
    children: React.ReactNode;
};

export const ButtonWrapper = ({ className, children }: ButtonWrapperProps): React.ReactElement => (
    <div className={`btn-group${className ? ` ${className}` : ''}`}>{children}</div>
);
