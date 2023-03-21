import { useSession } from 'next-auth/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

function NewChat() {
    const { data: session } = useSession();
    const router = useRouter();

    const createNewChat = async () => {
        const doc = await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats'),
            {
                messages: [], //might not use
                userId: session?.user?.email!,
                createdAt: serverTimestamp(),
            }
        );

        router.push(`/chat/${doc.id}`);
    };

    return (
        <div
            className='border-teal-500 border sideBarRow'
            onClick={createNewChat}
        >
            <PlusIcon className='h-5 w-5' />
            <p>New Conversation</p>
        </div>
    );
}

export default NewChat;
