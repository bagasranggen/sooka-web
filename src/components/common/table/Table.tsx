import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { TABLE_HANDLES } from '@/libs/handles';

import type { TableAdminProps } from '@/components/common/table/tableAdmin/TableAdmin';
import type { TableAdminAddProps } from '@/components/common/table/tableAdminAdd/TableAdminAdd';

export type TableProps = TableAdminProps | TableAdminAddProps;

const Table = (props: TableProps): React.ReactElement =>
    createDynamicElement({
        handles: TABLE_HANDLES,
        selector: props.variant,
        props,
    });

export default Table;
