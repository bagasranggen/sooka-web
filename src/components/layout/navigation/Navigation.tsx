'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavigationItemProps } from '@/libs/@types';
import { NAVIGATION, NAVIGATION_TRANSPARENT } from '@/libs/mock';
import { getActivePath, NavigationEvents } from '@/libs/utils';

import { useMeasure } from "react-use";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import Button from '@/components/common/button/Button';
import Offcanvas from "@/components/layout/offcanvas/Offcanvas";
import Icon from "@/components/common/icon/Icon";

export type NavigationProps = {};

const Navigation = ({}: NavigationProps): React.ReactElement => {
    const pathname = usePathname();
    const active = getActivePath(pathname);
    const isTransparent = NAVIGATION_TRANSPARENT.includes(active);

    const [ show, setShow ] = useState<boolean>(false);
    const [ navRef, { height, y, bottom } ] = useMeasure();
    const navbarHeight = height + (y * 2);

    return <>
        <NavigationEvents endHandler={() => setShow(false)} />

        <Navbar
            className={show ? 'navbar--open' : ''}
            ref={navRef as unknown as React.RefObject<HTMLElement>}
            expand="lg"
            {...{ [isTransparent ? 'fixed' : 'sticky']: 'top' }}
            data-bs-theme="light"
            bg={(isTransparent && !show) ? 'transparent' : 'primary'}>
            <Container>
                <Navbar.Brand
                    as={Link}
                    href="/">
                    <Icon
                        variant="sooka"
                        color={(isTransparent && !show) ? "primary" : 'light'} />
                </Navbar.Brand>
                <Button
                    variant="nav-toggle"
                    color="light"
                    className="d-lg-none"
                    isOpen={show}
                    event={{ onClick: () => setShow(!show) }} />
                {/*<Navbar.Toggle*/}
                {/*    onClick={() => {*/}
                {/*        console.log('click');*/}
                {/*    }} />*/}
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        {NAVIGATION.map((nav: NavigationItemProps, i: number) => {
                            return <Nav.Link
                                key={i}
                                as={Link}
                                href={nav.href as string}
                                active={nav.href === active}>{nav.label}</Nav.Link>;
                        })}
                        {/*<NavDropdown
                        title="Dropdown"
                        id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Offcanvas
            variant="navigation"
            items={NAVIGATION}
            state={{ show, setShow }}
            option={{ style: { top: navbarHeight } }} />
    </>;
};

export default Navigation;