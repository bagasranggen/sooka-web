import React from 'react';
import type { Metadata } from 'next';

import '@fontsource/mulish';
import '@fontsource/mulish/200.css';
import '@fontsource/mulish/300.css';
import '@fontsource/mulish/600.css';
import '@fontsource/mulish/700.css';

import '../assets/styles/scss/bootstrap.scss';
import '../assets/styles/scss/main.scss';

import type { NavigationItemProps } from '@/libs/@types';
import { supabaseServerAction } from '@/libs/fetcher';
import { Providers, reduxStore } from '@/store/redux';

import Navigation from '@/components/layout/navigation/Navigation';
import Footer from '@/components/layout/footer/Footer';
import MainLayout from '@/components/layout/mainLayout/MainLayout';

export const metadata: Metadata = {
    title: {
        template: '%s | Sooka Baked Goods',
        default: 'Sooka Baked Goods',
    },
    description: 'Generated by create next app',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const { layout } = reduxStore.getState();
    const { data: navigation } = await supabaseServerAction({
        variant: 'fetch',
        relation: 'navigation',
    });

    return (
        <html lang="en">
            <body
                suppressHydrationWarning={true}
                {...(layout.height && ({ style: layout.height } as React.HTMLAttributes<HTMLElement>))}>
                <Providers>
                    <Navigation items={navigation as NavigationItemProps[]} />
                    <MainLayout>{children}</MainLayout>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}

export const revalidate = 60;
