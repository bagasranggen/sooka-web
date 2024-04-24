import React from 'react';

import { TABLE_VARIANTS } from '@/libs/handles';

export type TableAdminViewProps = {
    variant: typeof TABLE_VARIANTS.ADMIN_VIEW;
};

const TableAdminView = ({}: TableAdminViewProps): React.ReactElement => {
    return (
        <table>
            <thead>
                <tr>
                    <th>TEST</th>
                </tr>
            </thead>
        </table>
    );
};

export default TableAdminView;
