import React from 'react';
import Link from 'next/link';

import { SUPABASE_HANDLES, SUPABASE_VARIANTS } from '@/libs/handles';

export type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps): React.ReactElement => (
    <div className="ts--padding">
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <ul>
                        {Object.keys(SUPABASE_VARIANTS).map((keys: string, i: number) => {
                            const slug = SUPABASE_VARIANTS[keys as keyof typeof SUPABASE_VARIANTS];
                            const label = SUPABASE_HANDLES[slug as keyof typeof SUPABASE_HANDLES];

                            return (
                                <li key={i}>
                                    <Link href={`/admin/${slug}`}>{label}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="col">{children}</div>
            </div>
        </div>
    </div>
);

export default Layout;
