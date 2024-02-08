import React from 'react';

import { createDynamicElement } from "@/libs/factory";
import { FILTER_HANDLES } from "@/libs/handles/filter";
import type { FilterProductProps } from "@/components/common/filter/filterProduct/FilterProduct";

export type FilterProps = FilterProductProps;

const Filter = (props: FilterProps): React.ReactElement => createDynamicElement({
    handles: FILTER_HANDLES,
    selector: props.variant,
    props,
});

export default Filter;