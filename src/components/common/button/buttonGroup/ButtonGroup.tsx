import React from 'react';

type ButtonGroupProps = {
    children: React.ReactNode;
};

const ButtonGroup = ({ children }: ButtonGroupProps): React.ReactElement => <div className="btn-group">{children}</div>;

export { ButtonGroup };
