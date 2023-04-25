'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

interface Props {
    chatId: string;
}

function ChatScreen({ chatId }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { data: session } = useSession();
    const [messages] = useCollection(
        session &&
            query(
                collection(
                    db,
                    'users',
                    session?.user?.email!,
                    'chats',
                    chatId,
                    'messages'
                ),
                orderBy('createdAt', 'asc')
            )
    );

    //Scroll to latest message at bottom of container
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            className='flex-1 overflow-y-auto'
            ref={containerRef}
        >
            {messages?.docs.slice(1).map((message) => (
                <Message
                    key={message.id}
                    message={message.data()}
                />
            ))}
        </div>
    );
}

export default ChatScreen;
