import React from 'react';

interface Props {
    chatId: string;
}

function ChatScreen({ chatId }: Props) {
    return <div className='flex-1'>ChatScreen</div>;
}

export default ChatScreen;
