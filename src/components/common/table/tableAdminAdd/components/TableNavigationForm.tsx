'use client';

import React, { useState } from 'react';
import slugify from 'react-slugify';

import Input from '@/components/common/input/Input';

export type TableNavigationFormProps = {};

const TableNavigationForm = ({}: TableNavigationFormProps): React.ReactElement => {
    const [navigationForm, setNavigationForm] = useState<any>({
        label: '',
        openNewTab: '',
    });

    return (
        <>
            <td>
                <Input
                    variant="regular"
                    input={{
                        id: 'label',
                        type: 'text',
                        prevValue: navigationForm,
                        value: navigationForm.label,
                        setValue: setNavigationForm,
                    }}
                />
            </td>
            <td>
                <Input
                    variant="regular"
                    input={{
                        id: 'href',
                        type: 'text',
                        value: `/${slugify(navigationForm.label)}`,
                        isDisabled: true,
                    }}
                />
            </td>
            <td>
                {/*<select*/}
                {/*    id="openNewTab"*/}
                {/*    name="openNewTab"*/}
                {/*    className="form-select">*/}
                {/*    <option selected>Open this select menu</option>*/}
                {/*    <option value="1">One</option>*/}
                {/*    <option value="2">Two</option>*/}
                {/*    <option value="3">Three</option>*/}
                {/*</select>*/}

                <Input
                    variant="regular"
                    input={{
                        type: 'switch',
                        color: 'primary',
                        id: 'target',
                    }}
                />
            </td>
            <td>
                <Input
                    variant="regular"
                    input={{
                        type: 'switch',
                        color: 'primary',
                        id: 'is_show',
                    }}
                />
            </td>
        </>
    );
};

export default TableNavigationForm;
