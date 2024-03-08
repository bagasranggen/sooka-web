import React from 'react';

import { TABLE_VARIANTS } from '@/libs/handles';

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
    <table className="table table-responsive">
        <thead>
            <tr>
                {header.map((header: string, i: number) => {
                    if (header !== 'id') return <th key={i}>{header}</th>;
                })}
                <th
                    className="text-center"
                    style={{ width: '100px' }}>
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
                                if (keys !== 'id') return <td key={`${keys}${i}`}>{datum[keys]}</td>;
                            })}
                            <td>
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="btn btn-outline-warning"
                                        // onClick={() => events?.onDelete && events.onDelete(datum.id)}
                                    >
                                        edit
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => events?.onDelete && events.onDelete(datum.id)}>
                                        delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </>
            )}
        </tbody>
    </table>
);

export default TableAdmin;
