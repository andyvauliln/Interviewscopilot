import Providers from '@/components/Providers';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import { Toaster } from '@/components/ui/Toast/Toaster';
import { Analytics } from '@vercel/analytics/react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useEffect } from 'react';
//import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
//import { NextIntlClientProvider, useLocale } from 'next-intl';
import {
  getActiveProductsWithPrices,
  getSession,
  getSubscription
} from '@/app/supabase-server';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';
import 'styles/main.css';


const meta = {
  title: 'Interviews Copilot',
  description: 'Helps prepare to interview, find job and provide ai answeres to interview questions in realtime call',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: 'https://interviewscopilot-andyvauliln.vercel.app',
  type: 'website'
};

export const metadata = {
  title: meta.title,
  description: meta.description,
  cardImage: meta.cardImage,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage,
    type: meta.type,
    site_name: meta.title
  },
  twitter: {
    card: 'summary_large_image',
    site: '@interviews_copilot',
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage
  }
};
// export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale)),
//     },
//   };
// };


export default async function LocaleLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children, params: { locale = "en" }
}: PropsWithChildren) {

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;

  } catch (error) {
    console.log(error);

  }
  const session = await getSession();

  // useEffect(() => {
  //   AOS.init({
  //     duration: 500,
  //     once: true,
  //   });
  // }, []);

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale} messages={messages}>
          <Header session={session} />
          <main
            className="min-h-[100dvh]"
          >
            {children}
            <Analytics />
          </main>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
