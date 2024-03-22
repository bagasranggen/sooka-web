import React from 'react';

import { SUPABASE_HANDLES, SUPABASE_VARIANTS } from '@/libs/handles';

import List from '@/components/common/list/List';

export type AdminLayoutProps = {
    children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps): React.ReactElement => {
    const adminNavigation = Object.keys(SUPABASE_VARIANTS).map((keys: string) => {
        const slug = SUPABASE_VARIANTS[keys as keyof typeof SUPABASE_VARIANTS];
        const label = SUPABASE_HANDLES[slug as keyof typeof SUPABASE_HANDLES];

        return {
            label,
            slug: slug,
            href: `/admin/${slug}`,
        };
    });

    return (
        <section className="ts--padding simple-cms">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="simple-cms__navigation">
                            <List
                                variant="admin-navigation"
                                items={adminNavigation}
                            />
                        </div>
                    </div>
                    <div className="col-md-9">{children}</div>
                </div>
            </div>
        </section>
    );
};

export default AdminLayout;
