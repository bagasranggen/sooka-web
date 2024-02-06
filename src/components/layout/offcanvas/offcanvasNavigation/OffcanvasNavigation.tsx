import React from 'react';
import Link from "next/link";

import { OFFCANVAS_VARIANTS } from "@/libs/handles/offcanvas";
import type { NavigationItemProps } from "@/libs/@types";

import { Offcanvas } from "react-bootstrap";

export type OffcanvasNavigationProps = {
    variant: typeof OFFCANVAS_VARIANTS.NAVIGATION;
    items: NavigationItemProps[];
    state: {
        show: boolean;
        setShow: React.Dispatch<React.SetStateAction<OffcanvasNavigationProps['state']['show']>>
    };
    option?: {
        style?: React.CSSProperties;
    };
};

const OffcanvasNavigation = ({ option, state, items }: OffcanvasNavigationProps): React.ReactElement => (
    <Offcanvas
        className="offcanvas--navigation"
        show={state.show}
        backdrop={false}
        onHide={() => state.setShow(!state.show)}
        style={option?.style}>
        <Offcanvas.Body>
            <ul className="list-unstyled">
                {items.map((nav: NavigationItemProps, i: number) => {
                    return <li key={i}>
                        <Link href={nav.href}>{nav.label}</Link>
                    </li>;
                })}
            </ul>
        </Offcanvas.Body>
    </Offcanvas>
);

export default OffcanvasNavigation;