'use client'
import { Bars3Icon, HomeIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';
import s from './Navbar.module.css';

export default function MobileMenu({ user }: any) {
    console.log(user);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="-mr-2 md:hidden">
                <button type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400">
                    {isOpen ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
                </button>
            </div>
            <nav className={`space-x-2 ${isOpen ? 'block' : 'hidden'} md:block`}>
                <Link href="/" className={s.link}>
                    <HomeIcon className="inline-block h-4 w-4 mr-1" /> Pricing
                </Link>
                {user && (
                    <Link href="/account" className={s.link}>
                        <UserCircleIcon className="inline-block h-4 w-4 mr-1" /> Account
                    </Link>
                )}
            </nav>
        </>
    );
}