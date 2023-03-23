import { ROLE } from '../typings.d';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';

interface Props {
    message: DocumentData;
}

import React from 'react';

function Message({ message }: Props) {
    const isTeacher = message.message.role === ROLE.ASSISTANT;

    return (
        <div className={`py-5 ${isTeacher && `bg-gray-200`}`}>
            <div className='flex space-x-5 px-10 max-w-2xl mx-auto items-center'>
                <Image
                    src={
                        isTeacher
                            ? `/robot.png`
                            : message.user.avatar || `/user.png`
                    }
                    alt='user profile image'
                    width={32}
                    height={32}
                    className='rounded-full'
                />
                <p>{message.message.content}</p>
            </div>
        </div>
    );
}

export default Message;
