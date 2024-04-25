import React from 'react';

import { TABLE_VARIANTS } from '@/libs/handles';
import { responsivePropType } from 'react-bootstrap/createUtilityClasses';
import Button, { ButtonGroup } from '@/components/common/button/Button';
import { CiCircleCheck, CiEdit } from 'react-icons/ci';

export type TableAdminHeadItemProps = {
    label: string;
    slug: string;
};

export type TableAdminHeadProps = {
    items: TableAdminHeadItemProps[];
};

export type TableAdminBodyProps = {
    entries: any;
    items: TableAdminHeadItemProps[];
};

export type TableAdminViewProps = {
    variant: typeof TABLE_VARIANTS.ADMIN_VIEW;
    head: TableAdminHeadItemProps[];
    body: TableAdminBodyProps['entries'];
};

const TableAdminAction = () => {
    return (
        <td className="text-center">
            <ButtonGroup>
                <Button
                    variant="base"
                    type="anchor"
                    className="btn btn-outline-warning"
                    title="edit"
                    href={'/'}>
                    <CiEdit size={24} />
                </Button>
                <Button
                    variant="base"
                    type="submit"
                    className="btn btn-outline-success"
                    title="submit">
                    <CiCircleCheck size={24} />
                </Button>
            </ButtonGroup>
        </td>
    );
};

const TableAdminHead = ({ items }: TableAdminHeadProps) => {
    return (
        <thead>
            <tr>
                {items.map((item: TableAdminHeadItemProps, i: number) => {
                    return <th key={i}>{item.label}</th>;
                })}
                <th>Action</th>
            </tr>
        </thead>
    );
};

const TableAdminBody = ({ entries, items }: TableAdminBodyProps) => {
    return (
        <tbody>
            {entries?.map((entry: any, i: number) => {
                return (
                    <tr key={i}>
                        {items.map((item: TableAdminHeadItemProps, i: number) => {
                            return <td key={i}>{entry?.[item.slug as keyof object]}</td>;
                        })}
                        <TableAdminAction />
                    </tr>
                );
            })}
        </tbody>
    );
};

const TableAdminView = ({ head, body }: TableAdminViewProps): React.ReactElement => {
    return (
        <div className="table-responsive">
            <table className="table">
                <TableAdminHead items={head} />
                <TableAdminBody
                    entries={body}
                    items={head}
                />
            </table>
        </div>
    );
};

export default TableAdminView;
