"use client"
import Logo from '@/components/icons/Logo';
import { useSupabase } from '@/components/supabase-provider';
import { Transition } from '@headlessui/react';
import { Session } from '@supabase/supabase-js';
import { LogIn, LogOut, LucideIcon, UserCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { LocaleSelector } from './LocaleSelector';
import { TopBar } from './TopBar';
import { TopBarItems } from './TopbarItems';

export interface NavLink {
  name: 'prepare' | 'copilot' | "jobs" | "cv";
  href: string;
}

export const navLinks: NavLink[] = [
  { name: 'prepare', href: '/prepare' },
  { name: 'copilot', href: '/copilot' },
  { name: 'jobs', href: '/jobs' },
  { name: 'cv', href: '/cv' },
];


export default function Header({ session }) {
  const t = useTranslations('layout');
  let sideNavLinks: [string, LucideIcon][] = [];
  if (session) {
    sideNavLinks = [['/account', UserCircle2], ['/signout', LogOut]];
  }
  else {
    sideNavLinks = [['/signin', LogIn]]
  }


  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>();

  const handleShowMenu = (navLink: NavLink) => setHoveredNavLink(navLink);
  const handleCloseMenu = () => setHoveredNavLink(null);

  return (
    <header>
      <TopBar />
      <div className="relative h-14 bg-zinc-900">
        <div className="mx-auto flex h-full items-center px-4 xl:container">
          <div className="mr-5 flex shrink-0 items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <ul className="ml-auto hidden h-full md:flex">
            {navLinks.map((item, index) => (
              <li
                className={`font-medium text-purple-500 transition-colors ${hoveredNavLink === item && 'bg-zinc-800 '
                  }`}
                key={index}
                onMouseEnter={() => handleShowMenu(item)}
                onMouseLeave={handleCloseMenu}
              >
                <Link
                  href={item.href}
                  className="flex h-full items-center px-5"
                  onClick={handleCloseMenu}
                >
                  {t(item.name)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="md:hidden ml-auto flex justify-end">
            <TopBarItems />
            <LocaleSelector />
          </ul>
          <ul className="ml-auto items-center md:flex">
            {sideNavLinks.map(([url, Icon]) => (
              <Link key={url} href={url} className="ml-5 block">
                <Icon
                  className="text-purple-500 transition-colors hover:text-violet-700"
                  size="20px"
                />
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <BottomNavigation />
    </header>
  );
};
