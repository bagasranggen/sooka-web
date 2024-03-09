import React from 'react';

import type { SupabaseVariantProps } from '@/libs/fetcher';
import { SUPABASE_COLUMN_NAME_HANDLES, TABLE_FORM_HANDLES, TABLE_VARIANTS } from '@/libs/handles';
import { createDynamicElement } from '@/libs/factory';

import { CiCircleCheck } from 'react-icons/ci';
import Button from '@/components/common/button/Button';

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
        <table className="table table-responsive table--admin">
            <thead>
                <tr>
                    {header.map((header: string, i: number) => {
                        const handle: { label: string; size?: string } =
                            SUPABASE_COLUMN_NAME_HANDLES?.[header as keyof typeof SUPABASE_COLUMN_NAME_HANDLES];

                        if (header !== 'id') return <th key={i}>{handle?.label ?? header}</th>;
                    })}
                    <th
                        className="text-center"
                        style={{ width: '80px' }}>
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
                    <td className="text-center">
                        <Button
                            variant="base"
                            type="submit"
                            className="btn btn-outline-success">
                            <CiCircleCheck size={24} />
                        </Button>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
);

export default TableAdminAdd;
