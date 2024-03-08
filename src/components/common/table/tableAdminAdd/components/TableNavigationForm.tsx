'use client';

import React, { useState } from 'react';
import slugify from 'react-slugify';

export type TableNavigationFormProps = {};

const TableNavigationForm = ({}: TableNavigationFormProps): React.ReactElement => {
    const [navigationForm, setNavigationForm] = useState<any>({
        label: '',
    });

    return (
        <>
            <td>
                <input
                    id="label"
                    name="slug"
                    type="text"
                    className="form-control"
                    value={navigationForm.label}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNavigationForm({ ...navigationForm, ...{ label: e.target.value } })
                    }
                />
            </td>
            <td>
                <input
                    id="slug"
                    name="slug"
                    type="text"
                    className="form-control"
                    value={slugify(navigationForm.label)}
                    disabled
                />
            </td>
        </>
    );
};

export default TableNavigationForm;
