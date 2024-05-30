import React from 'react';
import Link from 'next/link';

import { type GlobalInfoSocialState, reduxStore } from '@/store/redux';

import { Col, Container, Row } from 'react-bootstrap';
import * as CiIcon from 'react-icons/ci';

import Icon from '@/components/common/icon/Icon';

export type FooterProps = {};

const Footer = ({}: FooterProps): React.ReactElement => {
    const { globalInfo } = reduxStore.getState();

    return (
        <footer className="footer">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={11}>
                        <div className="footer__logo">
                            <Icon
                                variant="sooka"
                                color="light"
                            />
                        </div>

                        <div className="mt-3 mt-lg-5">
                            <Row className="justify-content-center justify-content-sm-between align-items-center text-center text-sm-start gy-2">
                                <Col sm="auto">
                                    <div className="footer__address">
                                        <p>{globalInfo.storeInfo.address}</p>
                                        <p>{globalInfo.storeInfo.openHour}</p>
                                    </div>
                                </Col>
                                <Col sm="auto">
                                    <ul className="list-inline">
                                        {globalInfo.socialMedia.map((footer: GlobalInfoSocialState, i: number) => {
                                            const RIcon = CiIcon[footer.icon as keyof typeof CiIcon];

                                            return (
                                                <li
                                                    key={i}
                                                    className="list-inline-item">
                                                    <Link
                                                        href={footer?.href ?? ''}
                                                        target="_blank"
                                                        title={footer.label}>
                                                        <RIcon fontSize={30} />
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
