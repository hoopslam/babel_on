import { useSession } from 'next-auth/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { FirebaseMessage, ROLE } from '../typings.d';
import toast from 'react-hot-toast';

function NewChat({ nativeLanguage = `English`, learningLanguage = `Korean` }) {
    const { data: session } = useSession();
    const router = useRouter();

    const createNewChat = async () => {
        const chatDocRef = await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats'),
            {
                language: {
                    nativeLanguage,
                    learningLanguage,
                },
                userId: session?.user?.email!,
                createdAt: serverTimestamp(),
            }
        );

        const chatId = chatDocRef.id;

        //create initial message in firestore
        const INITIAL_MESSAGE = {
            role: ROLE.USER,
            content: `Hi`,
        };
        const firebaseMessage: FirebaseMessage = {
            message: INITIAL_MESSAGE,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar:
                    session?.user?.image! ||
                    `https://ui-avatars.com/api/?name=${session?.user?.name}`,
            },
        };

        const messagesRef = collection(chatDocRef, 'messages');

        await addDoc(messagesRef, firebaseMessage);

        const notification = toast.loading(`Buddy is setting up your class`);

        await fetch('/api/chat-prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: INITIAL_MESSAGE,
                chatId,
                session,
            }),
        }).then(() => {
            toast.success(`Buddy`, {
                id: notification,
            });
        });

        router.push(`/chat/${chatId}`);
    };

    return (
        <div
            className='bg-teal-500 border sideBarRow text-white'
            onClick={createNewChat}
        >
            <PlusIcon className='h-5 w-5' />
            <p>Create New Class</p>
        </div>
    );
}

export default NewChat;
