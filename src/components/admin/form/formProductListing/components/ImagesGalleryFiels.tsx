import React from 'react';

import { GLOBAL_MESSAGE } from '@/libs/data';
import type { InputHookRegisterProps } from '@/libs/@types';

import type { FieldErrors } from 'react-hook-form';
import { CiTrash } from 'react-icons/ci';
import { Col, Row } from 'react-bootstrap';

import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';

export type ImagesGalleryItemProps = {
    id: number;
    desktop: string;
    mobile: string;
};

export type ImagesGalleryProps = {
    items: ImagesGalleryItemProps[];
    hooks: {
        errors: FieldErrors<any>;
    } & InputHookRegisterProps;
    events: {
        onClick: (e: React.FormEvent<HTMLButtonElement>, item: number) => void;
    };
};

const ImagesGalleryField = ({ items, hooks, events }: ImagesGalleryProps): React.ReactElement => {
    const gutterClass: string = 'gy-3 gx-1 mb-2';
    const imageGalleryKeys = {
        desktop: 'imageGalleryDesktop',
        mobile: 'imageGalleryMobile',
    };

    if (items.length === 0) return <></>;

    return (
        <>
            {items.map((item: ImagesGalleryItemProps, i: number) => {
                const desktopId = `${imageGalleryKeys.desktop}_${item.id}`;
                const mobileId = `${imageGalleryKeys.mobile}_${item.id}`;

                return (
                    <Row
                        className={`${gutterClass} align-items-end`}
                        key={i}>
                        <Col>
                            <Input
                                variant="regular"
                                label="Image Gallery Desktop"
                                input={{
                                    id: desktopId,
                                    type: 'text',
                                    value: item?.desktop ?? '',
                                    hook: { register: hooks.register, options: { required: true } },
                                }}
                                validation={{
                                    isError: !!hooks.errors?.[desktopId],
                                    message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                                }}
                            />
                        </Col>
                        <Col>
                            <Input
                                variant="regular"
                                label="Image Gallery Mobile"
                                input={{
                                    id: mobileId,
                                    type: 'text',
                                    value: item?.mobile ?? '',
                                    hook: { register: hooks.register, options: { required: true } },
                                }}
                                validation={{
                                    isError: !!hooks.errors?.[mobileId],
                                    message: GLOBAL_MESSAGE.ERROR_REQUIRED,
                                }}
                            />
                        </Col>
                        <Col lg="auto">
                            <Button
                                variant="outline"
                                type="button"
                                events={{ onClick: (e) => events.onClick(e, item.id) }}>
                                <CiTrash size={24} />
                            </Button>
                        </Col>
                    </Row>
                );
            })}
        </>
    );
};

export default ImagesGalleryField;
