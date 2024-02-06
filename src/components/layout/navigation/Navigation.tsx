'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavigationItemProps } from '@/libs/@types';
import { NAVIGATION, NAVIGATION_TRANSPARENT } from '@/libs/mock';
import { getActivePath } from '@/libs/utils';

import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export type NavigationProps = {};

const Navigation = ({}: NavigationProps): React.ReactElement => {
    const pathname = usePathname();
    const active = getActivePath(pathname);
    const isTransparent = NAVIGATION_TRANSPARENT.includes(active);

    return <Navbar
        expand="lg"
        {...isTransparent && { fixed: 'top' }}
        data-bs-theme={isTransparent ? 'light' : 'dark'}
        bg="transparent">
        <Container>
            <Navbar.Brand as={Link} href="/">SOOKA</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="ms-auto">
                    {NAVIGATION.map((nav: NavigationItemProps, i: number) => {
                        return <Nav.Link key={i} as={Link} href={nav.href as string} active={nav.href === active}>{nav.label}</Nav.Link>;
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
    </Navbar>;
};

export default Navigation;