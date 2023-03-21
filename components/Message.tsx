import { ROLE } from '../typings.d';
import { DocumentData } from 'firebase/firestore';

interface Props {
    message: DocumentData;
}

import React from 'react';

function Message({ message }: Props) {
    const isTeacher = message.message.role === ROLE.ASSISTANT;

    return (
        <div className={`py-5 ${isTeacher && `bg-gray-200`}`}>
            <div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
                <img
                    src={message.user.avatar || `/robot.png`}
                    alt='user profile image'
                    className='h-8 w-8 rounded-full'
                />
                <p>{message.message.content}</p>
            </div>
        </div>
    );
}

export default Message;
