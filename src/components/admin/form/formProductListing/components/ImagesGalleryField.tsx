import React from 'react';

import { COMMON_ADMIN, GLOBAL_MESSAGE } from '@/libs/data';
import type { InputHookRegisterProps } from '@/libs/@types';
import { joinClassnameString } from '@/libs/utils';

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
    const gutterClass: string = joinClassnameString([COMMON_ADMIN.GUTTER, COMMON_ADMIN.SPACING, 'align-items-end']);

    if (items.length === 0) return <></>;

    return (
        <>
            {items.map((item: ImagesGalleryItemProps, i: number) => {
                const desktopId = `${COMMON_ADMIN.KEY.GALLERY.DESKTOP}_${item.id}`;
                const mobileId = `${COMMON_ADMIN.KEY.GALLERY.MOBILE}_${item.id}`;

                return (
                    <Row
                        className={gutterClass}
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
