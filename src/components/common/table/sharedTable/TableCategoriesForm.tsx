import React from 'react';

import slugify from 'react-slugify';

import type { InputTextProps } from '@/components/common/input/inputShared/InputText';
import type { TableAdminCommonProps } from '@/components/common/table/tableAdmin/TableAdmin';
import Input from '@/components/common/input/Input';

export type TableCategoriesFormProps = TableAdminCommonProps & Pick<InputTextProps, 'setValue' | 'prevValue'>;

const TableCategoriesForm = ({ setValue, prevValue }: TableCategoriesFormProps): React.ReactElement => (
    <>
        <td>
            <Input
                variant="regular"
                input={{
                    id: 'label',
                    value: prevValue.label ?? '',
                    setValue,
                    prevValue,
                }}
            />
        </td>
        <td>
            <Input
                variant="regular"
                input={{
                    id: 'slug',
                    value: slugify(prevValue?.label ?? ''),
                    isDisabled: true,
                }}
            />
        </td>
    </>
);

export default TableCategoriesForm;
