import React from 'react';

import { Modal } from 'react-bootstrap';
import { MODAL_VARIANTS } from '@/libs/handles';
import { CommonModalProps } from '@/components/common/modal/Modal';
import Button, { ButtonGroup } from '@/components/common/button/Button';

export type ModalConfirmationProps = {
    variant: typeof MODAL_VARIANTS.CONFIRM;
    events?: {
        onConfirm: () => void;
    };
} & CommonModalProps;

const ModalConfirmation = ({ events }: ModalConfirmationProps): React.ReactElement => {
    return (
        <>
            <Modal.Header closeButton>{/*<Modal.Title>Modal heading</Modal.Title>*/}</Modal.Header>
            <Modal.Body className="text-center">
                <h4 className="fw-light fs-40 mb-2">Are you sure?</h4>
                <p className="">Do you really want to remove this item? This process cannot be undone.</p>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <ButtonGroup className="justify-content-center">
                    <Button
                        variant="rounded"
                        type="button"
                        color="light"
                        events={{ onClick: events?.onHide }}>
                        Cancel
                    </Button>
                    <Button
                        variant="rounded"
                        type="button"
                        events={{ onClick: events?.onConfirm }}>
                        Proceed
                    </Button>
                </ButtonGroup>
            </Modal.Footer>
        </>
    );
};

export default ModalConfirmation;
