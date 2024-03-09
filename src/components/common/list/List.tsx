import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { LIST_HANDLES } from '@/libs/handles';

import type { ListAdminNavigationProps } from '@/components/common/list/listAdminNavigation/ListAdminNavigation';

export type ListProps = ListAdminNavigationProps;

const List = (props: ListProps): React.ReactElement =>
    createDynamicElement({
        handles: LIST_HANDLES,
        selector: props.variant,
        props,
    });

export default List;
