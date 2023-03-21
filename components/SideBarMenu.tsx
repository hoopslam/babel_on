'use client';

import { useSession, signOut } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import NewChat from './NewChat';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import ChatLink from './ChatLink';

function SideBarMenu() {
    const { data: session } = useSession();
    const [chats, loading, error] = useCollection(
        session &&
            query(
                collection(db, 'users', session.user?.email!, 'chats'),
                orderBy('createdAt', 'desc')
            )
    );

    const handleSignOut = () => {
        signOut();
        alert(`Signed Out`);
    };

    return (
        <div className='flex-1 max-w-sm flex flex-col justify-between'>
            <div>
                <NewChat />
                <div>Select Language</div>
                <div>Select Mode</div>
                {chats?.docs.map((chat) => (
                    <ChatLink
                        key={chat.id}
                        id={chat.id}
                    />
                ))}
                <div>Map through translations history</div>
            </div>

            <button
                type='button'
                className='sideBarRow cursor-pointer'
                onClick={handleSignOut}
            >
                Sign out
            </button>
        </div>
    );
}

export default SideBarMenu;
