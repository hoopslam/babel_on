'use client';

import { useState, useEffect } from 'react';
import SideBarMenu from './SideBarMenu';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

function SideBar() {
    const [active, setActive] = useState(false);
    const [isMdScreen, setIsMdScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px');
        console.log(mediaQuery);

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
                    className={`fixed top-2 left-2 bg-teal-500 text-white p-3 `}
                    type='button'
                    onClick={() => setActive(true)}
                >
                    <Bars3Icon className='h-5 w-5' />
                </button>
            )}
            <aside
                className={`${
                    isMdScreen || active ? `left-0` : `-left-full`
                } p-2 z-10  flex flex-col pt-16 h-full bg-teal-500 fixed top-0 transition-all duration-500 ease-out`}
            >
                {active && (
                    <button
                        className={`fixed top-2 left-2 bg-teal-500 text-white p-3 `}
                        type='button'
                        onClick={() => setActive(false)}
                    >
                        <XMarkIcon className='h-5 w-5' />
                    </button>
                )}
                <SideBarMenu />
            </aside>
        </>
    );
}

export default SideBar;
