'use client';

import React, { Suspense, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavigationItemProps } from '@/libs/@types';
import { NAVIGATION, NAVIGATION_TRANSPARENT } from '@/libs/mock';
import { getActivePath, joinClassnameString, NavigationEvents } from '@/libs/utils';

import { useMeasure, useMouseWheel, useWindowScroll } from 'react-use';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import Button from '@/components/common/button/Button';
import Offcanvas from '@/components/layout/offcanvas/Offcanvas';
import Icon from '@/components/common/icon/Icon';
import { layoutSlice, useDispatch } from '@/store/redux';

export type NavigationProps = {};

const Navigation = ({}: NavigationProps): React.ReactElement => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const active = getActivePath(pathname);
    const isTransparent = NAVIGATION_TRANSPARENT.includes(active);

    const [ show, setShow ] = useState<boolean>(false);
    const [ navRef, { height, y } ] = useMeasure();
    const navbarHeight = height + (y * 2);

    const prevMouseWheel = useRef<number>(0);
    const mouseWheel = useMouseWheel();
    const { y: yScroll } = useWindowScroll();
    const [ transform, setTransform ] = useState<number>(0);
    const isCenter = yScroll > navbarHeight;
    const bgIsTransparent = isTransparent && !show && !isCenter;

    const navbarIsOpenClass = show ? 'navbar--open' : '';
    const navbarIsCenterClass = isCenter ? 'navbar--center' : '';
    const navbarClass = joinClassnameString([ navbarIsOpenClass, navbarIsCenterClass ]);

    useLayoutEffect(() => {
        const movement = prevMouseWheel.current - mouseWheel;
        const direction = movement < 0 ? 'down' : 'up';

        switch (direction) {
            case 'down': // Scroll Down
                if (transform >= (navbarHeight * -1)) setTransform((prev: number) => isCenter ? navbarHeight * -1 : prev + movement);
                break;

            default: // Scroll Up
                if (transform <= 0) setTransform((prev: number) => 0);
                break;
        }

        prevMouseWheel.current = mouseWheel;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ height, mouseWheel ]);

    const style: React.CSSProperties = {
        transform: `translateY(${transform}px)`,
        // ...(transform === 0 || isCenter) ? { '--transition': 'transform' } : {},
    } as React.CSSProperties;

    dispatch(layoutSlice.actions.layoutHeight({ '--navigation-height': `${navbarHeight}px` }));

    return <>
        <Suspense
            fallback={null}>
            <NavigationEvents endHandler={() => setShow(false)} />
        </Suspense>

        <Navbar
            className={navbarClass}
            ref={navRef as unknown as React.RefObject<HTMLElement>}
            expand="lg"
            {...{ [isTransparent ? 'fixed' : 'sticky']: 'top' }}
            data-bs-theme="light"
            bg={bgIsTransparent ? 'transparent' : 'primary'}
            style={style}>
            <Container>
                <Navbar.Brand
                    as={Link}
                    href="/">
                    <Icon
                        variant="sooka"
                        color={bgIsTransparent ? 'primary' : 'light'} />
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
            state={{ show, setShow }} />
    </>;
};

export default Navigation;