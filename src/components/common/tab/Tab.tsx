'use client';

import React from 'react';

import { Tab as ReactTab, Tabs as ReactTabs } from 'react-bootstrap';
import slugify from 'react-slugify';

export type TabItemProps = {
    title: string;
    children: React.ReactNode;
};

export type TabProps = {
    id?: string;
    className?: string;
    items: TabItemProps[];
};

const Tab = ({ id, className, items }: TabProps): React.ReactElement => (
    <ReactTabs
        // defaultActiveKey="home"
        {...(id ? { id: id } : {})}
        // id="test"
        className={className}>
        {items.map((item: TabItemProps, i: number) => (
            <ReactTab
                key={i}
                eventKey={slugify(item.title)}
                title={item.title}
                suppressHydrationWarning>
                {item.children}
            </ReactTab>
        ))}
    </ReactTabs>
);

export default Tab;
