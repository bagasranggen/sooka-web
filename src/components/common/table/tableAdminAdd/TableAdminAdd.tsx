import React from 'react';

import type { SupabaseVariantProps } from '@/libs/fetcher';
import { TABLE_FORM_HANDLES, TABLE_VARIANTS } from '@/libs/handles';
import { createDynamicElement } from '@/libs/factory';

export type TableAdminAddProps = {
    variant: typeof TABLE_VARIANTS.ADMIN_ADD;
    type: SupabaseVariantProps;
    header: string[];
    events?: {
        onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    };
};

const TableAdminAdd = ({ header, type, events }: TableAdminAddProps): React.ReactElement => (
    <form onSubmit={events?.onSubmit}>
        <table className="table table-responsive">
            <thead>
                <tr>
                    {header.map((header: string, i: number) => {
                        if (header !== 'id') return <th key={i}>{header}</th>;
                    })}
                    <th
                        className="text-center"
                        style={{ width: '60px' }}>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {createDynamicElement({
                        handles: TABLE_FORM_HANDLES,
                        selector: type,
                        props: {},
                    })}
                    <td>
                        <button
                            className="btn btn-outline-success"
                            type="submit">
                            Submit
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
);

export default TableAdminAdd;
