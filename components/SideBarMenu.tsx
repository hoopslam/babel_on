'use client';

import { signOut } from 'next-auth/react';
import NewChat from './NewChat';

function SideBarMenu() {
    return (
        <div className='flex-1 max-w-xs flex flex-col justify-between'>
            <div>
                <NewChat />
                <div>Select Language</div>
                <div>Select Mode</div>
                <div>Map through chat history</div>
                <div>Map through translations history</div>
            </div>

            <button
                type='button'
                className='sideBarRow cursor-pointer'
                onClick={() => signOut()}
            >
                Sign out
            </button>
        </div>
    );
}

export default SideBarMenu;
