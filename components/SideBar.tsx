'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Login from './Login';
import SideBarMenu from './SideBarMenu';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

function SideBar() {
    const [active, setActive] = useState(false);
    const { data: session } = useSession();
    return (
        <>
            <button
                className={`fixed top-2 left-2 bg-teal-500 text-white p-3 `}
                type='button'
                onClick={() => setActive(true)}
            >
                <Bars3Icon className='h-5 w-5' />
            </button>

            <aside
                className={`${
                    active ? `left-0` : `-left-full`
                } p-2 z-10  flex flex-col pt-16 h-screen bg-teal-500 fixed top-0 md:static transition-all duration-500 ease-out`}
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
                {session ? <SideBarMenu /> : <Login />}
            </aside>
        </>
    );
}

export default SideBar;
