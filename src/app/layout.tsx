import React, { Suspense } from 'react';
import type { Metadata } from 'next';

import '@fontsource/mulish';
import '@fontsource/mulish/200.css';
import '@fontsource/mulish/300.css';
import '@fontsource/mulish/600.css';
import '@fontsource/mulish/700.css';

import '../assets/styles/scss/bootstrap.scss';
import '../assets/styles/scss/main.scss';

import { axiosClient } from "@/libs/fetcher";
import { GOOGLE_SPREADSHEET_VARIANT } from "@/libs/handles";
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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const { layout } = reduxStore.getState();
    const { data: { data: navigation } } = await axiosClient().get(GOOGLE_SPREADSHEET_VARIANT.NAVIGATION);

    return (
        <html lang="en">
        <body
            suppressHydrationWarning={true}
            {...layout.height && { style: layout.height } as React.HTMLAttributes<HTMLElement>}>
        <Providers>
            <Navigation items={navigation} />
            <Suspense fallback={null}>
                <MainLayout>{children}</MainLayout>
            </Suspense>
            <Footer />
        </Providers>
        </body>
        </html>
    );
}
