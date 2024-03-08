import React from 'react';

export type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps): React.ReactElement => (
    <div className="ts--padding">
        <div className="container">
            <div className="row">
                <div className="col-md-3">ADMIN NAVIGATION</div>
                <div className="col">{children}</div>
            </div>
        </div>
    </div>
);

export default Layout;
