import { createServerSupabaseClient } from '@/app/supabase-server';
import Link from 'next/link';


import Logo from '@/components/icons/Logo';
import SignOutButton from './SignOutButton';

import MobileMenu from './MobileMenu';
import s from './Navbar.module.css';

export default async function Navbar() {


  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  console.log('user Navbar', user);


  return (
    <nav className={`bg-gray-900 text-white ${s.root}`}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
            <MobileMenu user={user} />
          </div>
          <div className="hidden md:flex md:items-center md:justify-end md:flex-1 md:space-x-8">
            {user ? (
              <SignOutButton />
            ) : (
                <Link href="/signin" className={s.link}>
                  Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
