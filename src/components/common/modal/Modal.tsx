import React from 'react';

import { MODAL_HANDLES } from '@/libs/handles';
import { createDynamicElement } from '@/libs/factory';

import type { ModalConfirmationProps } from '@/components/common/modal/modalConfirmation/ModalConfirmation';

import { Modal as BSModal, ModalProps as BSModalProps } from 'react-bootstrap';

export type CommonModalProps = {
    options?: {} & Pick<BSModalProps, 'centered'>;
    events?: {} & Pick<BSModalProps, 'onHide'>;
} & Pick<BSModalProps, 'show'>;

export type ModalProps = ModalConfirmationProps;

const Modal = (props: ModalProps): React.ReactElement => {
    return (
        <BSModal
            className={`modal--${props.variant}`}
            show={props.show}
            onHide={props?.events?.onHide}
            {...(props.options?.centered ? { centered: true } : {})}>
            {createDynamicElement({ handles: MODAL_HANDLES, selector: props.variant, props })}
        </BSModal>
    );
};

export default Modal;

export type * from '@/components/common/modal/modalConfirmation/ModalConfirmation';
