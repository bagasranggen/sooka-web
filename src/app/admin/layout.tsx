import React from 'react';

import AdminLayout from '@/components/layout/adminLayout/AdminLayout';

export type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps): React.ReactElement => <AdminLayout>{children}</AdminLayout>;

export default Layout;
