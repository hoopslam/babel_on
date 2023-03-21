'use client';

import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { ROLE, FirebaseMessage } from '../typings.d';

interface Props {
    chatId: string;
}

function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState(``);
    const { data: session } = useSession();

    const language = 'Korean';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!prompt) return;

        const input = prompt.trim();
        setPrompt(``);

        const message: FirebaseMessage = {
            message: {
                role: ROLE.USER,
                content: input,
            },
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar:
                    session?.user?.image! ||
                    `https://ui-avatars.com/api/?name=${session?.user?.name}`,
            },
        };

        await addDoc(
            collection(
                db,
                'users',
                session?.user?.email!,
                'chats',
                chatId,
                'messages'
            ),
            message
        );

        const notification = toast.loading(`Babel is thinking`);

        await fetch('/api/chat-prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: { role: ROLE.USER, content: input },
                chatId,
                language,
                session,
            }),
        }).then(() => {
            toast.success(`Babel On`, {
                id: notification,
            });
        });
    };

    return (
        <div className='bg-gray-100 rounded-lg text-sm'>
            <form
                className='p-2 space-x-5 flex'
                onSubmit={handleSubmit}
            >
                <input
                    type='text'
                    className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
                    disabled={!session}
                    value={prompt}
                    onChange={handleInputChange}
                    placeholder='Your message'
                />
                <button
                    type='submit'
                    disabled={!prompt || !session}
                    className='rounded bg-teal-500 text-white px-6 py-1 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed'
                >
                    Send
                </button>
            </form>
            <div></div>
        </div>
    );
}

export default ChatInput;
