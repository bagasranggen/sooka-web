import React from 'react';

import type { InputTextProps } from '@/components/common/input/inputShared/inputText';
import type { TableAdminCommonProps } from '@/components/common/table/tableAdmin/TableAdmin';
import Input from '@/components/common/input/Input';

export type TableCategoriesFormProps = TableAdminCommonProps & Pick<InputTextProps, 'setValue' | 'prevValue'>;

const TableCategoriesForm = ({ setValue, prevValue }: TableCategoriesFormProps): React.ReactElement => (
    <>
        <td>
            <Input
                variant="regular"
                input={{
                    id: 'slug',
                    value: prevValue.slug ?? '',
                    setValue,
                    prevValue,
                }}
            />
        </td>
        <td>
            <Input
                variant="regular"
                input={{
                    id: 'title',
                    value: prevValue?.title ?? '',
                    setValue,
                    prevValue,
                }}
            />
        </td>
        <td>
            <Input
                variant="regular"
                input={{
                    id: 'short_description',
                    type: 'ck-editor',
                    value: prevValue?.['short_description'] ?? '',
                }}
            />
        </td>
    </>
);

export default TableCategoriesForm;
