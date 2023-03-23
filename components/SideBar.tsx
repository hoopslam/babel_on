'use client';

import { useState, useEffect } from 'react';
import SideBarMenu from './SideBarMenu';
import {
    Bars3Icon,
    ChatBubbleLeftRightIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';

function SideBar() {
    const [active, setActive] = useState(false);
    const [isMdScreen, setIsMdScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px');

        const handleMediaQueryChange = (e: MediaQueryList) => {
            setIsMdScreen(e.matches);
        };
        handleMediaQueryChange(mediaQuery);

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    return (
        <>
            {!isMdScreen && (
                <button
                    className={`fixed top-2 left-2 text-teal-500 p-3 `}
                    type='button'
                    onClick={() => setActive(true)}
                >
                    <Bars3Icon className='h-5 w-5' />
                </button>
            )}
            <aside
                className={`${
                    isMdScreen || active ? `left-0` : `-left-full`
                } py-10 px-4 z-10  flex flex-col pt-16 h-screen bg-teal-500 absolute m-w-lg md:relative top-0 transition-all items-center duration-500 ease-out`}
            >
                {active && (
                    <button
                        className={`fixed top-2 left-2 text-white p-3 `}
                        type='button'
                        onClick={() => setActive(false)}
                    >
                        <XMarkIcon className='h-5 w-5' />
                    </button>
                )}
                <Link
                    href='/'
                    className='text-white flex m-5'
                >
                    <ChatBubbleLeftRightIcon className='w-8 h-8' />
                    <p>Babel On</p>
                </Link>
                <SideBarMenu />
            </aside>
        </>
    );
}

export default SideBar;
