"use client"
import { Instagram, LucideIcon, Send, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const socialMedias: [LucideIcon, string][] = [
  [Instagram, 'https://instagram.com'],
  [Twitter, 'https://twitter.com'],
  [Send, 'https://telegram.com'],
];

export default function Footer() {
  const t = useTranslations('layout');

  const footerLinks = [
    {
      label: t('company'),
      links: [
        [t('roadmap'), '/roadmap'],
        [t('termsOfUse'), '/terms-of-use'],
        [t('privacyPolicy'), '/privacy-policy'],
        [t('about'), '/about'],
      ],
    },
    {
      label: t('contact'),
      links: [
        [t('feedback'), '/roadmap'],
        [t('support'), '/roadmap'],
        [t('idea'), '/roadmap'],
        [t('bussiness'), '/roadmap'],
      ],
    },
  ];

  return (
    <footer className="mb-16 bg-zinc-900 md:mb-0">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-1">
            {/* <Link href="/">
              <Image
                priority
                src="/logo.png"
                alt="kara shop logo"
                width={100}
                height={35}
                quality={100}
              />
            </Link>
            <p className="py-4 text-sm font-normal text-neutral-500">
              {t('interviewCopilot')}
            </p> */}
            <div className="my-5 flex justify-center md:justify-start">
              {socialMedias.map(([Icon, href], i) => (
                <Link
                  key={i}
                  href={href}
                  target="_blank"
                  className="mr-2 rounded-md text-zinc-500 border-2  border-zinc-500 p-2 hover:text-purple-500 hover:border-purple-500"
                >
                  <Icon size={30} />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-5 flex md:mt-0 md:flex-[2] justify-around md:justify-between">
            {footerLinks.map(({ label, links }) => (
              <div key={label} className="flex flex-col">
                <strong className="mb-5 text-xl font-bold">
                  {label}
                </strong>
                <ul className="flex flex-col gap-2 text-xs font-normal text-neutral-500 md:text-sm">
                  {links.map(([label, href], i) => (
                    <Link
                      key={i}
                      href={href}
                      className="transition hover:text-purple-500"
                    >
                      {label}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-neutral-100">
        <div className="mx-auto max-w-7xl px-2 py-3">
          <div className="flex flex-col items-center justify-between gap-3 text-xs font-medium text-neutral-700 md:flex-row">
            <p>{t('copyright')}</p>
            {/* <Link href="https://github.com/andyvauliln/interviewscopilot" target="_blank">
              <BsGithub size="1.25rem" />
            </Link> */}
            <p>
              {`${t('createdBy')} `}
              <strong>
                <Link href="https://github.com/andyvauliln" target="_blank">
                  Vaulin.A
                </Link>
              </strong>
              {'. '}
              {t('reserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
