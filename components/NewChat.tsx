import { useSession } from 'next-auth/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

function NewChat({ nativeLanguage = `English`, learningLanguage = `Korean` }) {
    const { data: session } = useSession();
    const router = useRouter();

    const createNewChat = async () => {
        const doc = await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats'),
            {
                language: {
                    nativeLanguage,
                    learningLanguage,
                },
                userId: session?.user?.email!,
                createdAt: serverTimestamp(),
                messages: [],
            }
        );

        router.push(`/chat/${doc.id}`);
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
