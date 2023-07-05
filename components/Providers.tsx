'use client'

import { QueryClient, QueryClientProvider, ReactQeuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import React, { FC, ReactNode } from "react";
import SupabaseProvider from './supabase-provider';

interface LayoutProps {
    children: ReactNode,
    locale: string,
    messages: any,
}

const Providers: FC<LayoutProps> = ({ children, locale = "en", messages = {} }) => {


    const queryClient = new QueryClient()
    return (
        <SupabaseProvider>

            <QueryClientProvider client={queryClient}>
                <NextIntlClientProvider locale={locale} messages={messages}>


                    {children}

                    {process.env.NODE_ENV === 'devlopment' ? <ReactQueryDevtools /> : null}
                </NextIntlClientProvider>
            </QueryClientProvider>

        </SupabaseProvider>

    )
}

export default Providers
