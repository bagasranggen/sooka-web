import React from 'react';

import type { SupabaseVariantProps } from '@/libs/fetcher';
import type { SupabaseHeaderProps } from '@/libs/data';

import { TABLE_FORM_HANDLES, TABLE_VARIANTS } from '@/libs/handles';
import { createDynamicElement } from '@/libs/factory';

import { CiCircleCheck } from 'react-icons/ci';
import Button from '@/components/common/button/Button';
import { InputTextProps } from '@/components/common/input/inputShared/inputText';

export type TableAdminAddProps = {
    variant: typeof TABLE_VARIANTS.ADMIN_ADD;
    type: SupabaseVariantProps;
    header: SupabaseHeaderProps[];
    stateData: Pick<InputTextProps, 'prevValue' | 'setValue'>;
    events?: {
        onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    };
};

const TableAdminAdd = ({ header, type, events, stateData }: TableAdminAddProps): React.ReactElement => (
    <form onSubmit={events?.onSubmit}>
        <table className="table table-responsive table--admin">
            <thead>
                <tr>
                    {header.map((header: SupabaseHeaderProps, i: number) => {
                        return (
                            <th
                                key={i}
                                {...(header?.size
                                    ? { style: { width: header.size, minWidth: header.size }, className: 'text-center' }
                                    : {})}>
                                {header?.label}
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
                <tr>
                    {createDynamicElement({
                        handles: TABLE_FORM_HANDLES,
                        selector: type,
                        props: {
                            type: 'add',
                            prevValue: stateData?.prevValue,
                            setValue: stateData?.setValue,
                        },
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
