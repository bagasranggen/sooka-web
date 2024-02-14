'use client';

import React, { Suspense, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavigationItemProps } from '@/libs/@types';
import { NAVIGATION_TRANSPARENT } from '@/libs/mock';
import { getActivePath, joinClassnameString, NavigationEvents } from '@/libs/utils';

import { useMeasure, useMouseWheel, useWindowScroll } from 'react-use';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Button from '@/components/common/button/Button';
import Offcanvas from '@/components/layout/offcanvas/Offcanvas';
import Icon from '@/components/common/icon/Icon';

export type NavigationProps = {
    items: NavigationItemProps[]
};

const Navigation = ({ items }: NavigationProps): React.ReactElement => {
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
                if (transform >= (navbarHeight * -1) && yScroll > 0) setTransform((prev: number) => isCenter ? navbarHeight * -1 : prev + movement);
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
        ...((transform === 0 || isCenter) && yScroll > 0) ? { '--transition': 'transform' } : {},
    } as React.CSSProperties;

    return <>
        <Suspense
            fallback={null}>
            <NavigationEvents endHandler={() => setShow(false)} />
        </Suspense>

        <Navbar
            className={navbarClass}
            ref={navRef as unknown as React.RefObject<HTMLElement>}
            expand="lg"
            fixed="top"
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
                    event={{ onClick: () => setShow(!show) }}
                    title="Mobile Toggle Button" />
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        {items.map((nav: NavigationItemProps, i: number) => {
                            return <Nav.Link
                                key={i}
                                as={Link}
                                href={nav.href as string}
                                {...nav.target ? { target: nav.target } : {}}
                                active={nav.href === active}>{nav.label}</Nav.Link>;
                        })}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Offcanvas
            variant="navigation"
            items={items}
            state={{ show, setShow }} />
    </>;
};

export default Navigation;