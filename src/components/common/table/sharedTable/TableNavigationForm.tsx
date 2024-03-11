import React from 'react';

import slugify from 'react-slugify';

import type { InputTextProps } from '@/components/common/input/inputShared/inputText';
import type { TableAdminCommonProps } from '@/components/common/table/tableAdmin/TableAdmin';
import Input from '@/components/common/input/Input';

export type TableCategoriesFormProps = TableAdminCommonProps & Pick<InputTextProps, 'setValue' | 'prevValue'>;

const TableCategoriesForm = ({ setValue, prevValue, type }: TableCategoriesFormProps): React.ReactElement => (
    <>
        <td>
            <Input
                variant="regular"
                input={{
                    id: 'label',
                    value: prevValue?.label ?? '',
                    setValue,
                    prevValue,
                }}
            />
        </td>
        <td>
            <Input
                variant="regular"
                input={{
                    id: 'href',
                    value: `/${slugify(prevValue?.label ?? '')}`,
                    isDisabled: true,
                }}
            />
        </td>
        <td>
            <Input
                variant="regular"
                input={{
                    id: 'target',
                    type: 'switch',
                    color: 'primary',
                    isChecked: prevValue?.target ?? false,
                    setIsChecked: setValue,
                    prevValue,
                }}
            />
        </td>
        <td>
            <Input
                variant="regular"
                input={{
                    id: 'is_show',
                    type: 'switch',
                    color: 'primary',
                    isChecked: type === 'add' ? true : prevValue?.['is_show'] ?? false,
                    setIsChecked: setValue,
                    prevValue,
                }}
            />
        </td>
    </>
);

export default TableCategoriesForm;
