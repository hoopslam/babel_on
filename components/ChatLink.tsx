import { TrashIcon } from '@heroicons/react/24/solid';
import { db } from '../firebase';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

interface Props {
    id: string;
}

function ChatLink({ id }: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [active, setActive] = useState(false);
    const [messages] = useCollection(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
    );
    const message =
        messages?.docs[messages?.docs.length - 1]?.data().message.content;

    const removeChat = async () => {
        if (confirm('Are you sure you want to delete this chat?')) {
            await deleteDoc(
                doc(db, 'users', session?.user?.email!, 'chats', id)
            );
            router.replace('/');
        }
    };

    useEffect(() => {
        if (!pathname) return;

        setActive(pathname.includes(id));
    }, [pathname, id]);

    return (
        <Link
            href={`/chat/${id}`}
            className={`justify-between sideBarRow ${
                active ? 'bg-teal-600' : ''
            }`}
        >
            <p className={`${active ? 'text-white' : ''}`}>
                {message?.length > 20
                    ? message.substring(0, 19) + '...'
                    : message || 'New Chat'}
            </p>
            <button
                type='button'
                onClick={removeChat}
                className={`px-2 ${active && `text-white`} hover:text-white`}
            >
                <TrashIcon
                    className={`h-4 w-4 hover:rotate-45 transition-all duration-200 ease-in`}
                />
            </button>
        </Link>
    );
}

export default ChatLink;
