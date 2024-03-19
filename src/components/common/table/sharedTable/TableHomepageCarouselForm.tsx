import React from 'react';

import slugify from 'react-slugify';

import type { InputTextProps } from '@/components/common/input/inputShared/inputText';
import type { TableAdminCommonProps } from '@/components/common/table/tableAdmin/TableAdmin';
import Input from '@/components/common/input/Input';

export type TableHomepageCarouselFormProps = TableAdminCommonProps & Pick<InputTextProps, 'setValue' | 'prevValue'>;

const TableHomepageCarouselForm = ({
    setValue,
    prevValue,
    type,
}: TableHomepageCarouselFormProps): React.ReactElement => (
    <>
        <td>
            <Input
                variant="regular"
                input={{
                    id: 'href',
                    value: prevValue.href ?? '',
                    setValue,
                    prevValue,
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
                    isChecked: type === 'add' ? false : prevValue?.target ?? false,
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
        <td>
            <Input
                variant="regular"
                input={{
                    id: 'title',
                    value: prevValue.title ?? '',
                    setValue,
                    prevValue,
                }}
            />
        </td>
        <td>
            <Input
                variant="regular"
                input={{
                    id: 'imageDesktop',
                    value: prevValue.imageDesktop ?? '',
                    setValue,
                    prevValue,
                }}
            />

            <Input
                variant="regular"
                input={{
                    id: 'imageMobile',
                    value: prevValue.imageMobile ?? '',
                    setValue,
                    prevValue,
                }}
            />
        </td>
    </>
);

export default TableHomepageCarouselForm;
