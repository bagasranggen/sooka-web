import React from 'react';

import { TABLE_VARIANTS } from '@/libs/handles';

import TableAdminHead, {
    type TableAdminHeadItemProps,
} from '@/components/common/table/tableAdminView/components/TableHead';
import TableAdminBody, {
    type TableAdminBodyProps,
} from '@/components/common/table/tableAdminView/components/TableBody';

export type TableAdminViewProps = {
    variant: typeof TABLE_VARIANTS.ADMIN_VIEW;
    head: TableAdminHeadItemProps[];
    body: TableAdminBodyProps['entries'];
    actions: TableAdminBodyProps['actions'];
};

const TableAdminView = ({ head, body, actions }: TableAdminViewProps): React.ReactElement => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <TableAdminHead items={head} />
                <TableAdminBody
                    entries={body}
                    items={head}
                    actions={actions}
                />
            </table>
        </div>
    );
};

export default TableAdminView;
