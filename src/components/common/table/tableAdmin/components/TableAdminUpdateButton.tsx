import React from 'react';
import { COMMON_REGEX } from '@/libs/data';

import type { RenderTableAdminDataProps } from '@/components/common/table/tableAdmin/components/TableRenderData';
import type { InputTextProps } from '@/components/common/input/inputShared/InputText';

import {
    CiCircleCheck,
    CiCircleChevDown,
    CiCircleChevUp,
    CiCircleRemove,
    CiEdit,
    CiLineHeight,
    CiTrash,
} from 'react-icons/ci';

import Button, { ButtonGroup } from '@/components/common/button/Button';
import Input from '@/components/common/input/Input';

export type TableAdminUpdateButtonProps = {
    hasOpenDetail: boolean;
    isOpenDetail: boolean;
    isReorder: boolean;
    isEditState?: {
        setValue?: InputTextProps['setValue'];
        prevValue?: InputTextProps['prevValue'];
    };
    events?: {
        onDelete?: (id: number) => void;
        onEdit?: (index: number | undefined) => void;
        onEditReorder?: (index: number | undefined) => void;
        onOpenDetail?: (index: number | undefined) => void;
    };
} & Pick<RenderTableAdminDataProps, 'datum' | 'isEdit' | 'index'>;

const TableAdminUpdateButton = ({
    datum,
    index,
    isEdit,
    isEditState,
    isReorder,
    isOpenDetail,
    hasOpenDetail,
    events,
}: TableAdminUpdateButtonProps) => {
    return (
        <td
            className="text-center"
            rowSpan={isOpenDetail ? 2 : 1}>
            <ButtonGroup>
                {!isEdit && !isReorder && (
                    <Button
                        variant="base"
                        type="button"
                        className="btn btn-outline-warning"
                        title="edit"
                        events={{
                            onClick: () => events?.onEdit && events.onEdit(index),
                        }}>
                        <CiEdit size={24} />
                    </Button>
                )}

                {(isEdit || isReorder) && (
                    <Button
                        variant="base"
                        type="submit"
                        className="btn btn-outline-success"
                        title="submit">
                        <CiCircleCheck size={24} />
                    </Button>
                )}

                {hasOpenDetail && (
                    <Button
                        variant="base"
                        type="button"
                        className="btn btn-outline-info"
                        title="detail"
                        events={{
                            onClick: () => events?.onOpenDetail && events.onOpenDetail(index),
                        }}>
                        {isOpenDetail ? <CiCircleChevUp size={24} /> : <CiCircleChevDown size={24} />}
                    </Button>
                )}

                {isReorder ? (
                    <div
                        className="btn btn-outline-primary p-0"
                        data-order={index}
                        style={{
                            width: '40px',
                            background: 'white',
                        }}>
                        <Input
                            variant="regular"
                            className="border-0 text-center"
                            input={{
                                id: 'order',
                                value: isEditState?.prevValue?.order ?? '',
                                setValue: isEditState?.setValue,
                                prevValue: isEditState?.prevValue,
                                pattern: COMMON_REGEX.NUMBER_VALIDATION,
                                type: 'number',
                            }}
                        />
                    </div>
                ) : (
                    <Button
                        variant="base"
                        type="button"
                        className="btn btn-outline-primary"
                        title="re-order"
                        events={{
                            onClick: () => events?.onEditReorder && events.onEditReorder(index),
                        }}>
                        <CiLineHeight size={24} />
                    </Button>
                )}

                <Button
                    variant="base"
                    type="button"
                    className="btn btn-outline-danger"
                    title="cancel"
                    events={{
                        onClick: () => {
                            // Event Delete Data
                            if (!isEdit && !isReorder && !isOpenDetail) {
                                events?.onDelete && events.onDelete(datum.id);
                            }

                            // Event Cancel Editing
                            if (isEdit) {
                                events?.onEdit && events.onEdit(undefined);
                            }
                            if (isReorder) {
                                events?.onEditReorder && events.onEditReorder(undefined);
                            }
                            if (isOpenDetail) {
                                events?.onOpenDetail && events.onOpenDetail(undefined);
                            }
                        },
                    }}>
                    {isEdit || isReorder || isOpenDetail ? <CiCircleRemove size={24} /> : <CiTrash size={20} />}
                </Button>
            </ButtonGroup>
        </td>
    );
};

export default TableAdminUpdateButton;
