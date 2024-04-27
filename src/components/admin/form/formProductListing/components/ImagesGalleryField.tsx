import React from 'react';

import type { ClassnameArrayProps, InputHookRegisterProps } from '@/libs/@types';
import { COMMON_ADMIN, GLOBAL_MESSAGE } from '@/libs/data';
import { joinClassnameString } from '@/libs/utils';

import type { FieldErrors } from 'react-hook-form';
import { CiTrash } from 'react-icons/ci';
import { Col, Row } from 'react-bootstrap';

import Input from '@/components/common/input/Input';
import Button, { ButtonWrapper } from '@/components/common/button/Button';

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
    limit: number;
    events: {
        onAddHandler: (e: React.FormEvent<HTMLButtonElement>) => void;
        onImageRemoveHandler: (e: React.FormEvent<HTMLButtonElement>, item: number) => void;
    };
};

const ImagesGalleryField = ({ items, limit, hooks, events }: ImagesGalleryProps): React.ReactElement => {
    const gutterClass: string = joinClassnameString([COMMON_ADMIN.GUTTER, COMMON_ADMIN.SPACING, 'align-items-end']);
    let labelClass: ClassnameArrayProps = ['input-group--regular'];
    if (items?.length === 0) labelClass.push('py-1');
    labelClass = joinClassnameString(labelClass);

    const button = (
        <Button
            variant="outline"
            type="button"
            events={{ onClick: events.onAddHandler }}
            disabled={items.length >= limit}>
            Add Image Gallery
        </Button>
    );

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <div className={labelClass}>
                        <label>Image Gallery</label>
                    </div>
                </Col>
                {items?.length > 0 && <Col md="auto">{button}</Col>}
            </Row>

            {items?.length > 0 ? (
                items.map((item: ImagesGalleryItemProps, i: number) => {
                    const order = i + 1;
                    const desktopId = `${COMMON_ADMIN.KEY.GALLERY.DESKTOP}_${item.id}`;
                    const mobileId = `${COMMON_ADMIN.KEY.GALLERY.MOBILE}_${item.id}`;

                    return (
                        <Row
                            className={gutterClass}
                            key={i}>
                            <Col>
                                <Input
                                    variant="regular"
                                    label={`Image Gallery Desktop ${order}`}
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
                                    label={`Image Gallery Mobile ${order}`}
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
                                    events={{ onClick: (e) => events.onImageRemoveHandler(e, item.id) }}>
                                    <CiTrash size={24} />
                                </Button>
                            </Col>
                        </Row>
                    );
                })
            ) : (
                <>{button}</>
            )}
        </>
    );
};

export default ImagesGalleryField;
