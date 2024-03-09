import React from 'react';

import { SUPABASE_COLUMN_NAME_HANDLES, TABLE_VARIANTS } from '@/libs/handles';
import { CiCircleCheck, CiCircleRemove, CiEdit, CiTrash } from 'react-icons/ci';
import Button, { ButtonGroup } from '@/components/common/button/Button';

export type TableAdminBodyProps = {
    [key: string]: string | any | null;
};

export type TableAdminProps = {
    variant: typeof TABLE_VARIANTS.ADMIN;
    header: string[];
    body: any;
    events?: {
        onDelete?: (id: number) => void;
    };
};

const TableAdmin = ({ header, body, events }: TableAdminProps): React.ReactElement => (
    <table className="table table-responsive table--admin">
        <thead>
            <tr>
                {header.map((header: string, i: number) => {
                    const handle: { label: string; size?: string } =
                        SUPABASE_COLUMN_NAME_HANDLES?.[header as keyof typeof SUPABASE_COLUMN_NAME_HANDLES];

                    if (header !== 'id')
                        return (
                            <th
                                key={i}
                                {...(handle?.size ? { style: { width: handle.size }, className: 'text-center' } : {})}>
                                {handle?.label ?? header}
                            </th>
                        );
                })}
                <th
                    className="text-center"
                    style={{ width: '80px' }}>
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {body.length === 0 ? (
                <td
                    className="text-center"
                    colSpan={header.length}>
                    <h5 className="mb-0">No data found</h5>
                </td>
            ) : (
                <>
                    {body?.map((datum: any, i: number) => (
                        <tr key={i}>
                            {Object.keys(datum).map((keys: string) => {
                                let value = datum[keys];
                                if (value === true) value = <CiCircleCheck size={30} />;
                                if (value === false) value = <CiCircleRemove size={30} />;

                                const tdClass = typeof datum[keys] === 'boolean' ? 'text-center' : '';

                                if (keys !== 'id')
                                    return (
                                        <td
                                            key={`${keys}${i}`}
                                            {...(tdClass ? { className: tdClass } : {})}>
                                            {value}
                                        </td>
                                    );
                            })}
                            <td className="text-center">
                                <ButtonGroup>
                                    <Button
                                        variant="base"
                                        type="button"
                                        className="btn btn-outline-warning">
                                        <CiEdit size={24} />
                                    </Button>
                                    <Button
                                        variant="base"
                                        type="button"
                                        className="btn btn-outline-danger"
                                        events={{ onClick: () => events?.onDelete && events.onDelete(datum.id) }}>
                                        <CiTrash size={20} />
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </>
            )}
        </tbody>
    </table>
);

export default TableAdmin;
