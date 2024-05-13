import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { LIST_HANDLES } from '@/libs/handles';

import type { ListAdminNavigationProps } from '@/components/common/list/listAdminNavigation/ListAdminNavigation';
import type { ListPointProps } from '@/components/common/list/listPoint/ListPoint';

export type ListProps = ListAdminNavigationProps | ListPointProps;

const List = (props: ListProps): React.ReactElement =>
    createDynamicElement({
        handles: LIST_HANDLES,
        selector: props.variant,
        props,
    });

export default List;
export type * from '@/components/common/list/listAdminNavigation/ListAdminNavigation';
export type * from '@/components/common/list/listPoint/ListPoint';
